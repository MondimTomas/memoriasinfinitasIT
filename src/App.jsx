import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (import { useMemo, useState } from "react";
import "./styles.css";

const SECTIONS = [
  { key: "gastronomia", label: "Gastronomia" },
  { key: "experiencias", label: "Experiências" },
  { key: "pensamentos", label: "Pensamentos" },
];

// Exemplo de dados (edita à vontade)
const ENTRIES = [
  {
    id: "g1",
    section: "gastronomia",
    title: "Ramen naquela noite de chuva",
    date: "2024-11-02",
    place: "Lisboa",
    text: "Foi daqueles dias simples que ficaram gigantes.",
    photos: ["/photos/ramen-1.jpg", "/photos/ramen-2.jpg"],
    tags: ["jantar", "chuva", "risos"],
  },
  {
    id: "e1",
    section: "experiencias",
    title: "Fim-de-semana no Porto",
    date: "2024-06-15",
    place: "Porto",
    text: "Andámos sem pressa, como se o tempo fosse nosso.",
    photos: ["/photos/porto-1.jpg"],
    tags: ["viagem", "cidade"],
  },
  {
    id: "p1",
    section: "pensamentos",
    title: "O que aprendi contigo",
    date: "2025-01-04",
    place: "",
    text: "Que o amor também é rotina bem cuidada.",
    photos: [],
    tags: ["nota", "gratidão"],
  },
];

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function App() {
  const [activeSection, setActiveSection] = useState("gastronomia");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null); // entry object when modal open

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES
      .filter((e) => e.section === activeSection)
      .filter((e) => {
        if (!q) return true;
        const hay = [
          e.title,
          e.place,
          e.text,
          ...(e.tags || []),
          e.date,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1)); // mais recentes primeiro
  }, [activeSection, query]);

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="hero">
          <h1>As nossas memórias</h1>
          <p>
            Gastronomia, experiências e pensamentos — guardados num só lugar.
          </p>
        </section>

        <section className="controls">
          <div className="tabs" role="tablist" aria-label="Secções">
            {SECTIONS.map((s) => (
              <button
                key={s.key}
                className={`tab ${activeSection === s.key ? "is-active" : ""}`}
                onClick={() => setActiveSection(s.key)}
                role="tab"
                aria-selected={activeSection === s.key}
              >
                {s.label}
              </button>
            ))}
          </div>

          <input
            className="search"
            placeholder="Pesquisar (ex.: Porto, ramen, gratidão)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pesquisar memórias"
          />
        </section>

        <section className="grid">
          {filtered.map((e) => (
            <article key={e.id} className="card" onClick={() => setOpen(e)}>
              <div className="thumb">
                {e.photos?.[0] ? (
                  <img src={e.photos[0]} alt={e.title} loading="lazy" />
                ) : (
                  <div className="thumb__empty">📝</div>
                )}
              </div>

              <div className="card__body">
                <div className="meta">
                  <span>{formatDate(e.date)}</span>
                  {e.place ? <span>• {e.place}</span> : null}
                </div>
                <h3>{e.title}</h3>
                <p className="excerpt">{e.text}</p>

                {e.tags?.length ? (
                  <div className="tags">
                    {e.tags.slice(0, 3).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}

          {!filtered.length ? (
            <div className="empty">
              <p>Sem resultados nesta secção.</p>
            </div>
          ) : null}
        </section>
      </main>

      <Footer />

      {open ? <Modal entry={open} onClose={() => setOpen(null)} /> : null}
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <div className="brand">
          <span className="brand__dot" />
          <span className="brand__name">Memórias</span>
        </div>
        <div className="muted small">feito a dois</div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="muted small">© {new Date().getFullYear()}</span>
        <span className="muted small">um site só nosso</span>
      </div>
    </footer>
  );
}

function Modal({ entry, onClose }) {
  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.classList.contains("modal")) onClose();
      }}
    >
      <div className="modal__panel">
        <button className="modal__close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="modal__head">
          <div className="meta">
            <span>{formatDate(entry.date)}</span>
            {entry.place ? <span>• {entry.place}</span> : null}
          </div>
          <h2>{entry.title}</h2>
        </div>

        <p className="modal__text">{entry.text}</p>

        {entry.photos?.length ? (
          <div className="gallery">
            {entry.photos.map((src) => (
              <img key={src} src={src} alt={entry.title} loading="lazy" />
            ))}
          </div>
        ) : null}

        {entry.tags?.length ? (
          <div className="tags">
            {entry.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
