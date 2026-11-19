"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ContentPage, PageIntro } from "@/components/content-page";
import ArrowIcon from "@/components/arrow-icon";

const opportunities = [
  { number: "01", title: "Creative industries", text: "Bawa ilustrasi, karakter, dan eksplorasi bentuk menjadi objek yang bisa disentuh.", image: "/assets/opportunity-model.png", tag: "DESIGN / OBJECTS" },
  { number: "02", title: "Business ideas", text: "Uji produk dalam skala kecil, buat pesanan khusus, dan temukan pasar dari ide yang unik.", image: "/assets/opportunity-lantern.png", tag: "PRODUCT / BUSINESS" },
  { number: "03", title: "Case studies", text: "Pelajari bagaimana proses prototyping membantu ide berkembang menjadi solusi nyata.", image: "/assets/opportunity-print.png", tag: "PROCESS / STORIES" },
];

export default function OpportunitiesPage() {
  const [activeOpportunity, setActiveOpportunity] = useState<(typeof opportunities)[number] | null>(null);

  return (
    <ContentPage className="opportunities-page">
      <PageIntro index="03 / 05 · OPPORTUNITIES" title="Creative Opportunities" description="Teknologi 3D mempertemukan kreativitas, keterampilan, dan peluang untuk membangun sesuatu yang baru." />
      <div className="opportunities-intro page-rule-section">
        <p className="editorial-kicker">Find your direction</p>
        <p className="opportunities-lead">Setiap ide bisa menjadi awal dari jalur yang berbeda.</p>
      </div>
      <section className="opportunity-list" aria-label="Peluang kreatif">
        {opportunities.map((item) => (
          <article className="opportunity-card" key={item.number}>
            <div className="opportunity-index"><span>{item.number}</span><span className="editorial-kicker">{item.tag}</span></div>
            <figure><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 86vw, 32vw" /></figure>
            <div className="opportunity-copy"><h2>{item.title}</h2><p>{item.text}</p><button type="button" className="text-link opportunity-explore" onClick={() => setActiveOpportunity(item)}>Explore this path <ArrowIcon /></button></div>
          </article>
        ))}
      </section>
      <section className="opportunities-cta"><p className="editorial-kicker">Ready to begin?</p><h2>Pilih satu ide. Mulai dari sana.</h2><Link href="/create" className="cta content-page-cta">Start creating</Link></section>
      {activeOpportunity && (
        <div className="process-modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setActiveOpportunity(null); }}>
          <section className="process-modal" role="dialog" aria-modal="true" aria-labelledby="opportunity-modal-title" onKeyDown={(event) => { if (event.key === "Escape") setActiveOpportunity(null); }}>
            <button className="process-modal-close" type="button" aria-label="Tutup detail" autoFocus onClick={() => setActiveOpportunity(null)}>×</button>
            <div className="process-modal-image"><Image src={activeOpportunity.image} alt={activeOpportunity.title} fill sizes="(max-width: 700px) 90vw, 55vw" /></div>
            <div className="process-modal-copy"><p className="editorial-kicker">Opportunity / {activeOpportunity.number}</p><h2 id="opportunity-modal-title">{activeOpportunity.title}</h2><p>{activeOpportunity.text}</p></div>
          </section>
        </div>
      )}
    </ContentPage>
  );
}
