import {
  FaReact,
  FaNodeJs,
  FaPhp,
  FaDocker,
  FaLaravel,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiHono,
} from "react-icons/si";



const icons = {

  react: FaReact,

  nodejs: FaNodeJs,

  php: FaPhp,

  docker: FaDocker,

  laravel: FaLaravel,

  git: FaGitAlt,


  nextjs: SiNextdotjs,

  javascript: SiJavascript,

  typescript: SiTypescript,

  tailwindcss: SiTailwindcss,

  supabase: SiSupabase,

  postgresql: SiPostgresql,

  hono: SiHono,

};





export default function TechnologyIcon({
  name,
  size = 14,
}) {


  const Icon = icons[name];


  if (!Icon) {
    return null;
  }


  return (

    <Icon
      size={size}
    />

  );

}