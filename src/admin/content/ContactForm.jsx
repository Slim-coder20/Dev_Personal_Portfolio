import { useEditableContent } from "./useEditableContent";
import { SaveBar } from "./SaveBar";

export const ContactForm = () => {
  const { data, setData, status, save, saving, saved, error } = useEditableContent("contact");

  if (status === "loading" || !data) return <p className="text-muted-foreground">Chargement...</p>;
  if (status === "error") return <p className="text-red-500">Impossible de charger le contenu.</p>;

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
          rows={3}
          className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none resize-none"
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input {...field("email")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Téléphone</label>
          <input {...field("phone")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Adresse</label>
          <input {...field("address")} className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none" />
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} saved={saved} error={error} />
    </div>
  );
};
