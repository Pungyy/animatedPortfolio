import { useEffect, useState } from "react";
import {
  Eye,
  Users,
  Activity,
  Clock,
  CalendarDays,
  Layers,
} from "lucide-react";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Select from "../../components/admin/ui/Select";
import Spinner from "../../components/admin/ui/Spinner";

import AnalyticsCard from "../../components/admin/analytics/AnalyticsCard";
import VisitsChart from "../../components/admin/analytics/VisitsChart";
import RecentVisits from "../../components/admin/analytics/RecentVisits";
import TopProjects from "../../components/admin/analytics/TopProjects";
import PopularPages from "../../components/admin/analytics/PopularPages";
import BrowserStats from "../../components/admin/analytics/BrowserStats";
import DeviceStats from "../../components/admin/analytics/DeviceStats";
import LocationStats from "../../components/admin/analytics/LocationStats";

import { getAnalyticsStats } from "../../services/analytics.service";

const PERIODS = [
  { value: "today", label: "Aujourd'hui" },
  { value: "7d", label: "7 derniers jours" },
  { value: "30d", label: "30 derniers jours" },
  { value: "all", label: "Tout" },
];

function formatDuration(seconds = 0) {
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}min ${seconds % 60}s`;
}

function toSortedList(record = {}, keyName) {
  return Object.entries(record)
    .map(([k, total]) => ({ [keyName]: k, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
}

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("30d");

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getAnalyticsStats(period);
        if (!ignore) setStats(data);
      } catch (error) {
        console.error("Analytics loading error :", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [period]);

  const cards = stats
    ? [
        { title: "Visiteurs uniques", value: stats.visitors || 0, icon: Users },
        { title: "Aujourd'hui", value: stats.visitorsToday || 0, icon: CalendarDays },
        { title: "Pages vues", value: stats.views || 0, icon: Eye },
        { title: "Sessions", value: stats.sessions || 0, icon: Activity },
        { title: "Pages / session", value: stats.pagesPerSession || 0, icon: Layers },
        { title: "Durée moyenne", value: formatDuration(stats.averageDuration), icon: Clock },
      ]
    : [];

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Analytics"
        description="Analyse la fréquentation de ton portfolio."
        actions={
          <div className="w-52">
            <Select
              name="period"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              options={PERIODS}
              placeholder={null}
            />
          </div>
        }
      />

      {loading || !stats ? (
        <Spinner label="Chargement des statistiques..." />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {cards.map((c) => (
              <AnalyticsCard key={c.title} {...c} />
            ))}
          </div>

          <VisitsChart activity={stats.activity || []} />

          <div className="grid gap-6 lg:grid-cols-2">
            <RecentVisits visits={stats.latestVisits || []} />
            <TopProjects projects={toSortedList(stats.projects, "title")} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <PopularPages pages={toSortedList(stats.pages, "page")} />
            <BrowserStats
              browsers={Object.entries(stats.browsers || {}).map(([name, total]) => ({
                name,
                total,
              }))}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <DeviceStats devices={stats.devices || {}} />
            <LocationStats locations={stats.locations || {}} />
          </div>
        </>
      )}
    </div>
  );
}
