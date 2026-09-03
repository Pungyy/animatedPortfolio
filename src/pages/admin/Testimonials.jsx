import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import SectionTitle from "../../components/admin/ui/SectionTitle";
import Button from "../../components/admin/ui/Button";
import Spinner from "../../components/admin/ui/Spinner";

import TestimonialList from "../../components/admin/testimonials/TestimonialList";
import TestimonialDrawer from "../../components/admin/testimonials/TestimonialDrawer";

import {
  getTestimonials,
  deleteTestimonial,
} from "../../services/testimonials.service";

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await getTestimonials();
        if (!ignore) setItems(data);
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger les témoignages.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  function handleCreate() {
    setSelected(null);
    setDrawerOpen(true);
  }

  function handleEdit(item) {
    setSelected(item);
    setDrawerOpen(true);
  }

  async function handleDelete(item) {
    if (!window.confirm(`Supprimer le témoignage de "${item.name}" ?`)) return;

    try {
      await deleteTestimonial(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success("Témoignage supprimé.");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression.");
    }
  }

  function handleSaved(item) {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.map((i) => (i.id === item.id ? item : i))
        : [...prev, item]
    );
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Témoignages"
        description="Les recommandations affichées sur la page d'accueil."
        actions={
          <Button onClick={handleCreate}>
            <Plus size={16} />
            Nouveau
          </Button>
        }
      />

      {loading ? (
        <Spinner />
      ) : (
        <TestimonialList
          testimonials={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TestimonialDrawer
        open={drawerOpen}
        testimonial={selected}
        onClose={() => {
          setDrawerOpen(false);
          setSelected(null);
        }}
        onSaved={handleSaved}
      />
    </div>
  );
}
