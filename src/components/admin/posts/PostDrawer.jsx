import { useState } from "react";
import { toast } from "sonner";

import Drawer from "../ui/Drawer";
import DrawerFooter from "../ui/DrawerFooter";
import PostForm from "./PostForm";

import { createPost, updatePost } from "../../../services/posts.service";

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  tags: [],
  status: "draft",
};

export default function PostDrawer({ open, post, onClose, onSaved }) {
  const buildForm = () => (post ? { ...emptyPost, ...post } : { ...emptyPost });

  const [form, setForm] = useState(buildForm);
  const [saving, setSaving] = useState(false);
  const [syncKey, setSyncKey] = useState({ post, open });

  if (syncKey.post !== post || syncKey.open !== open) {
    setSyncKey({ post, open });
    setForm(buildForm());
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    if (!form.title.trim()) {
      toast.error("Le titre est obligatoire.");
      return;
    }

    try {
      setSaving(true);

      const saved = form.id
        ? await updatePost(form.id, form)
        : await createPost(form);

      toast.success(form.id ? "Article mis à jour." : "Article créé.");
      onSaved(saved);
      onClose();
    } catch (error) {
      console.error("SAVE POST ERROR:", error);
      toast.error(
        error?.code === "23505"
          ? "Ce slug est déjà utilisé."
          : "Erreur lors de l'enregistrement."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer
      open={open}
      title={form.id ? "Modifier l'article" : "Nouvel article"}
      onClose={onClose}
    >
      <PostForm post={form} onChange={handleChange} />

      <DrawerFooter
        onCancel={onClose}
        onSubmit={handleSubmit}
        saving={saving}
      />
    </Drawer>
  );
}
