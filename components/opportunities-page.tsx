import Image from "next/image";
import Link from "next/link";
import { ContentPage, PageIntro } from "@/components/content-page";

const opportunities = [
  { number: "01", title: "Creative industries", text: "Bawa ilustrasi, karakter, dan eksplorasi bentuk menjadi objek yang bisa disentuh.", image: "/assets/bg-mug.png", tag: "DESIGN / OBJECTS" },
  { number: "02", title: "Business ideas", text: "Uji produk dalam skala kecil, buat pesanan khusus, dan temukan pasar dari ide yang unik.", image: "/assets/bg-products.png", tag: "PRODUCT / BUSINESS" },
  { number: "03", title: "Case studies", text: "Pelajari bagaimana proses prototyping membantu ide berkembang menjadi solusi nyata.", image: "/assets/bg-printer.png", tag: "PROCESS / STORIES" },
];

export default function OpportunitiesPage() {
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
            <div className="opportunity-copy"><h2>{item.title}</h2><p>{item.text}</p><Link href={item.number === "03" ? "/discussion" : "/create"} className="text-link">Explore this path <span aria-hidden="true">↗</span></Link></div>
          </article>
        ))}
      </section>
      <section className="opportunities-cta"><p className="editorial-kicker">Ready to begin?</p><h2>Pilih satu ide. Mulai dari sana.</h2><Link href="/create" className="cta content-page-cta">Start creating</Link></section>
    </ContentPage>
  );
}
