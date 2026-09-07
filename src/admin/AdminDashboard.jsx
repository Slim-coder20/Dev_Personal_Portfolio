import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../components/Button";

export const AdminDashboard = () => {
  const [status, setStatus] = useState("checking"); // checking | authenticated | unauthenticated

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
      <p className="text-muted-foreground">
        Connecté. La gestion des projets et du contenu du site arrivera dans
        les phases suivantes.
      </p>
    </div>
  );
};
