import Container from "../../ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-12">
      <Container>
        <p className="text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} Ibrahim ANIL.
        </p>
      </Container>
    </footer>
  );
}