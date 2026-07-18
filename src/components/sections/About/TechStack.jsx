const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Laravel",
  "PHP",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "GSAP",
  "Git",
  "Docker",
];

export default function TechStack() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {technologies.map((tech) => (
        <div
          key={tech}
          className="
            rounded-3xl
            border
            border-neutral-200
            bg-white
            p-8
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <p className="text-lg font-semibold">
            {tech}
          </p>

          <p className="mt-3 text-sm leading-7 text-neutral-500">
            Technologie utilisée dans plusieurs projets
            professionnels et personnels.
          </p>
        </div>
      ))}
    </div>
  );
}