import {
  supabase,
} from "../lib/supabase";



/**
 * Empêche plusieurs créations de session
 * simultanées.
 *
 * Cela arrive notamment lorsque plusieurs
 * composants appellent trackEvent() en même temps.
 */
let sessionCreationPromise = null;



/**
 * Génère ou récupère un ID visiteur
 */
function getVisitorId() {

  let visitorId =
    localStorage.getItem(
      "visitor_id"
    );


  if (
    !visitorId ||
    !isValidUUID(visitorId)
  ) {

    visitorId =
      crypto.randomUUID();


    localStorage.setItem(
      "visitor_id",
      visitorId
    );

  }


  return visitorId;

}



/**
 * Vérification UUID
 */
function isValidUUID(value) {

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    .test(value);

}



/**
 * Récupération localisation visiteur
 */
async function getLocation() {

  try {

    const response =
      await fetch(
        "https://ipapi.co/json/"
      );


    if (!response.ok) {

      throw new Error(
        "Impossible de récupérer la localisation."
      );

    }


    const data =
      await response.json();


    return {

      country:
        data.country_name ||
        null,

      city:
        data.city ||
        null,

      region:
        data.region ||
        null,

    };


  } catch (error) {

    console.error(
      "Location error:",
      error
    );


    return {

      country: null,

      city: null,

      region: null,

    };

  }

}



/**
 * Création ou récupération session
 */
export async function getSession() {

  const sessionId =
    localStorage.getItem(
      "analytics_session"
    );


  const started =
    localStorage.getItem(
      "analytics_started"
    );


  /**
   * Session valide 30 minutes
   */
  if (
    sessionId &&
    started &&
    Date.now() -
      Number(started)
      <
      30 * 60 * 1000
  ) {

    const {
      data,
      error,
    } =
      await supabase

        .from(
          "analytics_sessions"
        )

        .select("id")

        .eq(
          "id",
          sessionId
        )

        .single();


    if (
      data &&
      !error
    ) {

      return sessionId;

    }

  }


  /*
   * Session supprimée ou inexistante.
   *
   * Si une création de session est déjà
   * en cours, on attend celle-ci au lieu
   * d'en créer une deuxième.
   */
  if (
    sessionCreationPromise
  ) {

    return sessionCreationPromise;

  }


  localStorage.removeItem(
    "analytics_session"
  );


  localStorage.removeItem(
    "analytics_started"
  );


  /*
   * Création de la session.
   */
  sessionCreationPromise =
    createSession();


  try {

    return await sessionCreationPromise;

  } finally {

    sessionCreationPromise =
      null;

  }

}



/**
 * Création réelle d'une session
 */
async function createSession() {

  const location =
    await getLocation();


  const {
    data,
    error,
  } =
    await supabase

      .from(
        "analytics_sessions"
      )

      .insert({

        visitor_id:
          getVisitorId(),

        started_at:
          new Date(),

        browser:
          getBrowser(),

        device:
          getDevice(),

        os:
          getOS(),

        screen_width:
          window.innerWidth,

        screen_height:
          window.innerHeight,

        referrer:
          document.referrer ||
          null,

        user_agent:
          navigator.userAgent,

        language:
          navigator.language,

        timezone:
          Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone,

        country:
          location.country,

        city:
          location.city,

        region:
          location.region,

      })

      .select()

      .single();


  if (error) {

    console.error(
      "❌ Session creation error",
      error
    );


    return null;

  }


  localStorage.setItem(
    "analytics_session",
    data.id
  );


  localStorage.setItem(
    "analytics_started",
    Date.now()
  );


  return data.id;

}



/**
 * Enregistre un événement
 */
