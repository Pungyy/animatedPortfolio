import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Select from "../ui/Select";
import Toggle from "../ui/Toggle";
import ImageUploader from "../upload/ImageUploader";

import { uploadImage, deleteImage } from "../../../services/storage.service";

const RATINGS = [
  { value: "5", label: "★★★★★" },
  { value: "4", label: "★★★★" },
  { value: "3", label: "★★★" },
];

export default function TestimonialForm({ testimonial, onChange }) {
  const set = (name, value) => onChange({ target: { name, value } });

  async function handleAvatar(file) {
    if (!file) {
      if (testimonial.avatar_url) {
        await deleteImage(testimonial.avatar_url).catch(() => {});
      }
      set("avatar_url", "");
      return;
    }
    set("avatar_url", await uploadImage(file, "testimonials"));
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Nom"
          name="name"
          value={testimonial.name}
          onChange={onChange}
        />
        <Input
          label="Poste"
          name="role"
          value={testimonial.role}
          onChange={onChange}
          placeholder="Lead Developer"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Entreprise"
          name="company"
          value={testimonial.company}
          onChange={onChange}
        />
        <Select
          label="Note"
          name="rating"
          value={testimonial.rating ? String(testimonial.rating) : ""}
          onChange={onChange}
          options={RATINGS}
          placeholder="Aucune"
        />
      </div>

      <Textarea
        label="Témoignage"
        name="quote"
        rows={4}
        value={testimonial.quote}
        onChange={onChange}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Photo (optionnelle)
        </span>
        <ImageUploader value={testimonial.avatar_url} onUpload={handleAvatar} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Ordre d'affichage"
          name="display_order"
          type="number"
          value={testimonial.display_order}
          onChange={onChange}
        />
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <Toggle
          label="Mis en avant"
          description="Seuls les témoignages « mis en avant » s'affichent sur l'accueil (max 6). Si aucun ne l'est, les 6 premiers sont montrés."
          name="featured"
          checked={!!testimonial.featured}
          onChange={(e) => set("featured", e.target.checked)}
        />
      </div>
    </div>
  );
}
