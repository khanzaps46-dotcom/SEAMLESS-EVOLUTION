"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stories = [
  {
    number: "01",
    category: "MATERIAL STUDY",
    title: "Sebuah gagasan, banyak kemungkinan.",
    description: "Eksperimen kecil yang membuka jalan bagi bentuk dan fungsi baru.",
    image: "/assets/bg-printer.png",
    alt: "Detail proses pencetakan 3D",
    href: "/3d-printing",
    className: "story-tile story-tile--wide",
  },
  {
    number: "02",
    category: "OBJECTS",
    title: "Bentuk yang punya cerita.",
    description: "Dari sketsa digital menjadi objek yang bisa disentuh.",
    image: "/assets/bg-mug.png",
    alt: "Objek mug hasil cetak 3D",
    href: "/create",
    className: "story-tile story-tile--narrow",
  },
  {
    number: "03",
    category: "MADE TO GROW",
    title: "Ruang untuk ide berikutnya.",
    description: "Membangun produk, keterampilan, dan kemungkinan bersama.",
    image: "/assets/bg-products.png",
    alt: "Rangkaian prototipe produk cetak 3D",
    href: "/opportunities",
    className: "story-tile story-tile--offset",
  },
];

export default function EditorialHome() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-editorial-reveal]").forEach((element) => {
        gsap.fromTo(element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-editorial-image]").forEach((image) => {
        gsap.fromTo(image,
          { clipPath: "inset(8% 0 8% 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-editorial-parallax]").forEach((image) => {
        gsap.to(image, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div className="editorial-home" ref={root}>
      <section className="editorial-feature section-shell" id="journal" aria-labelledby="feature-title">
        <div className="section-heading" id="opportunities" data-editorial-reveal>
          <p className="editorial-kicker">01 / Cerita pilihan</p>
          <p className="section-note">Proses kreatif selalu bergerak — dari rasa ingin tahu menuju sesuatu yang nyata.</p>
        </div>
        <div className="feature-grid">
          <figure className="feature-image" data-editorial-image>
            <Image src="/assets/bg-mug.png" alt="Mug bertekstur yang dibuat dengan printer 3D" fill sizes="(max-width: 760px) 100vw, 58vw" data-editorial-parallax />
            <figcaption>STUDI BENTUK · 2026</figcaption>
          </figure>
          <article className="feature-copy" data-editorial-reveal>
            <p className="editorial-kicker">Bentuk / Eksperimen</p>
            <h2 id="feature-title">Dari garis pertama, lahir kemungkinan baru.</h2>
            <p>Setiap objek dimulai dari pertanyaan sederhana. Kami mengolahnya lewat desain, material, dan teknologi hingga menjadi sesuatu yang punya tempat dalam keseharian.</p>
            <a className="text-link" href="#selected-work">Baca cerita <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="editorial-about" id="about" aria-labelledby="about-title">
        <div className="about-meta" data-editorial-reveal><span>Tentang kami</span><span>02 / Sebuah pendekatan</span></div>
        <div className="about-content" data-editorial-reveal>
          <h2 id="about-title">Kami percaya ide besar tumbuh dari <em>keberanian untuk mencoba.</em></h2>
          <div className="about-detail">
            <span className="about-mark" aria-hidden="true">SE.</span>
            <p>Seamless Evolution menghubungkan desain dan teknologi 3D agar lebih banyak orang dapat belajar, bereksperimen, dan membangun sesuatu miliknya sendiri.</p>
            <a className="text-link" href="#selected-work">Kenali cara kami berkarya <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="editorial-stories section-shell" id="selected-work" aria-labelledby="stories-title">
        <div className="stories-heading" data-editorial-reveal>
          <div><p className="editorial-kicker">03 / Pilihan studio</p><h2 id="stories-title">Hal yang sedang<br /><em>kami pikirkan.</em></h2></div>
          <p>Eksplorasi, objek, dan proses yang mempertemukan imajinasi dengan kemungkinan nyata.</p>
        </div>
        <div className="stories-grid">
          {stories.map((story) => (
            <article className={story.className} key={story.number} data-editorial-reveal>
              <a className="story-tile-link" href={story.href} aria-label={`Baca ${story.title}`}>
                <figure data-editorial-image>
                  <Image src={story.image} alt={story.alt} fill sizes="(max-width: 760px) 100vw, 50vw" data-editorial-parallax />
                  <figcaption>{story.number} / {story.category}</figcaption>
                </figure>
                <div className="tile-copy"><h3>{story.title}</h3><p>{story.description}</p><span className="tile-arrow" aria-hidden="true">↗</span></div>
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="editorial-footer" id="contact">
        <div className="footer-topline"><a className="footer-brand" href="#top">SE<span>.</span></a><span>Desain untuk ide yang terus berkembang.</span><a className="back-top" href="#top">Kembali ke atas ↑</a></div>
        <div className="footer-main">
          <div><p className="editorial-kicker">Mari mulai sesuatu</p><a className="footer-email" href="mailto:hello@seamlessevolution.id">Punya ide?<br /><em>Hubungi kami.</em></a></div>
          <div className="footer-links"><div><span>Jelajahi</span><a href="#opportunities">Opportunities</a><a href="#selected-work">Create</a><a href="#journal">Stories</a><a href="#about">About</a></div><div><span>Ikuti</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Seamless Evolution</span><span>Dirancang untuk terus berevolusi.</span><span>Indonesia</span></div>
      </footer>
    </div>
  );
}
