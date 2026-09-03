import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

import usePortfolio from "../../../hooks/usePortfolio";

export default function AboutCard() {
  const { settings } = usePortfolio();

  const rows = [
    settings.location && { icon: MapPin, value: settings.location },
    settings.email && { icon: Mail, value: settings.email },
    settings.phone && { icon: Phone, value: settings.phone },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none lg:pb-14 lg:pl-10"
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-[40px] border border-[var(--border)] bg-[var(--surface-muted)] shadow-[var(--shadow-card)] sm:rounded-[48px]">
        {settings.profile_image ? (
          <img
            src={settings.profile_image}
            alt="Profil"
            className="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[4/5] items-center justify-center text-[var(--text-secondary)]">
            Ajouter une photo
          </div>
        )}
      </div>

      {/* CARTE CONTACT — sous l'image en mobile, flottante en desktop */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="
          relative mt-4 rounded-[28px] border border-[var(--border)]
          bg-[var(--surface)]/90 p-5 shadow-[var(--shadow-card)] backdrop-blur-xl
          sm:p-7
          lg:absolute lg:bottom-0 lg:left-0 lg:mt-0 lg:max-w-[280px]
        "
      >
        <div className="space-y-4 text-sm text-[var(--text-secondary)]">
          {rows.map(({ icon: Icon, value }) => (
            <div key={value} className="flex items-center gap-3">
              <Icon size={17} className="shrink-0" />
              <span className="truncate">{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
