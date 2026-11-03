"use client";

import type { ReactNode } from "react";
import SiteHeader from "@/components/site-header";

export function ContentPage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <>
      <SiteHeader />
      <main className={`content-page ${className}`}>
        <div className="content-page-inner">{children}</div>
      </main>
    </>
  );
}

export function PageIntro({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <header className="content-page-intro">
      <p className="editorial-kicker">{index} / Seamless Evolution</p>
      <div className="content-page-title-row">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