export async function trackEvent({

  event_type,

  page,

  project_id = null,

  detail = null,

}) {

  try {

    if (!page)
      return;


    const sessionId =
      await getSession();


    if (!sessionId)
      return;


    /*
     * Protection supplémentaire contre
     * les doublons.
     *
     * On garde le dernier événement enregistré
     * dans localStorage pendant quelques secondes.
     *
     * Cela protège notamment contre :
     *
     * - React StrictMode
     * - double montage d'un composant
     * - appels simultanés
     * - navigation déclenchant deux fois le hook
     */
    const dedupeKey =
      [
        sessionId,
        event_type,
        page,
        project_id || "none",
        detail || "none",
      ].join("|");


    const now =
      Date.now();


    let lastEvent = null;


    try {

      const stored =
        localStorage.getItem(
          "analytics_last_event"
        );


      if (stored) {

        lastEvent =
          JSON.parse(stored);

      }

    } catch {

      lastEvent = null;

    }


    if (
      lastEvent &&
      lastEvent.key === dedupeKey &&
      now - lastEvent.time < 5000
    ) {

      return;

    }


    /*
     * On enregistre immédiatement le verrou
     * AVANT le await Supabase.
     *
     * Ainsi, si trackEvent() est appelé deux
     * fois quasiment simultanément, le deuxième
     * appel sera bloqué.
     */
    localStorage.setItem(

      "analytics_last_event",

      JSON.stringify({

        key:
          dedupeKey,

        time:
          now,

      })

    );


    const {
      error,
    } =
      await supabase

        .from(
          "analytics_events"
        )

        .insert({

          session_id:
            sessionId,

          visitor_id:
            getVisitorId(),

          event_type,

          page,

          project_id,

          detail,

          referrer:
            document.referrer ||
            "Direct",

        });


    if (error)
      throw error;


  } catch (error) {

    console.error(
      "❌ Analytics tracking error",
      error
    );

  }

}



const REST_URL = import.meta.env.VITE_SUPABASE_URL;
const REST_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// A request that survives navigation (outbound link click, tab close...).
// A normal supabase-js fetch is aborted when the page unloads, hence keepalive.
function keepaliveFetch(pathAndQuery, method, body) {
  if (!REST_URL || !REST_KEY) return false;

  try {
    fetch(REST_URL + "/rest/v1/" + pathAndQuery, {
      method,
      keepalive: true,
      headers: {
        apikey: REST_KEY,
        Authorization: "Bearer " + REST_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    }).catch(() => {});
    return true;
  } catch {
    return false;
  }
}

// Track a user action (CV click, project link, contact submit...).
// Reads the session id synchronously and sends a keepalive request so it
// still lands even if the page navigates right after the click.
export function trackAction(event_type, detail = null, project_id = null) {
  try {
    const page = typeof window !== "undefined" ? window.location.pathname : "/";
    const sessionId = localStorage.getItem("analytics_session");
    const visitorId = localStorage.getItem("visitor_id");

    const key = [sessionId, event_type, page, project_id || "none", detail || "none"].join("|");
    const now = Date.now();
    let last = null;
    try { last = JSON.parse(localStorage.getItem("analytics_last_action") || "null"); } catch { last = null; }
    if (last && last.key === key && now - last.time < 5000) return;
    try { localStorage.setItem("analytics_last_action", JSON.stringify({ key, time: now })); } catch { /* ignore */ }

    const payload = {
      session_id: sessionId,
      visitor_id: visitorId || null,
      event_type,
      page,
      project_id,
      detail,
      referrer: document.referrer || "Direct",
    };

    if (sessionId && keepaliveFetch("analytics_events", "POST", payload)) {
      return;
    }

    trackEvent({ event_type, page, project_id, detail });
  } catch (error) {
    console.error("trackAction error", error);
  }
}



/**
 * Fermeture session
 */
export function endSession() {
  try {
    const sessionId = localStorage.getItem("analytics_session");
    const started = Number(localStorage.getItem("analytics_started"));

    if (!sessionId || !started) return;

    const duration = Math.max(
      0,
      Math.round((Date.now() - started) / 1000)
    );

    keepaliveFetch(
      "analytics_sessions?id=eq." + sessionId,
      "PATCH",
      { duration, ended_at: new Date().toISOString() }
    );
  } catch (error) {
    console.error("endSession error", error);
  }
}


/**
 * Mise à jour durée session
 */
export async function updateSessionDuration() {

  const sessionId =
    localStorage.getItem(
      "analytics_session"
    );


  if (!sessionId)
    return;


  const {
    data: session,
    error: fetchError,
  }
    =
    await supabase

      .from(
        "analytics_sessions"
      )

      .select(
        "started_at"
      )

      .eq(
        "id",
        sessionId
      )

      .single();


  if (
    fetchError ||
    !session
  ) {

    console.error(
      "❌ Impossible de récupérer la session",
      fetchError
    );


    return;

  }


  const duration =
    Math.floor(

      (
        Date.now()
        -
        new Date(
          session.started_at
        ).getTime()
      )
      /
      1000

    );


  const {
    error: updateError,
  }
    =
    await supabase

      .from(
        "analytics_sessions"
      )

      .update({

        duration,

      })

      .eq(
        "id",
        sessionId
      )

      .select();


  if (updateError) {

    console.error(
      "❌ Duration update error",
      updateError
    );


    return;

  }

}



/**
 * Récupération données analytics
 */
export async function getAnalytics() {

  const {
    data: sessions,
    error: sessionsError,
  }
    =
    await supabase

      .from(
        "analytics_sessions"
      )

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      );


  if (sessionsError)
    throw sessionsError;


  const {
    data: events,
    error: eventsError,
  }
    =
    await supabase

      .from(
        "analytics_events"
      )

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      );


  if (eventsError)
    throw eventsError;


  const projectIds =
    [
      ...new Set(
        events
          .map(
            event =>
              event.project_id
          )
          .filter(Boolean)
      )
    ];


  let projects = [];


  /*
   * Évite de faire un .in() avec
   * un tableau vide.
   */
  if (
    projectIds.length
  ) {

    const {
      data,
      error: projectsError,
    }
      =
      await supabase

        .from(
          "projects"
        )

        .select(
          "id,title,slug"
        )

        .in(
          "id",
          projectIds
        );


    if (projectsError)
      throw projectsError;


    projects =
      data || [];

  }


  const eventsWithProjects =
    events.map(
      event => ({

        ...event,

        projects:
          projects.find(
            project =>
              project.id ===
              event.project_id
          )
          ||
          null,

      })
    );


  return {

    sessions:
      sessions || [],

    events:
      eventsWithProjects || [],

  };

}



