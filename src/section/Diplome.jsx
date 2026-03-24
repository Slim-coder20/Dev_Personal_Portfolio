import React from 'react'

const expriences = [
  {
    period: "2024 - 2025",
    school: "Studi",
    diplome: "RNCP Bac+2 DWWM",
  },
  {
    period: "2022 - 2024",
    school: "CRR Amiens",
    diplome: "DEM Musique actuel",
  },
  {
    period: "2002 - 2004",
    school: "Institut Pascal",
    diplome: "BTP PAO",
  },
];

export const Diplome = () => {
  return (
    <section id="diplome" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header  */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Dilpômes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Mon parcours{" "}
            <span className="font-serif italic font-normal text-white">
              Scolaire
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Diplômé de chez Studi, j'ai consolidé mon expertise technique à
            travers une formation rigoureuse axée sur les réalités du marché. Ce
            cursus m'a permis de maîtriser l'intégralité du cycle de
            développement, de la conception d'architectures Full-Stack à
            l'optimisation de l'expérience utilisateur.
          </p>
        </div>
        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary/70 via-primary to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Diplome items */}
          <div className="space-y-12">
            {expriences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid grid-cols-[24px_1fr] md:grid-cols-2 gap-6 md:gap-12 items-start"
              >
                {/* Timeline dot */}
                <div className="relative md:col-start-1 md:justify-self-end">
                  <span className="absolute left-px md:left-auto md:right-[-6px] top-3 w-3 h-3 rounded-full bg-primary shadow-[0_0_14px_rgba(32,178,166,0.85)]" />
                </div>

                {/* Content */}
                <div
                  className={`md:max-w-md ${
                    idx % 2 === 0
                      ? "md:col-start-2 md:justify-self-start"
                      : "md:col-start-1 md:justify-self-end md:text-right"
                  }`}
                >
                  <div className="glass rounded-2xl p-5 border border-border/60">
                    <span className="text-sm text-primary font-semibold tracking-wide">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2 text-secondary-foreground">
                      {exp.school}
                    </h3>
                    <p className="text-muted-foreground mt-1">{exp.diplome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
