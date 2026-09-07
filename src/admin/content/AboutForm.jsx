import { useState } from "react";
import { useEditableContent } from "./useEditableContent";
import { SaveBar } from "./SaveBar";
import { Button } from "../../components/Button";

const ICON_OPTIONS = ["Code2", "Rocket", "Users", "Lightbulb"];

export const AboutForm = () => {
  const { data, setData, status, save, saving, saved, error } = useEditableContent("about");

  if (status === "loading" || !data) return <p className="text-muted-foreground">Chargement...</p>;
  if (status === "error") return <p className="text-red-500">Impossible de charger le contenu.</p>;

  return (
    <AboutFormFields data={data} setData={setData} save={save} saving={saving} saved={saved} error={error} />
  );
};

const AboutFormFields = ({ data, setData, save, saving, saved, error }) => {
  const [paragraphsText, setParagraphsText] = useState(data.paragraphs.join("\n\n"));

  const field = (key) => ({
    value: data[key] ?? "",
    onChange: (e) => setData({ ...data, [key]: e.target.value }),
  });

  const updateHighlight = (idx, key, value) => {
    const highlights = [...data.highlights];
    highlights[idx] = { ...highlights[idx], [key]: value };
    setData({ ...data, highlights });
  };

  const addHighlight = () => {
    setData({
      ...data,
      highlights: [...data.highlights, { icon: "Code2", title: "", description: "" }],
    });
  };

  const removeHighlight = (idx) => {
    setData({ ...data, highlights: data.highlights.filter((_, i) => i !== idx) });
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
        <label className="block text-sm font-medium mb-2">
          Paragraphes (un paragraphe par bloc, séparés par une ligne vide)
        </label>
        <textarea
          value={paragraphsText}
          onChange={(e) => {
            setParagraphsText(e.target.value);
            setData({
              ...data,
              paragraphs: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
            });
          }}
          rows={8}
          className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none resize-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Citation</label>
        <textarea
          {...field("quote")}
          rows={3}
          className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Points forts</label>
        <div className="space-y-3">
          {data.highlights.map((item, idx) => (
            <div key={idx} className="bg-surface rounded-xl p-4 space-y-2 border border-border">
              <div className="flex gap-2">
                <select
                  value={item.icon}
                  onChange={(e) => updateHighlight(idx, "icon", e.target.value)}
                  className="px-3 py-2 bg-background rounded-lg border border-border outline-none"
                >
                  {ICON_OPTIONS.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <input
                  value={item.title}
                  onChange={(e) => updateHighlight(idx, "title", e.target.value)}
                  placeholder="Titre"
                  className="flex-1 px-3 py-2 bg-background rounded-lg border border-border outline-none"
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-red-500/10 text-red-500"
                  onClick={() => removeHighlight(idx)}
                >
                  Retirer
                </Button>
              </div>
              <textarea
                value={item.description}
                onChange={(e) => updateHighlight(idx, "description", e.target.value)}
                rows={2}
                placeholder="Description"
                className="w-full px-3 py-2 bg-background rounded-lg border border-border outline-none resize-none"
              />
            </div>
          ))}
        </div>
        <Button type="button" size="sm" className="bg-surface text-foreground mt-3" onClick={addHighlight}>
          Ajouter un point fort
        </Button>
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
};
