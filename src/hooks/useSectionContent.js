import { useEffect, useState } from "react";

// Récupère le contenu éditable d'une section depuis /api/content/:section.
// `defaults` sert de valeur affichée immédiatement (pas de flash de contenu
// vide) et de repli silencieux si l'appel échoue ou si rien n'est en base.
export function useSectionContent(section, defaults) {
  const [content, setContent] = useState(defaults);

  useEffect(() => {
    fetch(`/api/content/${section}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setContent((current) => ({ ...current, ...data }));
      })
      .catch(() => {});
  }, [section]);

  return content;
}
