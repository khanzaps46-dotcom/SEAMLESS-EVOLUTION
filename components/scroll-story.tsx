"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EditorialHome from "@/components/editorial-home";
import SiteHeader from "@/components/site-header";

const scenes = [
  { image: "/assets/bg-hero.jpg", alt: "Printer 3D Bambu Lab", title: ["Turns Ideas", "Into Reality"], chapter: "IDEA" },
  { image: "/assets/bg-printer.png", alt: "Detail nozzle printer 3D", title: ["Dari ide", "menjadi kenyataan."], chapter: "REALIZATION" },
  { image: "/assets/bg-mug.png", alt: "Mug custom hasil cetak 3D", title: ["Dari garis", "menjadi bentuk."], chapter: "SHAPE" },
  { image: "/assets/bg-products.png", alt: "Rangkaian produk cetak 3D", title: ["Idemu.", "Bisnismu."], chapter: "BUSINESS" },
];

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const intro = root.current;
    if (!intro) return;

    const updateVisibility = () => setShowBackToTop(intro.getBoundingClientRect().bottom <= 0);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    if (!root.current || !stage.current) return;
    const progressHost = root.current.parentElement;
    const homepageSection = progressHost?.querySelector<HTMLElement>(".editorial-home");
    const progressBar = progressHost?.querySelector<HTMLElement>(".chapter-progress");
    const progressFill = progressHost?.querySelector<HTMLElement>(".progress-fill");
    const progressNumber = progressHost?.querySelector<HTMLElement>(".progress-number");
    const progressChapter = progressHost?.querySelector<HTMLElement>(".progress-chapter");
    const progressCount = progressHost?.querySelector<HTMLElement>(".progress-count");
    let page4CompletionProgress = 1;
    let page4StableStartProgress = 1;
    let introTimelineDuration = 12.6;
    let page4CompletionReached = false;
    let completedProgressDismissed = false;
    let returningToPage4 = false;
    if (progressBar) gsap.set(progressBar, { autoAlpha: 0 });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const updateIntroProgress = (self: ScrollTrigger) => {
      const timelineTime = self.progress * introTimelineDuration;
      // Switch the page label as soon as the next page's background transition begins.
      const sceneIndex = scenes.slice(1).reduce((activeIndex, _, index) => {
        const transitionStart = (index + 1) * 3 - 0.9;
        return timelineTime >= transitionStart ? index + 1 : activeIndex;
      }, 0);
      const isPage4Complete = self.progress >= page4CompletionProgress;
      // The homepage can already be visible under the pinned scene before ScrollTrigger
      // fires onEnterBack, so arm the Page 4 return gate as soon as reverse motion begins.
      if (isPage4Complete && self.direction < 0 && self.progress > page4StableStartProgress) {
        returningToPage4 = true;
      }
      if (!isPage4Complete) {
        page4CompletionReached = false;
        completedProgressDismissed = false;
      } else if (!page4CompletionReached) {
        page4CompletionReached = true;
        completedProgressDismissed = false;
      } else if (self.direction > 0) {
        completedProgressDismissed = true;
      } else if (self.direction < 0) {
        completedProgressDismissed = false;
      }

      const visibleProgress = Math.min(1, self.progress / page4CompletionProgress);
      if (progressFill) gsap.set(progressFill, { scaleX: visibleProgress });
      if (progressNumber) progressNumber.textContent = `0${sceneIndex + 1}`;
      if (progressChapter) progressChapter.textContent = scenes[sceneIndex].chapter;
      if (progressCount) progressCount.textContent = `0${sceneIndex + 1} / 04`;
      if (returningToPage4) {
        const homepageStillInView = homepageSection
          ? homepageSection.getBoundingClientRect().top < window.innerHeight
          : false;
        if (self.direction < 0 && self.progress <= page4StableStartProgress && !homepageStillInView) {
          returningToPage4 = false;
          completedProgressDismissed = false;
        } else {
          if (progressBar) gsap.set(progressBar, { autoAlpha: 0 });
          return;
        }
      }
      const shouldShowProgress = window.scrollY < self.end && !(isPage4Complete && completedProgressDismissed);
      if (progressBar) gsap.set(progressBar, { autoAlpha: shouldShowProgress ? 1 : 0 });
    };

    const context = gsap.context(() => {
      const backgrounds = gsap.utils.toArray<HTMLElement>("[data-background]");
      const panels = gsap.utils.toArray<HTMLElement>("[data-copy]");
      const headingLines = gsap.utils.toArray<HTMLElement>("[data-heading-line]");
      const support = gsap.utils.toArray<HTMLElement>("[data-support]");
      gsap.set(backgrounds, { autoAlpha: 0, scale: 1.08, x: 22, clipPath: "inset(0 0 0 12%)" });
      gsap.set(backgrounds[0], { autoAlpha: 1, scale: 1.1, x: 0, clipPath: "inset(0 0 0 0)" });
      gsap.set(panels, { autoAlpha: 0, y: 38, filter: "blur(12px)", scale: 0.985 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1 });
      gsap.set(headingLines, { yPercent: 115, autoAlpha: 0 });
      gsap.set(support, { y: 24, autoAlpha: 0, filter: "blur(5px)" });
      if (progressFill) gsap.set(progressFill, { transformOrigin: "left center", scaleX: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          id: "se-intro-story",
          trigger: root.current,
          pin: stage.current,
          pinSpacing: false,
          start: "top top",
          end: () => `+=${root.current?.offsetHeight ?? window.innerHeight * (window.innerWidth < 700 ? 4 : 3.5)}`,
          // Keep the timeline locked to the trigger so its final frame and 100% progress
          // coincide exactly with the natural end of the pinned intro.
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateIntroProgress,
          onEnter: updateIntroProgress,
          onEnterBack: (self) => {
            returningToPage4 = true;
            updateIntroProgress(self);
          },
          onLeave: (self) => {
            if (progressFill) gsap.set(progressFill, { scaleX: 1 });
            updateIntroProgress(self);
            if (progressBar) gsap.set(progressBar, { autoAlpha: 0 });
          },
          onLeaveBack: updateIntroProgress,
        },
      });

      timeline.to(panels[0].querySelectorAll("[data-heading-line]"), { yPercent: 0, autoAlpha: 1, stagger: 0.12, duration: 0.72, ease: "none" }, 0);
      timeline.to(backgrounds[0], { scale: 1, duration: 0.8, ease: "none" }, 0);
      timeline.to(support, { y: 0, autoAlpha: 1, filter: "blur(0px)", stagger: 0.14, duration: 0.5, ease: "none" }, 0.2);
      timeline.to({}, { duration: 0.9 }, 0.9); // short reading hold for the opening state

      scenes.slice(1).forEach((_, index) => {
        const from = index;
        const to = index + 1;
        const stateStart = (index + 1) * 3;
        const exitStart = stateStart - (index === 0 ? 1.2 : 1.5);
        const imageStart = stateStart - 0.9;
        const textStart = stateStart - 0.75;

        // Phase 4: outgoing copy exits before the incoming copy becomes readable.
        timeline.to(panels[from], { autoAlpha: 0, y: -32, filter: "blur(9px)", scale: 0.99, duration: 0.65, ease: "none" }, exitStart);
        // Photo transition overlaps the text exit, then settles before the reading hold.
        timeline.to(backgrounds[from], { autoAlpha: 0, scale: 1.015, x: -18, duration: 0.95, ease: "none" }, imageStart);
        timeline.fromTo(backgrounds[to],
          { autoAlpha: 0, scale: 1.08, x: 28, clipPath: "inset(0 0 0 12%)" },
          { autoAlpha: 1, scale: 1, x: 0, clipPath: "inset(0 0 0 0)", duration: 0.95, ease: "none" },
          imageStart,
        );
        // Phase 1 & 2: entrance and stabilization complete at stateStart.
        timeline.to(panels[to], { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.65, ease: "none" }, textStart);
        timeline.to(panels[to].querySelectorAll("[data-heading-line]"), { yPercent: 0, autoAlpha: 1, stagger: 0.1, duration: 0.62, ease: "none" }, textStart + 0.03);
        if (to === scenes.length - 1) {
          // Mark the exact point where Page 4's text and background are fully settled.
          timeline.addLabel("page4-complete", imageStart + 0.95);
        }
        // Phase 3: hold sharp, still content while the scroll bar continues to advance.
        const readingDuration = to === scenes.length - 1 ? 3.6 : 1.5;
        timeline.to({}, { duration: readingDuration }, stateStart);
        if (to === scenes.length - 1) {
          // As the user continues after Page 4 is complete, scroll the final scene upward
          // before releasing the pin to the homepage in normal document flow.
          const page4CompleteTime = imageStart + 0.95;
          const exitStart = page4CompleteTime + 1;
          timeline.addLabel("page4-stable", exitStart);
          const exitDuration = stateStart + readingDuration - exitStart;
          timeline.to(stage.current, { yPercent: -100, duration: exitDuration, ease: "none" }, exitStart);
        }
      });

      introTimelineDuration = timeline.duration();
      page4CompletionProgress = timeline.labels["page4-complete"] / timeline.duration();
      page4StableStartProgress = timeline.labels["page4-stable"] / timeline.duration();

    }, root.current);

    ScrollTrigger.refresh();
    const introTrigger = ScrollTrigger.getById("se-intro-story");
    if (introTrigger) {
      const insideIntro = window.scrollY < introTrigger.end;
      updateIntroProgress(introTrigger);
      if (!insideIntro && progressFill) gsap.set(progressFill, { scaleX: 0 });
    }

    return () => {
      context.revert();
    };
  }, []);

  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="story" ref={root} aria-label="Scroll story: Explore, Learn, Build">
          <div className="story-stage" ref={stage}>
            {scenes.map((scene, index) => (
              <div className={`story-background ${index === 0 ? "is-visible" : ""}`} data-background key={scene.image}>
                {/* CSS backgrounds avoid layout changes while ScrollTrigger scrubs. */}
                <div className="background-image" style={{ backgroundImage: `url(${scene.image})` }} role="img" aria-label={scene.alt} />
              </div>
            ))}

            <p className="eyebrow fixed-eyebrow">Explore - Learn - Build</p>

            {scenes.map((scene, index) => (
              <article className={`story-copy copy-${index + 1}`} data-copy key={scene.chapter}>
                <h1>{scene.title.map((line) => <span data-heading-line key={line}>{line}</span>)}</h1>
                {index === 0 && (
                  <div className="supporting-copy">
                    <p className="subtitle" data-support>Semua dimulai dari pikiran.</p>
                    <a className="cta" data-support href="/3d-printing">Start Learning</a>
                  </div>
                )}
              </article>
            ))}

          </div>
          <div className="scroll-distance" aria-hidden="true" />
        </section>

        <div className="chapter-progress" aria-label="Progress seluruh halaman">
          <span className="progress-number">01</span>
          <span className="progress-track"><i className="progress-fill" /></span>
          <span className="progress-chapter">IDEA</span>
          <span className="progress-count">01 / 04</span>
        </div>

        <EditorialHome />
      </main>
      {showBackToTop && <a className="back-top" href="#top" aria-label="Kembali ke header content" title="Kembali ke header content"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20V4m-7 7 7-7 7 7" /></svg></a>}
    </>
  );
}
