import { ArrowUpRight, Github } from "lucide-react";
import { useEffect, useState } from "react";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | done

  useEffect(() => {
    let cancelled = false;

    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Réponse API invalide");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProjects(data);
        setStatus("done");
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Erreur de chargement des projets:", err);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* bg glows  */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className=" text-center mx-auto max-w-3xl mb-16  ">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Mes projets
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-200 text-secondary-foreground">
            Créer des solutions qui
            <span className="text-white font-serif italic font-normal">
              {" "}
              font la différence.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            De la création de plateformes e-commerce avec paiement sécurisé
            Stripe au développement d'applications SaaS multi-utilisateurs, je
            conçois des solutions robustes et évolutives. Maîtrisant
            l'écosystème MERN, Next.js et les architectures SQL/NoSQL, je
            transforme des architectures complexes en expériences utilisateur
            fluides, typées et performantes.
          </p>
        </div>
        {/* Projects Section en Grid*/}
        {status === "loading" && (
          <p className="text-center text-muted-foreground">
            Chargement des projets...
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-red-500">
            Impossible de charger les projets pour le moment.
          </p>
        )}
        {status === "done" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className=" group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent opacity-60">
                  {/* Overlay Links */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.link}
                      target="_blank"
                      className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all "
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all "
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Content — en dehors du bloc aspect-video pour éviter overflow-hidden + ratio qui masquent le texte */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};
