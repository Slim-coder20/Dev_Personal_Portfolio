import React from 'react'
import { ArrowUpRight, Github } from "lucide-react";
const projects = [
  {
    title: "Amazone-clone",
    description:
      "Application web e-commerce inspirée d’Amazon : authentification Firebase, panier, checkout et paiement en ligne via Stripe.",
    image: "/projects/project1.png",
    tags: ["React", "React Router 7", "Node.js", "Firebase", "Stripe"],
    link: "https://e-clone-f1b94.web.app/",
    github: "https://github.com/Slim-coder20/amazone-clone.git",
  },
  {
    title: "Vite&Gouramnd",
    description:
      "Application web full-stack permettant aux clients de commander des repas en ligne, avec des espaces dédiés pour les clients, employés et administrateurs.",
    image: "/projects/project2.png",
    tags: ["React", "CSS", "Node.js", "Supabase", "MongoDB", "Docker"],
    link: "https://vite-gourmand.vercel.app/",
    github: "https://github.com/Slim-coder20/vite-gourmand.git",
  },
  {
    title: "FoodStore",
    description:
      "Application e-commerce alimentaire full-stack avec une interface client (acheteurs) et une interface vendeur (gestion des produits et commandes).",
    image: "/projects/project3.png",
    tags: [
      "React",
      "React-hook-form",
      "Tailwindcss",
      "Node.js",
      "MongoDB",
      "Stripe",
      "JWT",
      "Multer",
      "Cloudinary",
    ],
    link: "https://foodstorefront.vercel.app",
    github: "https://github.com/Slim-coder20/greenCart-.git",
  },
  {
    title: "Website Artist - Slim Abida",
    description:
      "Site web officiel de Slim Abida avec système de e-commerce intégré pour la vente d'albums, système de traduction FR/EN, et gestion dynamique du contenu.",
    image: "/projects/project4.png",
    tags: [
      "Next.js15",
      "TypeScript",
      "CSS Modules",
      "React Context API",
      "Prisma",
      "Postgres",
      "Supabase",
    ],
    link: "https://www.slimabida.fr/",
    github: "https://github.com/Slim-coder20/my-web-site.git",
  },
  {
    title: "Tunzik Production - Association de spectacle vivant",
    description:
      "Site web de Tunzik Production, association d'aide au spectacle vivant basée à Paris depuis 2017. La plateforme présente les artistes du label, leur discographie, et permet aux visiteurs de devenir adhérents ou de contacter l'association",
    image: "/projects/tunzikProd.png",
    tags: [
      "React 19",
      "Tailwindcss",
      "React Context API",
      "MongoDB",
      "Vercel",
      "Render",
    ],
    link: "https://tunzik-prod.vercel.app/",
    github: "https://github.com/Slim-coder20/tunzikProd.git",
  },
  {
    title: "Chatbot AI - Une mini application de chat IA",
    description:
      "Une application de chatbot interactif utilisant l'API OpenAI GPT-4o pour créer une expérience de conversation fluide et intuitive.",
    image: "/projects/chatbot.png",
    tags: [
      "HTML",
      "CSS",
      "OPENAI API",
      "JavaScript",
      "Vercel"
      
    ],
    link: "https://chatbot-ia-topaz.vercel.app/",
    github: "https://github.com/Slim-coder20/chatbot_IA-.git",
  },
];
export const Projects = () => {
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
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
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
      </div>
    </section>
  );
}
