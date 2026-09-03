import { X } from "lucide-react";

export default function Drawer({
  open,
  title,
  children,
  onClose,
  width = "max-w-2xl",
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 " +
          (open ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      <div
        className={
          `fixed right-0 top-0 z-50 flex h-screen w-full ${width} flex-col ` +
          "border-l border-[var(--border)] bg-[var(--background)] shadow-2xl " +
          "transition-transform duration-300 " +
          (open ? "translate-x-0" : "translate-x-full")
        }
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </>
  );
}
