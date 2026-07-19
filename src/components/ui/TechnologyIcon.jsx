import {
  FaReact,
  FaPhp,
  FaDocker,
  FaLaravel,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaBootstrap,
  FaFigma,
  FaAndroid,
  FaApple,
} from "react-icons/fa";

import {
  SiAdonisjs,
  SiCloudflare,
  SiExpress,
  SiExpo,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiHono,
  SiJavascript,
  SiMariadb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";

const icons = {
  // Front-End
  html5: FaHtml5,
  css3: FaCss3Alt,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: FaReact,
  vuedotjs: SiVuedotjs,
  nextdotjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  bootstrap: FaBootstrap,
  framer: SiFramer,

  // Back-End
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  hono: SiHono,
  php: FaPhp,
  laravel: FaLaravel,
  adonisjs: SiAdonisjs,

  // Base de données
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mariadb: SiMariadb,
  sqlite: SiSqlite,
  supabase: SiSupabase,
  firebase: SiFirebase,

  // Outils
  docker: FaDocker,
  git: FaGitAlt,
  github: FaGithub,
  npm: SiNpm,
  figma: FaFigma,
  netlify: SiNetlify,
  vercel: SiVercel,
  vite: SiVite,
  cloudflare: SiCloudflare,

  // Mobile
  expo: SiExpo,
  android: FaAndroid,
  apple: FaApple,

  // API
  graphql: SiGraphql,
};

const aliases = {
  // Front
  html: "html5",
  css: "css3",
  nextjs: "nextdotjs",
  nodejs: "nodedotjs",
  tailwind: "tailwindcss",
  vue: "vuedotjs",

  // Quelques alias utiles
  postgres: "postgresql",
  pg: "postgresql",
};

export default function TechnologyIcon({
  name,
  size = 14,
}) {
  if (!name) return null;

  const key = name.toLowerCase().trim();
  const iconKey = aliases[key] ?? key;
  const Icon = icons[iconKey];

  if (!Icon) {
    console.warn(`Icône inconnue : "${name}"`);

    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 4,
          backgroundColor: "currentColor",
          opacity: 0.35,
        }}
      />
    );
  }

  return <Icon size={size} />;
}