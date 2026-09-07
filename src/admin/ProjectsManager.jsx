import { useEffect, useState } from "react";
import { Button } from "../components/Button";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  tags: "",
  link: "",
  github: "",
};

export const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | done
  const [editingId, setEditingId] = useState(null); // null = pas d'édition, "new" = création
  const [form, setForm] = useState(emptyForm);
  const [isUploading, setIsUploading] = useState(false);
  const [formError, setFormError] = useState("");

  const loadProjects = () => {
    setStatus("loading");
    fetch(`/api/projects?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateForm = () => {
    setForm(emptyForm);
    setFormError("");
    setEditingId("new");
  };

  const openEditForm = (project) => {
    setForm({
      title: project.title,
      description: project.description,
      image: project.image || "",
      tags: (project.tags || []).join(", "),
      link: project.link || "",
      github: project.github || "",
    });
    setFormError("");
    setEditingId(project._id);
  };

  const closeForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFormError("");
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, dataUrl: reader.result }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Échec de l'upload");
        setForm((f) => ({ ...f, image: data.url }));
      } catch (err) {
        setFormError(err.message);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const payload = {
      title: form.title,
      description: form.description,
      image: form.image,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      link: form.link,
      github: form.github,
    };

    try {
      const res = await fetch("/api/projects", {
        method: editingId === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId === "new" ? payload : { id: editingId, ...payload }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Échec de l'enregistrement");

      closeForm();
      loadProjects();
    } catch (err) {
      setFormError(err.message);
    }
  };

  const handleDelete = async (project) => {
    if (!window.confirm(`Supprimer le projet "${project.title}" ?`)) return;

    try {
      const res = await fetch(`/api/projects?id=${project._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Échec de la suppression");
      loadProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Projets</h2>
        {editingId === null && (
          <Button size="sm" onClick={openCreateForm}>
            Ajouter un projet
          </Button>
        )}
      </div>

      {editingId !== null && (
        <form onSubmit={handleSubmit} className="glass p-6 rounded-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Titre</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {isUploading && <p className="text-sm text-muted-foreground mt-2">Upload en cours...</p>}
            {form.image && (
              <img src={form.image} alt="Aperçu" className="mt-3 h-24 rounded-lg object-cover" />
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags (séparés par des virgules)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="React, Node.js, MongoDB"
              className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Lien du projet</label>
            <input
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Lien GitHub</label>
            <input
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="w-full px-4 py-2 bg-surface rounded-xl border border-border outline-none"
            />
          </div>
          {formError && <p className="text-sm text-red-500">{formError}</p>}
          <div className="flex gap-3">
            <Button type="submit" disabled={isUploading}>
              {editingId === "new" ? "Créer" : "Enregistrer"}
            </Button>
            <Button type="button" className="bg-surface text-foreground" onClick={closeForm}>
              Annuler
            </Button>
          </div>
        </form>
      )}

      {status === "loading" && <p className="text-muted-foreground">Chargement...</p>}
      {status === "error" && <p className="text-red-500">Impossible de charger les projets.</p>}
      {status === "done" && (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="glass p-4 rounded-xl flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground">ordre : {project.order}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" className="bg-surface text-foreground" onClick={() => openEditForm(project)}>
                  Éditer
                </Button>
                <Button size="sm" className="bg-red-500/10 text-red-500" onClick={() => handleDelete(project)}>
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
