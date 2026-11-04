import Image from "next/image";
import Link from "next/link";
import { ContentPage, PageIntro } from "@/components/content-page";
import ArrowIcon from "@/components/arrow-icon";

const stages = [
  ["01", "3D Model"], ["02", "Slicing"], ["03", "Printing"], ["04", "Layer by layer"], ["05", "Final product"],
];

const types = [
  { name: "FDM", image: "/assets/bg-printer.png", text: "Filamen dilelehkan dan disusun berlapis untuk membentuk objek yang kuat dan fungsional." },
  { name: "SLA", image: "/assets/bg-mug.png", text: "Resin cair dipadatkan dengan cahaya untuk menghasilkan detail permukaan yang halus." },
  { name: "SLS", image: "/assets/bg-products.png", text: "Serbuk material disatukan secara selektif untuk membuat bentuk kompleks tanpa banyak penyangga." },
];

export default function PrintingPage() {
  return (
    <ContentPage className="printing-page">
      <PageIntro index="02 / 05 · 3D PRINTING" title="What is 3D Printing?" description="Dari model digital ke objek nyata, lapis demi lapis. Kenali proses yang membuka cara baru untuk merancang dan membuat." />

      <section className="printing-explainer page-rule-section">
        <div className="printing-copy">
          <p className="editorial-kicker">Sebuah proses aditif</p>
          <h2>Membentuk ide, satu lapisan dalam satu waktu.</h2>
          <p>3D printing membuat objek dengan menambahkan material secara bertahap berdasarkan model digital. Proses ini memberi ruang untuk mencoba bentuk, ukuran, dan fungsi dengan lebih cepat.</p>
        </div>
        <figure className="printing-hero-image">
          <Image src="/assets/bg-printer.png" alt="Kepala printer 3D sedang membentuk objek" fill priority sizes="(max-width: 760px) 100vw, 58vw" />
          <figcaption>FROM DIGITAL MODEL TO PHYSICAL FORM</figcaption>
        </figure>
      </section>

      <section className="process-section page-rule-section">
        <div className="section-heading"><p className="editorial-kicker">The process</p><p className="section-note">Lima tahap dari ide awal hingga hasil akhir.</p></div>
        <div className="process-steps">
          {stages.map(([number, label], index) => (
            <div className="process-step" key={number}>
              <span className="process-number">{number}</span>
              <div className="process-visual"><Image src={index === 4 ? "/assets/bg-products.png" : index < 2 ? "/assets/bg-mug.png" : "/assets/bg-printer.png"} alt="" fill sizes="(max-width: 760px) 40vw, 16vw" /></div>
              <p>{label}</p>
              {index < stages.length - 1 && <span className="process-arrow"><ArrowIcon direction="right" /></span>}
            </div>
          ))}
        </div>
      </section>

      <section className="types-section page-rule-section">
        <div className="section-heading"><p className="editorial-kicker">Choose a process</p><p className="section-note">Setiap teknologi punya karakter dan kegunaan yang berbeda.</p></div>
        <div className="printing-types-grid">
          {types.map((type) => (
            <article className="printing-type" key={type.name}>
              <div className="printing-type-image"><Image src={type.image} alt={`Contoh hasil proses ${type.name}`} fill sizes="(max-width: 760px) 100vw, 32vw" /></div>
              <div className="printing-type-copy"><p className="editorial-kicker">Process / {type.name}</p><h3>{type.name}</h3><p>{type.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="materials-section page-rule-section">
        <figure><Image src="/assets/bg-mug.png" alt="Objek dengan tekstur hasil cetak 3D" fill sizes="(max-width: 760px) 100vw, 45vw" /></figure>
        <div><p className="editorial-kicker">Material study</p><h2>Material memberi ide karakter.</h2><p>PLA, PETG, resin, dan material lain membawa tekstur, kekuatan, serta hasil akhir yang berbeda. Pilihan yang tepat dimulai dari tujuan objek yang ingin dibuat.</p><Link className="text-link" href="/opportunities">Lihat peluang material <ArrowIcon /></Link></div>
      </section>

      <section className="applications-section">
        <p className="editorial-kicker">Made for many ideas</p>
        <h2>Applications</h2>
        <div className="application-links"><Link href="/create"><span>01</span><strong>Prototype & product design</strong><ArrowIcon /></Link><Link href="/opportunities"><span>02</span><strong>Creative business</strong><ArrowIcon /></Link></div>
      </section>
    </ContentPage>
  );
}
