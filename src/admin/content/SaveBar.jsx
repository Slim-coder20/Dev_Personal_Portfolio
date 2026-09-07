import { Button } from "../../components/Button";

export const SaveBar = ({ onSave, saving, saved, error }) => (
  <div className="flex items-center gap-4">
    <Button size="sm" onClick={onSave} disabled={saving}>
      {saving ? "Enregistrement..." : "Enregistrer"}
    </Button>
    {saved && <span className="text-sm text-primary">Enregistré ✓</span>}
    {error && <span className="text-sm text-red-500">{error}</span>}
  </div>
);
