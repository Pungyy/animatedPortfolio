import {
  useEffect,
  useRef,
} from "react";

import {
  trackEvent,
} from "../services/analytics.service";


export default function useAnalytics(
  page,
  project_id = null
) {

  const trackedPage = useRef(null);


  useEffect(() => {

    if (!page)
      return;


    /*
     * Sur une page projet, on attend que le project_id
     * soit chargé avant d'enregistrer la visite.
     *
     * Cela évite :
     *
     * 1er rendu :
     * /project/Escrime + project_id = null
     *
     * puis :
     * /project/Escrime + project_id = 123
     *
     * qui créait deux page_view.
     */
    const isProjectPage =
      page.startsWith("/project/");


    if (
      isProjectPage &&
      !project_id
    ) {
      return;
    }


    /*
     * Une seule visite par page pour ce montage
     * du hook.
     */
    const trackingKey =
      `${page}:${project_id || "none"}`;


    if (
      trackedPage.current === trackingKey
    ) {
      return;
    }


    trackedPage.current =
      trackingKey;


    trackEvent({

      event_type:
        "page_view",

      page,

      project_id,

    });


  }, [
    page,
    project_id,
  ]);

}