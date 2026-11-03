"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { label: "3D Printing", href: "/3d-printing" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Create", href: "/create" },
  { label: "Discussion", href: "/discussion" },
  { label: "About", href: "/#about" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <Link className="identity" href="/" aria-label="Seamless Evolution, kembali ke awal" onClick={() => setMenuOpen(false)}>
          <svg className="mark" viewBox="0 0 64 60" aria-hidden="true"><path d="M25 4h34L46 18H29l-7 7h26L30 44H3l13-13h13l7-7H10z" fill="#9bb5ce"/><path d="M14 31h28L27 46H12L4 55h29l22-22H27l8-8H17z" fill="#39a5dc"/></svg>
          <span className="identity-name">Seamless<br />Evolution</span>
        </Link>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}><i /><i /><i /></button>
        <nav id="primary-navigation" className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation" aria-hidden={!menuOpen}>
          {links.map((link) => <Link href={link.href} key={link.href} onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
        </nav>
      </header>
      {menuOpen && <div className="menu-backdrop" aria-hidden="true" />}
    </>
  );
}
