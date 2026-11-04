"use client";

import { useState, type FormEvent } from "react";
import { ContentPage, PageIntro } from "@/components/content-page";
import ArrowIcon from "@/components/arrow-icon";

type Topic = { title: string; body: string; category: string; replies: number; time: string; question: boolean };

const initialTopics: Topic[] = [
  { title: "Material yang cocok untuk objek outdoor?", body: "Saya sedang merancang pot kecil untuk penggunaan luar ruang. Material apa yang tahan panas dan hujan?", category: "MATERIALS", replies: 12, time: "2 jam lalu", question: true },
  { title: "Berbagi pengaturan FDM untuk detail kecil", body: "Saya mendapat hasil lebih rapi dengan tinggi layer 0,12 mm dan kecepatan lebih rendah.", category: "3D PRINTING", replies: 8, time: "Kemarin", question: false },
  { title: "Mencari inspirasi untuk packaging custom", body: "Ada rekomendasi bentuk packaging custom yang tetap praktis untuk diproduksi dalam jumlah kecil?", category: "IDEAS", replies: 5, time: "2 hari lalu", question: true },
  { title: "Hasil eksperimen resin pertamaku", body: "Mencoba resin untuk pertama kali dan mulai mengeksplorasi detail yang lebih halus.", category: "SHOW & TELL", replies: 16, time: "3 hari lalu", question: false },
];

export default function DiscussionBoard() {
  const [topics, setTopics] = useState(initialTopics);
  const [filter, setFilter] = useState<"all" | "questions">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const visibleTopics = filter === "questions" ? topics.filter((topic) => topic.question) : topics;

  const submitPost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setTopics([{ title: title.trim(), body: body.trim(), category: "COMMUNITY QUESTION", replies: 0, time: "Baru saja", question: true }, ...topics]);
    setTitle("");
    setBody("");
    setFilter("questions");
    setFormOpen(false);
  };

  const openQuestionComposer = () => {
    setFormOpen(true);
    setFilter("questions");
  };

  return (
    <ContentPage className="discussion-page">
      <PageIntro index="05 / 05 · DISCUSSION" title="Community Discussion" description="Tempat berbagi proses, bertanya, dan menemukan inspirasi bersama komunitas kreatif." />
      <div className="discussion-toolbar"><div className="discussion-filters" role="group" aria-label="Topik diskusi"><button className={filter === "all" ? "is-selected" : ""} onClick={() => setFilter("all")}>All topics</button><button className={filter === "questions" ? "is-selected" : ""} onClick={openQuestionComposer}>Ask questions</button></div></div>
      {formOpen && <form className="discussion-form" onSubmit={submitPost}>
        <div className="discussion-form-heading"><p className="editorial-kicker">Ask the community</p><button type="button" className="discussion-cancel" onClick={() => setFormOpen(false)}>Close</button></div>
        <label htmlFor="discussion-title">Your question</label>
        <input id="discussion-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Contoh: Material apa yang cocok untuk ...?" maxLength={140} required />
        <label htmlFor="discussion-body">Question details</label>
        <textarea id="discussion-body" value={body} onChange={(event) => setBody(event.target.value)} placeholder="Jelaskan konteks dan detail yang akan membantu komunitas menjawab..." rows={5} maxLength={2000} required />
        <div className="discussion-form-footer"><span>{body.length}/2000</span><button className="primary-action" type="submit">Publish question<ArrowIcon /></button></div>
      </form>}
      <section className="topic-list" aria-label="Daftar diskusi">
        {visibleTopics.map((topic, index) => (
          <article className="topic-row" key={`${topic.title}-${index}`}>
            <div className="topic-index"><span>0{index + 1}</span><span className="editorial-kicker">{topic.category}</span></div>
            <div className="topic-copy"><h2>{topic.title}</h2><p className="topic-body">{topic.body}</p><p>{topic.time} <span>·</span> {topic.replies} replies</p></div>
            <span className="topic-tag">{topic.question ? "Question" : "Topic"}</span>
            <button className="topic-open" aria-label={`Open topic: ${topic.title}`} onClick={() => setTitle(topic.title)}><ArrowIcon /></button>
          </article>
        ))}
        {visibleTopics.length === 0 && <p className="empty-topics">Belum ada pertanyaan. Mulai diskusi pertama.</p>}
      </section>
      <section className="share-experience"><div><p className="editorial-kicker">Community discussion</p><h2>Satu pertanyaan bisa membuka kemungkinan baru.</h2></div><button className="primary-action" onClick={openQuestionComposer}>Ask a question <ArrowIcon /></button></section>
    </ContentPage>
  );
}
