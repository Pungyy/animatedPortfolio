import { useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import DrawerFooter from "../ui/DrawerFooter";
import TestimonialForm from "./TestimonialForm";

import {
  createTestimonial,
  updateTestimonial,
} from "../../../services/testimonials.service";

const empty = {
  name: "",
  role: "",
  company: "",
  avatar_url: "",
  quote: "",
  rating: "",
  featured: false,
  display_order: 0,
};

export default function TestimonialDrawer({
  open,
  testimonial,
  onClose,
  onSaved,
}) {
  const buildForm = () =>
    testimonial ? { ...empty, ...testimonial } : { ...empty };

  const [form, setForm] = useState(buildForm);
  const [saving, setSaving] = useState(false);
  const [syncKey, setSyncKey] = useState({ testimonial, open });

  if (syncKey.testimonial !== testimonial || syncKey.open !== open) {
    setSyncKey({ testimonial, open });
    setForm(buildForm());
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.quote.trim()) {
      toast.error("Le nom et le témoignage sont obligatoires.");
      return;
    }

    try {
      setSaving(true);
      const saved = form.id
        ? await updateTestimonial(form.id, form)
        : await createTestimonial(form);
      toast.success(form.id ? "Témoignage modifié." : "Témoignage ajouté.");
      onSaved(saved);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer
      open={open}
      title={form.id ? "Modifier le témoignage" : "Nouveau témoignage"}
      onClose={onClose}
    >
      <TestimonialForm testimonial={form} onChange={handleChange} />
      <DrawerFooter onCancel={onClose} onSubmit={handleSubmit} saving={saving} />
    </Drawer>
  );
}
