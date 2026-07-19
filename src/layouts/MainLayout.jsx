import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import MusicPlayer from "../components/ui/MusicPlayer";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
      
      <MusicPlayer />
    </>
  );
}