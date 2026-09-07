import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ProjectsManager } from "./ProjectsManager";
import { ContentManager } from "./ContentManager";

const TABS = [
  { key: "projects", label: "Projets" },
  { key: "content", label: "Contenu du site" },
];

export const AdminDashboard = () => {
  const [status, setStatus] = useState("checking"); // checking | authenticated | unauthenticated
  const [tab, setTab] = useState("projects");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((data) => setStatus(data.authenticated ? "authenticated" : "unauthenticated"))
      .catch(() => setStatus("unauthenticated"));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setStatus("unauthenticated");
  };

  if (status === "checking") {
    return (
      <p className="min-h-screen flex items-center justify-center text-muted-foreground">
        Chargement...
      </p>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard admin</h1>
        <Button size="sm" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
      <div className="flex gap-2 mb-8 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-all ${
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "projects" && <ProjectsManager />}
      {tab === "content" && <ContentManager />}
    </div>
  );
};
