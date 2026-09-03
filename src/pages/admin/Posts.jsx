import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";
import Spinner from "../../components/admin/ui/Spinner";

import PostList from "../../components/admin/posts/PostList";
import PostDrawer from "../../components/admin/posts/PostDrawer";

import { getAllPosts, deletePost } from "../../services/posts.service";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getAllPosts();
        if (!ignore) setPosts(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les articles.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCreate() {
    setSelectedPost(null);
    setDrawerOpen(true);
  }

  function handleEdit(post) {
    setSelectedPost(post);
    setDrawerOpen(true);
  }

  async function handleDelete(post) {
    if (!window.confirm(`Supprimer "${post.title}" ?`)) return;

    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((item) => item.id !== post.id));
      toast.success("Article supprimé.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  function handleSaved(post) {
    setPosts((prev) =>
      prev.some((item) => item.id === post.id)
        ? prev.map((item) => (item.id === post.id ? post : item))
        : [post, ...prev]
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Blog"
        description="Rédige et publie tes notes techniques."
        actions={
          <Button onClick={handleCreate}>
            <Plus size={16} />
            Nouvel article
          </Button>
        }
      />

      {loading ? (
        <Spinner />
      ) : (
        <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <PostDrawer
        open={drawerOpen}
        post={selectedPost}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedPost(null);
        }}
        onSaved={handleSaved}
      />
    </div>
  );
}
