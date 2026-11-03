"use client";

import { useState, type FormEvent } from "react";
import { ContentPage, PageIntro } from "@/components/content-page";

type Topic = { title: string; category: string; replies: number; time: string; question: boolean };

const initialTopics: Topic[] = [
  { title: "Material yang cocok untuk objek outdoor?", category: "MATERIALS", replies: 12, time: "2 jam lalu", question: true },
  { title: "Berbagi pengaturan FDM untuk detail kecil", category: "3D PRINTING", replies: 8, time: "Kemarin", question: false },
  { title: "Mencari inspirasi untuk packaging custom", category: "IDEAS", replies: 5, time: "2 hari lalu", question: true },
  { title: "Hasil eksperimen resin pertamaku", category: "SHOW & TELL", replies: 16, time: "3 hari lalu", question: false },
];

export default function DiscussionBoard() {
  const [topics, setTopics] = useState(initialTopics);
  const [filter, setFilter] = useState<"all" | "questions">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const visibleTopics = filter === "questions" ? topics.filter((topic) => topic.question) : topics;

  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    setTopics([{ title: title.trim(), category: "COMMUNITY", replies: 0, time: "Baru saja", question: true }, ...topics]);
    setTitle("");
    setFilter("all");
    setFormOpen(false);
  };

  return (
    <ContentPage className="discussion-page">
      <PageIntro index="05 / 05 · DISCUSSION" title="Community Discussion" description="Tempat berbagi proses, bertanya, dan menemukan inspirasi bersama komunitas kreatif." />
      <div className="discussion-toolbar"><div className="discussion-filters" role="group" aria-label="Filter topik"><button className={filter === "all" ? "is-selected" : ""} onClick={() => setFilter("all")}>All topics</button><button className={filter === "questions" ? "is-selected" : ""} onClick={() => setFilter("questions")}>Ask questions</button></div><button className="primary-action" onClick={() => setFormOpen((open) => !open)}>{formOpen ? "Close form" : "Create post"}<span aria-hidden="true">↗</span></button></div>
      {formOpen && <form className="discussion-form" onSubmit={submitPost}><label htmlFor="discussion-title">Your topic</label><input id="discussion-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Apa yang ingin kamu bagikan atau tanyakan?" required /><button className="primary-action" type="submit">Publish topic <span aria-hidden="true">↗</span></button></form>}
      <section className="topic-list" aria-label="Daftar diskusi">
        {visibleTopics.map((topic, index) => (
          <article className="topic-row" key={`${topic.title}-${index}`}>
            <div className="topic-index"><span>0{index + 1}</span><span className="editorial-kicker">{topic.category}</span></div>
            <div className="topic-copy"><h2>{topic.title}</h2><p>{topic.time} <span>·</span> {topic.replies} replies</p></div>
            <span className="topic-tag">{topic.question ? "Question" : "Topic"}</span>
            <button className="topic-open" aria-label={`Open topic: ${topic.title}`} onClick={() => setTitle(topic.title)}>↗</button>
          </article>
        ))}
        {visibleTopics.length === 0 && <p className="empty-topics">Belum ada pertanyaan. Mulai diskusi pertama.</p>}
      </section>
      <section className="share-experience"><div><p className="editorial-kicker">Share your experience</p><h2>Satu prosesmu bisa membantu ide orang lain.</h2></div><button className="primary-action" onClick={() => setFormOpen(true)}>Create post <span aria-hidden="true">↗</span></button></section>
    </ContentPage>
  );
}
