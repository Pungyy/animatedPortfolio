import { X } from "lucide-react";

export default function Drawer({
  open,
  title,
  children,
  onClose,
  width = "max-w-3xl",
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full ${width} transform border-l border-zinc-800 bg-zinc-950 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-6">
          <h2 className="text-2xl font-semibold text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X />
          </button>
        </div>

        <div className="h-[calc(100%-81px)] overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  );
}