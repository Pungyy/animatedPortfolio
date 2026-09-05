import { motion } from "framer-motion";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import CommandPalette from "../components/common/CommandPalette";

const EASE = [0.22, 1, 0.36, 1];

export default function MainLayout({ children }) {
  return (
    <>
      <a href="#main" className="skip-link">Aller au contenu</a>

      <Navbar />

      <motion.main
        id="main"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        {children}
      </motion.main>

      <Footer />

      <CommandPalette />
    </>
  );
}
