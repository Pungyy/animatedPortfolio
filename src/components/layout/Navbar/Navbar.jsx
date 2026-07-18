import Container from "../../ui/Container";
import Button from "../../ui/Button";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-5 z-50">
      <Container className="flex justify-center">
        <nav
          className="
            flex
            h-16
            w-full
            max-w-5xl
            items-center
            justify-between
            rounded-full
            border
            border-neutral-200/80
            bg-white/80
            px-6
            shadow-lg
            backdrop-blur-xl
          "
        >
          {/* Logo */}
          <a
            href="/"
            className="text-lg font-semibold tracking-tight"
          >
            IA.
          </a>

          {/* Navigation desktop */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="
                    text-sm
                    text-neutral-600
                    transition-colors
                    duration-300
                    hover:text-black
                  "
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button className="hidden lg:inline-flex">
            Télécharger mon CV
          </Button>
        </nav>
      </Container>
    </header>
  );
}