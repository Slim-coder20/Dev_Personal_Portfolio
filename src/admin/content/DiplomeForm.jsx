import { useEditableContent } from "./useEditableContent";
import { SaveBar } from "./SaveBar";
import { Button } from "../../components/Button";

export const DiplomeForm = () => {
  const { data, setData, status, save, saving, saved, error } = useEditableContent("diplome");

  if (status === "loading" || !data) return <p className="text-muted-foreground">Chargement...</p>;
  if (status === "error") return <p className="text-red-500">Impossible de charger le contenu.</p>;

  const field = (key) => ({
    value: data[key] ?? "",
    onChange: (e) => setData({ ...data, [key]: e.target.value }),
  });

  const updateExperience = (idx, key, value) => {
    const experiences = [...data.experiences];
    experiences[idx] = { ...experiences[idx], [key]: value };
    setData({ ...data, experiences });
  };

  const addExperience = () => {
    setData({ ...data, experiences: [...data.experiences, { period: "", school: "", diplome: "" }] });
  };

  const removeExperience = (idx) => {
    setData({ ...data, experiences: data.experiences.filter((_, i) => i !== idx) });
  };

  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Badge</label>
        <input {...field("badge")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Titre</label>
          <input {...field("headingLine1")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Titre — partie en italique</label>
          <input {...field("headingHighlight")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Paragraphe</label>
        <textarea
          {...field("paragraph")}
          rows={4}
          className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Parcours (du plus récent au plus ancien)</label>
        <div className="space-y-3">
          {data.experiences.map((exp, idx) => (
            <div key={idx} className="bg-surface rounded-xl p-4 space-y-2 border border-border">
              <div className="grid sm:grid-cols-3 gap-2">
                <input
                  value={exp.period}
                  onChange={(e) => updateExperience(idx, "period", e.target.value)}
                  placeholder="Période (ex. 2024 - 2025)"
                  className="px-3 py-2 bg-background rounded-lg border border-border outline-none"
                />
                <input
                  value={exp.school}
                  onChange={(e) => updateExperience(idx, "school", e.target.value)}
                  placeholder="Établissement"
                  className="px-3 py-2 bg-background rounded-lg border border-border outline-none"
                />
                <input
                  value={exp.diplome}
                  onChange={(e) => updateExperience(idx, "diplome", e.target.value)}
                  placeholder="Diplôme"
                  className="px-3 py-2 bg-background rounded-lg border border-border outline-none"
                />
              </div>
              <Button
                type="button"
                size="sm"
                className="bg-red-500/10 text-red-500"
                onClick={() => removeExperience(idx)}
              >
                Retirer
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" size="sm" className="bg-surface text-foreground mt-3" onClick={addExperience}>
          Ajouter une entrée
        </Button>
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
};
