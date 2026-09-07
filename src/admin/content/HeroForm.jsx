import { useState } from "react";
import { useEditableContent } from "./useEditableContent";
import { SaveBar } from "./SaveBar";

export const HeroForm = () => {
  const { data, setData, status, save, saving, saved, error } = useEditableContent("hero");

  if (status === "loading" || !data) return <p className="text-muted-foreground">Chargement...</p>;
  if (status === "error") return <p className="text-red-500">Impossible de charger le contenu.</p>;

  return (
    <HeroFormFields data={data} setData={setData} save={save} saving={saving} saved={saved} error={error} />
  );
};

const HeroFormFields = ({ data, setData, save, saving, saved, error }) => {
  const [skillsText, setSkillsText] = useState(data.skills.join(", "));

  const field = (key) => ({
    value: data[key] ?? "",
    onChange: (e) => setData({ ...data, [key]: e.target.value }),
  });

  return (
    <div className="glass p-6 rounded-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Badge</label>
        <input {...field("badge")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Titre — ligne 1</label>
          <input {...field("headlineLine1")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Titre — mot en surbrillance</label>
          <input {...field("headlineHighlight")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Titre — ligne 2</label>
          <input {...field("headlineLine2")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Titre — ligne 3 (italique)</label>
          <input {...field("headlineLine3")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Paragraphe de présentation</label>
        <textarea
          {...field("paragraph")}
          rows={4}
          className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Badge de disponibilité</label>
        <input {...field("availabilityBadge")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Compétences (séparées par des virgules)</label>
        <input
          value={skillsText}
          onChange={(e) => {
            setSkillsText(e.target.value);
            setData({ ...data, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) });
          }}
          className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none"
        />
      </div>
      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
};
