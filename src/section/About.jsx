import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { useSectionContent } from "../hooks/useSectionContent";

const ICONS = { Code2, Rocket, Users, Lightbulb };

const DEFAULT_CONTENT = {
  badge: "A propos",
  headingLine1: "Construire l'avenir numérique,",
  headingHighlight: "bâtir un composant après l'autre.",
  paragraphs: [
    "Slim Abida | Développeur Web & Web Mobile Passionné par l'art du numérique et de la précision, je suis un développeur Full-Stack diplômé de Studi, spécialisé dans la création d'applications modernes et performantes. Mon approche repose sur une conviction simple : bâtir l'avenir numérique, un composant à la fois.",
    "Côté Frontend, j'exploite la puissance de React 19 combinée à l'agilité de Tailwind CSS pour concevoir des interfaces fluides, esthétiques et optimisées. Pour le Backend, je m'appuie sur la robustesse de Node.js, tout en maîtrisant la flexibilité de MongoDB et la rigueur de PostgreSQL.",
    "Fort de plusieurs projets concrets à mon actif, je m'attache à écrire un code maintenable et évolutif, conçu pour durer. Je suis aujourd'hui disponible pour de nouvelles missions et prêt à collaborer étroitement avec vos équipes pour donner vie à vos idées les plus ambitieuses.",
  ],
  quote:
    "Ma mission est de créer des expériences numériques qui ne soient pas seulement fonctionnelles, mais réellement agréables — des produits que les utilisateurs adorent utiliser et que les développeurs prennent plaisir à maintenir.",
  highlights: [
    {
      icon: "Code2",
      title: "Code propre",
      description: "Écrire un code maintenable et évolutif, conçu pour durer.",
    },
    {
      icon: "Rocket",
      title: "Performance",
      description:
        "Optimiser la performance pour offrir des expériences utilisateur ultra-rapides.",
    },
    {
      icon: "Users",
      title: "Collaboration",
      description:
        "Travailler en étroite collaboration avec les équipes pour donner vie aux idées.",
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      description:
        "Rester à la pointe des dernières technologies et des meilleures pratiques.",
    },
  ],
};

export const About = () => {
  const content = useSectionContent("about", DEFAULT_CONTENT);

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column  */}
          <div className="space-y-8">
            <div className="animate-fade-in ">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                {content.badge}{" "}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              {content.headingLine1}
              <span className="font-serif italic font-normal text-white">
                {" "}
                {content.headingHighlight}
              </span>
            </h2>
            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              {content.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "{content.quote}"
              </p>
            </div>
          </div>

          {/* Right Column - Hilights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {content.highlights.map((item, idx) => {
              const Icon = ICONS[item.icon] ?? Code2;
              return (
                <div
                  key={idx}
                  className="glass p-6 rounded-2xl animate-fade-in"
                  style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
