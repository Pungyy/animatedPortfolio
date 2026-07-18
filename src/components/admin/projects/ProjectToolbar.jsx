import { Plus } from "lucide-react";

import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";

export default function ProjectToolbar({
  onCreate,
}) {
  return (
    <div className="flex items-center justify-between">
      <SectionTitle
        title="Projects"
        description="Gère les projets affichés sur ton portfolio."
      />

      <Button onClick={onCreate}>
        <span className="flex items-center gap-2">
          <Plus size={18} />
          Nouveau
        </span>
      </Button>
    </div>
  );
}