import React from 'react'
import { Button } from "../components/Button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../index.css";

const navLinks = [
  {
    href: "#about",
    label: "A propos",
  },

  {
    href: "#projects",
    label: "Projets",
  },

  {
    href: "#experience",
    label: "Expérience",
  },

  {
    href: "#contact",
    label: "Contact",
  },
];

export const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent py-5">
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-bold tracking-tight hover:text-primary"
        >
          SM<span>.DEV</span>
        </a>
        {/* Nav desktop */}
        <div className="hidden md:flex items-center gap-1 ">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-primary rounded-full hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        {/* CTA Button */}
        <div className="hidden md:block">
          <Button size="sm">Contacter Moi</Button>
        </div>
        {/*   Mobile menu Button */}
        <button
          className="md:hidden p-2 text-foreground cursor-pointer"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="text-lg text-muted-foreground hover:text-foreground py-2"
              >
                {link.label}
              </a>
            ))}
            <Button>Contacter Moi</Button>
          </div>
        </div>
      )}
    </header>
  );
}
