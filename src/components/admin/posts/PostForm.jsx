import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Toggle from "../ui/Toggle";
import ImageUploader from "../upload/ImageUploader";

import { uploadImage, deleteImage } from "../../../services/storage.service";
import { slugify } from "../../../services/posts.service";

export default function PostForm({ post, onChange }) {
  function set(name, value) {
    onChange({ target: { name, value } });
  }

  async function handleCover(file) {
    if (!file) {
      if (post.cover_image) {
        await deleteImage(post.cover_image).catch(() => {});
      }
      set("cover_image", "");
      return;
    }

    const url = await uploadImage(file, "posts");
    set("cover_image", url);
  }

  return (
    <div className="space-y-5">
      <Input
        label="Titre"
        name="title"
        value={post.title}
        onChange={(e) => {
          const value = e.target.value;
          onChange({ target: { name: "title", value } });
          if (!post.id && !post._slugTouched) {
            set("slug", slugify(value));
          }
        }}
      />

      <Input
        label="Slug"
        name="slug"
        value={post.slug}
        onChange={(e) => {
          set("_slugTouched", true);
          set("slug", slugify(e.target.value));
        }}
        hint="URL de l'article : /blog/mon-article"
      />

      <Textarea
        label="Extrait"
        name="excerpt"
        rows={2}
        value={post.excerpt}
        onChange={onChange}
        placeholder="Résumé affiché dans la liste et les partages."
      />

      <Input
        label="Tags"
        name="_tagsText"
        value={
          post._tagsText ??
          (Array.isArray(post.tags) ? post.tags.join(", ") : "")
        }
        onChange={(e) => {
          const value = e.target.value;
          set("_tagsText", value);
          set(
            "tags",
            value
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          );
        }}
        hint="Séparés par des virgules."
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[var(--text-secondary)]">
          Image de couverture
        </span>
        <ImageUploader value={post.cover_image} onUpload={handleCover} />
      </div>

      <Textarea
        label="Contenu (Markdown)"
        name="content"
        rows={16}
        value={post.content}
        onChange={onChange}
        placeholder={"## Titre de section\n\nTexte, **gras**, `code`, [lien](https://...)\n\n- puce\n- puce"}
      />

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <Toggle
          label="Publié"
          description="Un brouillon reste invisible sur le site public."
          name="status"
          checked={post.status === "published"}
          onChange={(e) =>
            set("status", e.target.checked ? "published" : "draft")
          }
        />
      </div>
    </div>
  );
}
