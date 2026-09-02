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
  SiFastapi,
  SiFirebase,
  SiFramer,
  SiGraphql,
  SiGsap,
  SiHono,
  SiJavascript,
  SiJira,
  SiJson,
  SiJsonwebtokens,
  SiMariadb,
  SiMui,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPostgresql,
  SiPwa,
  SiSass,
  SiShadcnui,
  SiSocketdotio,
  SiSqlite,
  SiStripe,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiVuedotjs,
  SiWordpress,
} from "react-icons/si";

import { TbBrandOpenai, TbQrcode } from "react-icons/tb";

import { VscVscode } from "react-icons/vsc";

const icons = {
  // Front-End
  html5: FaHtml5,
  css3: FaCss3Alt,
  sass: SiSass,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: FaReact,
  vuedotjs: SiVuedotjs,
  nextdotjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  bootstrap: FaBootstrap,
  mui: SiMui,
  shadcnui: SiShadcnui,
  framer: SiFramer,
  gsap: SiGsap,
  pwa: SiPwa,

  // Back-End
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  hono: SiHono,
  php: FaPhp,
  laravel: FaLaravel,
  adonisjs: SiAdonisjs,
  socketdotio: SiSocketdotio,
  fastapi: SiFastapi,

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
  jira: SiJira,
  visualstudiocode: VscVscode,
  vite: SiVite,
  vitest: SiVitest,
  netlify: SiNetlify,
  vercel: SiVercel,
  cloudflare: SiCloudflare,
  wordpress: SiWordpress,

  // Mobile
  expo: SiExpo,
  android: FaAndroid,
  apple: FaApple,

  // API / divers
  graphql: SiGraphql,
  json: SiJson,
  jsonwebtokens: SiJsonwebtokens,
  openai: TbBrandOpenai,
  stripe: SiStripe,
  qrcode: TbQrcode,
};

const aliases = {
  // Front
  html: "html5",
  css: "css3",
  scss: "sass",
  nextjs: "nextdotjs",
  nodejs: "nodedotjs",
  tailwind: "tailwindcss",
  vue: "vuedotjs",
  materialui: "mui",
  "shadcn/ui": "shadcnui",
  shadcn: "shadcnui",
  framermotion: "framer",
  greensock: "gsap",

  // Back
  socketio: "socketdotio",
  "socket.io": "socketdotio",

  // Base de données
  postgres: "postgresql",
  pg: "postgresql",

  // Outils
  vscode: "visualstudiocode",
  vs: "visualstudiocode",

  // API / divers
  jwt: "jsonwebtokens",
  "oauth 2.0": "jsonwebtokens",
  qr: "qrcode",
  qrcodes: "qrcode",
};

export default function TechnologyIcon({
  name,
  size = 14,
}) {
  if (!name) return null;

  const key = name.toLowerCase().trim();
  const iconKey = aliases[key] ?? key;
  const Icon = icons[iconKey];

  if (Icon) {
    return <Icon size={size} />;
  }

  // Repli : monogramme dérivé du nom (ne casse jamais l'affichage)
  const label =
    name.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase() || "?";

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * 0.28,
        border: "1.5px solid currentColor",
        fontSize: size * 0.5,
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: "-0.03em",
      }}
    >
      {label}
    </span>
  );
}
