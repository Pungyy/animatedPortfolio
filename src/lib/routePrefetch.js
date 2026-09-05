// Registre des chunks lazy (miroir de src/router/index.jsx) pour pouvoir
// les précharger avant le clic — voir RoutePrefetcher.
const routes = [
  { test: (p) => p === "/blog", load: () => import("../pages/Blog") },
  {
    test: (p) => p.startsWith("/blog/"),
    load: () => import("../pages/BlogPost"),
  },
  { test: (p) => p === "/coulisses", load: () => import("../pages/Coulisses") },
  { test: (p) => p === "/uses", load: () => import("../pages/Uses") },
  {
    test: (p) => p.startsWith("/project/"),
    load: () => import("../pages/Project"),
  },
];

const triggered = new Set();

export function prefetchRoute(pathname) {
  const route = routes.find((r) => r.test(pathname));
  if (!route || triggered.has(route.load)) return;

  triggered.add(route.load);
  route.load().catch(() => triggered.delete(route.load));
}