/**
 * Statistiques dashboard
 */
export async function getAnalyticsStats(
  period = "30d"
) {

  const {
    sessions,
    events,
  }
    =
    await getAnalytics();


  let filteredSessions =
    sessions;


  let filteredEvents =
    events;


  if (
    period !== "all"
  ) {

    const now =
      new Date();


    const startDate =
      new Date();


    if (
      period === "today"
    ) {

      startDate.setHours(
        0,
        0,
        0,
        0
      );

    } else {

      const days =
        period === "7d"
          ? 7
          : 30;


      startDate.setDate(

        now.getDate()
        -
        days

      );

    }


    filteredSessions =
      sessions.filter(

        session =>

          new Date(
            session.started_at
          )
          >=
          startDate

      );


    filteredEvents =
      events.filter(

        event =>

          new Date(
            event.created_at
          )
          >=
          startDate

      );

  }


  const visitors =
    new Set(

      filteredSessions.map(
        session =>
          session.visitor_id
      )

    );


  const pages = {};


  filteredEvents.forEach(
    event => {

      const page =
        event.page || "/";


      pages[page] =
        (
          pages[page] || 0
        )
        +
        1;

    }
  );


  const {
    data: projectsList,
    error: projectsError,
  }
    =
    await supabase

      .from(
        "projects"
      )

      .select(
        "id,title"
      );


  if (projectsError)
    throw projectsError;


  const projects = {};


  filteredEvents.forEach(
    event => {

      if (
        event.event_type ===
          "project_view" &&
        event.project_id
      ) {

        const project =
          projectsList.find(
            item =>
              item.id ===
              event.project_id
          );


        if (project) {

          projects[
            project.title
          ] =
            (
              projects[
                project.title
              ]
              ||
              0
            )
            +
            1;

        }

      }

    }
  );


  const browsers = {};


  filteredSessions.forEach(
    session => {

      const browser =
        session.browser ||
        "Autre";


      browsers[browser] =
        (
          browsers[browser] ||
          0
        )
        +
        1;

    }
  );


  const devices = {};


  filteredSessions.forEach(
    session => {

      const device =
        session.device ||
        "Autre";


      devices[device] =
        (
          devices[device] ||
          0
        )
        +
        1;

    }
  );


  const locations = {};


  filteredSessions.forEach(
    session => {

      const location =
        session.country

          ?

          `${session.country}${
            session.city
              ?
              ` - ${session.city}`
              :
              ""
          }`

          :

          session.timezone
          ||
          "Inconnu";


      locations[location] =
        (
          locations[location] ||
          0
        )
        +
        1;

    }
  );


  const totalDuration =
    filteredSessions.reduce(

      (
        total,
        session
      ) =>

        total +
        (
          session.duration ||
          0
        ),

      0

    );


  const averageDuration =
    filteredSessions.length

      ?

      Math.floor(

        totalDuration /
        filteredSessions.length

      )

      :

      0;



  /**
   * Visiteurs aujourd'hui
   */
  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  const visitorsToday =
    new Set(

      filteredSessions

        .filter(
          session =>

            new Date(
              session.started_at
            )
            >=
            today
        )

        .map(
          session =>
            session.visitor_id
        )

    );


  /**
   * Pages moyennes par session
   */
  const pagesPerSession =
    filteredSessions.length

      ?

      Number(

        (
          filteredEvents.length /
          filteredSessions.length
        )
        .toFixed(1)

      )

      :

      0;


  const sessionsByDay = {};


  filteredSessions.forEach(
    session => {

      const date =
        new Date(
          session.started_at
        )
          .toLocaleDateString(
            "fr-FR",
            {
              day:
                "2-digit",

              month:
                "short",
            }
          );


      sessionsByDay[date] =
        (
          sessionsByDay[date] ||
          0
        )
        +
        1;

    }
  );


  const activity =
    Object.entries(
      sessionsByDay
    )

      .map(
        (
          [date, total]
        ) => ({

          date,

          total,

        })
      )

      .slice(-7);



  /**
   * Dernières visites complètes
   *
   * On conserve ici les derniers
   * événements, mais les doublons
   * sont désormais fortement limités
   * par trackEvent().
   */
  const latestVisits =

    filteredEvents

      .slice(
        0,
        10
      )

      .map(
        event => {

          const session =
            filteredSessions.find(

              session =>

                session.id ===
                event.session_id

            );


          return {

            id:
              event.id,

            page:
              event.page || "/",

            event_type:
              event.event_type,

            project:
              event.projects ||
              null,

            country:
              session?.country ||
              null,

            city:
              session?.city ||
              null,

            region:
              session?.region ||
              null,

            browser:
              session?.browser ||
              "Inconnu",

            device:
              session?.device ||
              "Inconnu",

            os:
              session?.os ||
              "Inconnu",

            screen_width:
              session?.screen_width ||
              null,

            screen_height:
              session?.screen_height ||
              null,

            duration:
              session?.duration ||
              0,

            created_at:
              event.created_at,

          };

        }
      );


  const ENGAGEMENT_LABELS = {
    cv_download: "Téléchargements du CV",
    contact_submit: "Messages de contact envoyés",
    cta_click: "Clics sur les appels à l'action",
    "project_link_click:github": "Clics « Code source »",
    "project_link_click:demo": "Clics « Voir la démo »",
  };

  const engagementRaw = {};

  filteredEvents.forEach((event) => {
    if (event.event_type === "page_view" || event.event_type === "project_view") {
      return;
    }
    const key = event.detail
      ? `${event.event_type}:${event.detail}`
      : event.event_type;
    engagementRaw[key] = (engagementRaw[key] || 0) + 1;
  });

  const engagement = Object.entries(engagementRaw)
    .map(([key, total]) => ({
      key,
      label: ENGAGEMENT_LABELS[key] || key,
      total,
    }))
    .sort((a, b) => b.total - a.total);


  return {

    visitors:
      visitors.size,

    visitorsToday:
      visitorsToday.size,

    views:
      filteredEvents.length,

    sessions:
      filteredSessions.length,

    pagesPerSession,

    averageDuration,

    pages,

    projects,

    browsers,

    devices,

    locations,

    activity,

    latestVisits,

    engagement,

  };

}



/**
 * Détection navigateur
 */
function getBrowser() {

  const ua =
    navigator.userAgent;


  if (
    ua.includes("Chrome")
  )
    return "Chrome";


  if (
    ua.includes("Firefox")
  )
    return "Firefox";


  if (
    ua.includes("Safari")
  )
    return "Safari";


  return "Autre";

}



/**
 * Détection appareil
 */
function getDevice() {

  const width =
    window.innerWidth;


  if (
    width < 768
  )
    return "Mobile";


  if (
    width < 1200
  )
    return "Tablet";


  return "Desktop";

}



/**
 * Détection OS
 */
function getOS() {

  const ua =
    navigator.userAgent;


  if (
    ua.includes("Windows")
  )
    return "Windows";


  if (
    ua.includes("Mac")
  )
    return "MacOS";


  if (
    ua.includes("Android")
  )
    return "Android";


  if (
    ua.includes("iPhone")
  )
    return "iOS";


  return "Autre";

}