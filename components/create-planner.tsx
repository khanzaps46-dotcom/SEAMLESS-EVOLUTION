"use client";

import Image from "next/image";
import { useState } from "react";
import { ContentPage, PageIntro } from "@/components/content-page";
import ArrowIcon from "@/components/arrow-icon";

const printerRates: Record<string, number> = { "FDM printer": 8000, "Resin printer": 12000, "SLS service": 18000 };
const materialRates: Record<string, number> = { PLA: 35, PETG: 48, Resin: 110 };

export default function CreatePlanner() {
  const [printer, setPrinter] = useState("FDM printer");
  const [material, setMaterial] = useState("PLA");
  const [hours, setHours] = useState(4);
  const [grams, setGrams] = useState(80);
  const [cost, setCost] = useState<number | null>(null);

  const calculate = () => setCost(Math.round(15000 + printerRates[printer] * hours + materialRates[material] * grams));

  return (
    <ContentPage className="create-page">
      <PageIntro index="04 / 05 · CREATE" title="Find Your Opportunities" description="Mulai dari alat dan material yang tepat. Gunakan kalkulator sederhana ini untuk membuat perkiraan awal proyekmu." />
      <div className="create-workflow">
        <div className="create-step-rail" aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span></div>
        <div className="create-step-list">
          <section className="create-step-card page-rule-section">
            <div className="create-step-content"><p className="editorial-kicker">Step 01</p><h2>Choose your printer</h2><p>Pilih jenis proses yang paling dekat dengan kebutuhan objekmu.</p><label htmlFor="printer-choice">Printer type</label><select id="printer-choice" value={printer} onChange={(event) => { setPrinter(event.target.value); setCost(null); }}><option>FDM printer</option><option>Resin printer</option><option>SLS service</option></select></div>
            <figure><Image src="/assets/bg-printer.png" alt="Detail printer 3D" fill sizes="(max-width: 760px) 100vw, 42vw" /></figure>
          </section>
          <section className="create-step-card create-step-card-reverse page-rule-section">
            <div className="create-step-content"><p className="editorial-kicker">Step 02</p><h2>Choose your material</h2><p>Sesuaikan karakter material dengan fungsi dan hasil akhir yang kamu inginkan.</p><label htmlFor="material-choice">Material</label><select id="material-choice" value={material} onChange={(event) => { setMaterial(event.target.value); setCost(null); }}><option>PLA</option><option>PETG</option><option>Resin</option></select></div>
            <figure><Image src="/assets/bg-mug.png" alt="Contoh permukaan produk cetak 3D" fill sizes="(max-width: 760px) 100vw, 42vw" /></figure>
          </section>
          <section className="create-estimate page-rule-section">
            <div className="create-step-content"><p className="editorial-kicker">Step 03</p><h2>Estimate your cost</h2><p>Masukkan perkiraan waktu dan berat material. Hasil ini adalah estimasi awal sebelum biaya finishing dan pengiriman.</p></div>
            <div className="estimate-controls"><label htmlFor="print-hours">Print time <span>hours</span></label><input id="print-hours" type="number" min="1" max="100" value={hours} onChange={(event) => { setHours(Math.max(1, Number(event.target.value))); setCost(null); }} /><label htmlFor="material-grams">Material <span>grams</span></label><input id="material-grams" type="number" min="1" max="5000" value={grams} onChange={(event) => { setGrams(Math.max(1, Number(event.target.value))); setCost(null); }} /><button className="primary-action" onClick={calculate}>Calculate estimate <ArrowIcon /></button></div>
          </section>
        </div>
      </div>
      <section className="cost-result" aria-live="polite"><p className="editorial-kicker">Estimated project cost</p><strong>{cost === null ? "—" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(cost)}</strong><span>{cost === null ? "Lengkapi pilihanmu lalu hitung estimasi." : `${printer} · ${material} · ${hours} jam / ${grams} g`}</span></section>
    </ContentPage>
  );
}
