import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import MusicPlayer from "../components/ui/MusicPlayer";
import CommandPalette from "../components/common/CommandPalette";

export default function MainLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">Aller au contenu</a>

      <Navbar />

      <main id="main">
        {children}
      </main>

      <Footer />

      <MusicPlayer />
      <CommandPalette />
    </>
  );
}