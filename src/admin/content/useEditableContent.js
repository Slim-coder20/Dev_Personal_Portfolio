import { useEffect, useState } from "react";

export function useEditableContent(section) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | done
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setStatus("loading");
    setData(null);
    fetch(`/api/content/${section}?t=${Date.now()}`)
      .then((res) => res.json())
      .then((doc) => {
        setData(doc || {});
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, [section]);

  const save = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch(`/api/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Échec de l'enregistrement");
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { data, setData, status, save, saving, error, saved };
}
