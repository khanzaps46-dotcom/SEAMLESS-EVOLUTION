"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Image className="identity-logo" src="/assets/seamless-logo.png" alt="" width={1260} height={430} priority />
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
