import { Plus } from "lucide-react";

import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";

export default function ProjectToolbar({ onCreate }) {
  return (
    <SectionTitle
      title="Projets"
      description="Gère les projets affichés sur ton portfolio."
      actions={
        <Button onClick={onCreate}>
          <Plus size={16} />
          Nouveau
        </Button>
      }
    />
  );
}
