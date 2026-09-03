import Button from "./Button";

export default function DrawerFooter({
  onCancel,
  onSubmit,
  saving = false,
  submitLabel = "Enregistrer",
  cancelLabel = "Annuler",
}) {
  return (
    <div className="sticky bottom-0 -mx-6 mt-8 flex justify-end gap-2 border-t border-[var(--border)] bg-[var(--background)] px-6 pb-1 pt-4">
      <Button variant="secondary" onClick={onCancel}>
        {cancelLabel}
      </Button>

      <Button onClick={onSubmit} disabled={saving}>
        {saving ? "Enregistrement..." : submitLabel}
      </Button>
    </div>
  );
}
