import { useState } from "react";
import { HeroForm } from "./content/HeroForm";
import { AboutForm } from "./content/AboutForm";
import { DiplomeForm } from "./content/DiplomeForm";
import { ContactForm } from "./content/ContactForm";

const SECTIONS = [
  { key: "hero", label: "Hero", Form: HeroForm },
  { key: "about", label: "À propos", Form: AboutForm },
  { key: "diplome", label: "Diplômes", Form: DiplomeForm },
  { key: "contact", label: "Contact", Form: ContactForm },
];

export const ContentManager = () => {
  const [active, setActive] = useState("hero");
  const ActiveForm = SECTIONS.find((s) => s.key === active)?.Form;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              active === s.key
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      {ActiveForm && <ActiveForm />}
    </div>
  );
};
