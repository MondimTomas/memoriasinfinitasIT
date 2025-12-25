import { useMemo, useState } from "react";
import "./styles.css";

const SECTIONS = [
  { key: "gastronomia", label: "Gastronomia" },
  { key: "experiencias", label: "Experiências" },
];

// ✅ Fotos: coloca em /public/photos/*.jpg  -> usa "/photos/nome.jpg"
// ✅ Vídeos: coloca em /public/videos/*.mp4 -> usa "/videos/nome.mp4"
const ENTRIES = [
  // -----------------
  // GASTRONOMIA
  // -----------------
  {
    id: "g-moments-lounge-tapas",
    section: "gastronomia",
    title: "Jantar — Moments Lounge Tapas",
    date: "2025-10-02",// mete a data quando quiseres (ex: "2025-12-24")
    place: "Moments Lounge Tapas",
    description: "Segunda reunião. Polvo e tataki de atum. Sangria louca.",
    photos: ["/photos/moments1.jpg", "/photos/moments2.jpg"],
    ratingInes: "7.5",
    ratingTomas: "7.5",
  },
  {
    id: "g-kamagami-ramen-2025-10-06",
    section: "gastronomia",
    title: "Jantar — Kamagami Ramen",
    date: "2025-10-06",
    place: "Kamagami Ramen",
    description:
      "Depois de um dia de praia fomos comer um belo ramen e uma bebida horripilante.",
    photos: ["/photos/ramen1.jpg"],
    ratingInes: "7",
    ratingTomas: "7",
  },

  {
  id: "g-o-cruzamento-2025-10-18",
  section: "gastronomia",
  title: "Almoço — O Cruzamento",
  date: "2025-10-18",
  place: "O Cruzamento",
  description:
    "Carne muito boa e ótima relação qualidade/preço.",
  photos: ["/photos/cruzamento1.jpg"],
  ratingInes: "7",
  ratingTomas: "8",
},
{
  id: "g-torreao-tio-joaquim-2025-10-18",
  section: "gastronomia",
  title: "Torreão / Ti Joaquim",
  date: "2025-10-18",
  place: "Torreão / Ti Joaquim",
  description:
    "Comemos migas e feijoada de búzios ao pé da praia dos Buzinhos, onde fomos muito felizes.",
  photos: ["/photos/otorreao.jpg"],
  ratingInes: "8.5",
  ratingTomas: "8.5",
},

{
  id: "g-jncquoi-comporta-2025-10-19",
  section: "gastronomia",
  title: "Jantar — JNcQUOI Comporta",
  date: "2025-10-19",
  place: "JNcQUOI Comporta",
  description:
    "Comida overpriced mas muito boa. Troquei a faca da minha mulher de madeira para metal pela primeira vez ahaha. Sobremesa aterradora, mas também porque já estávamos muito cheios.",
  photos: [
    "/photos/jncquoi1.jpg",
    "/photos/jncquoi2.jpg",
    "/photos/jncquoi3.jpg",
    "/photos/jncquoi4.jpg",
  ],
  ratingInes: "7",
  ratingTomas: "7",
},
{
  id: "g-barista-gastrobar-2025-10-22",
  section: "gastronomia",
  title: "Barista Gastrobar",
  date: "2025-10-22",
  place: "Setúbal",
  description:
    "Comida venezuelana — bem diferente e inspirador para futuros cozinhados. Bebidas com expectativa elevada mas não grande coisa.",
  photos: ["/photos/gastrobar1.jpg"],
  ratingInes: "8",
  ratingTomas: "7.5",
},

{
  id: "g-zama-beach-club-2025-10-24",
  section: "gastronomia",
  title: "Zama Beach Club",
  date: "2025-10-24",
  place: "Zama Beach Club",
  description:
    "Comida horrível, mas valeu pelo stand-up de qualidade e pela companhia como sempre.",
  photos: ["/photos/zama1.jpg"],
  ratingInes: "6.5",
  ratingTomas: "6.5",
},
{
  id: "g-stack-smash-burgers-2025-10-27",
  section: "gastronomia",
  title: "Stack Smash Burgers",
  date: "2025-10-27",
  place: "Stack Smash Burgers",
  description:
    "Hambúrgueres muito bons depois do trabalho — confortante.",
  photos: ["/photos/stack1.jpg"],
  ratingInes: "8",
  ratingTomas: "8",
},



  // -----------------
  // EXPERIÊNCIAS
  // -----------------
  {
    id: "e-cruzes-praia-2025-10-06",
    section: "experiencias",
    title: "Cruzes e praia",
    place: "Setúbal",
    dateStart: "2025-10-06",
    dateEnd: "",

    descTomas:
      "Foi um dia absurdo, nunca pensei ter tanta conexão com uma pessoa logo nos primeiros tempos e ter o à-vontade para fazer atividades que para mim são tão pessoais como trilhas e praia.",
    descInes: "⏳ loading…",

    photos: [
      "/photos/cruzes1.jpg",
      "/photos/cruzes2.jpg",
      "/photos/cruzes3.jpg",
      "/photos/praia1.jpg",
      "/photos/praia2.jpg",
      "/photos/praia3.jpg",
    ],
    videos: [],
  },
  {
    id: "e-tenis-2025-10-01",
    section: "experiencias",
    title: "Primeira vez a jogarmos ténis",
    place: "",
    dateStart: "2025-10-01",
    dateEnd: "",

    descTomas:
      "Não há registos deste momento pois ainda estávamos muitos nervosos, mas para uma segunda reunião tivemos uma intrusão desportiva como nunca antes visto.",
    descInes: "⏳ loading…",

    photos: ["/photos/tenis1.PNG"],
    videos: ["/videos/tenisvideo.MOV"], // ⚠️ recomenda-se MP4 (MOV pode falhar no Chrome)
  },
{
  id: "e-ares-do-monte-2025-10-18",
  section: "experiencias",
  title: "Ares do Monte — Turismo Rural",
  place: "Ares do Monte",
  dateStart: "2025-10-18",
  dateEnd: "2025-10-19",
  descTomas:
    "Ficámos de 18 a 19 e fomos muito bem recebidos. Ótimo pequeno-almoço e uma vista incrível.",
  descInes: "⏳ loading…",
  photos: [
    "/photos/aresdomonte1.jpg",
    "/photos/aresdomonte2.jpg",
    "/photos/aresdomonte3.jpg",
  ],
  videos: [],
},
{
  id: "e-badoca-2025-10-19",
  section: "experiencias",
  title: "Badoca",
  place: "Badoca Safari Park",
  dateStart: "2025-10-19",
  dateEnd: "",
  descTomas:
    "Experiência muito gira e uma iniciação para um dia irmos à Tanzânia.",
  descInes: "⏳ loading…",
  photos: [
    "/photos/badoca1.jpg",
    "/photos/badoca2.jpg",
    "/photos/badoca3.jpg",
    "/photos/badoca4.jpg",
    "/photos/badoca5.jpg",
  ],
  videos: [],
},


];

function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateRange(start, end) {
  if (!start) return "—";
  if (!end || end === start) return formatDate(start);

  const s = start.split("-").map(Number);
  const e = end.split("-").map(Number);

  const sameMonth = s[0] === e[0] && s[1] === e[1];
  if (sameMonth) {
    const monthYear = new Date(e[0], e[1] - 1, e[2]).toLocaleDateString("pt-PT", {
      month: "long",
      year: "numeric",
    });
    return `${s[2]}–${e[2]} ${monthYear}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
}

function fmtRating(x) {
  if (x === null || x === undefined || x === "") return "—";
  // Se for número ou string numérica
  const n = Number(x);
  if (Number.isFinite(n) && String(x).trim() !== "") return String(x);
  return String(x);
}

function getSortDate(entry) {
  const d =
    entry.section === "gastronomia"
      ? entry.date
      : entry.dateStart;

  // datas vazias vão para o fim
  return d && d.length ? d : "0000-00-00";
}

export default function App() {
  const [activeSection, setActiveSection] = useState("gastronomia");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return ENTRIES
      .filter((e) => e.section === activeSection)
      .filter((e) => {
        if (!q) return true;

        const hay =
          e.section === "gastronomia"
            ? [
                e.title,
                e.place,
                e.description,
                e.date,
                e.ratingInes,
                e.ratingTomas,
              ].join(" ")
            : [
                e.title,
                e.place,
                e.dateStart,
                e.dateEnd,
                e.descTomas,
                e.descInes,
              ].join(" ");

        return hay.toLowerCase().includes(q);
      })
      .sort((a, b) => (getSortDate(a) < getSortDate(b) ? 1 : -1));
  }, [activeSection, query]);

  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <div className="brand">
            <span className="brand__dot" />
            <span className="brand__name">Memórias</span>
          </div>
          <div className="muted small">feito a dois</div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>As nossas memórias</h1>
          <p>Gastronomia e experiências — guardadas num só lugar.</p>
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
            placeholder="Pesquisar (ex.: Setúbal, ramen, praia)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pesquisar memórias"
          />
        </section>

        <section className="grid">
          {filtered.map((e) => (
            <article
              key={e.id}
              className="card"
              onClick={() => setOpen(e)}
              role="button"
              tabIndex={0}
            >
              <div className="thumb">
                {e.photos?.[0] ? (
                  <img src={e.photos[0]} alt={e.title} loading="lazy" />
                ) : (
                  <div className="thumb__empty">
                    {e.section === "gastronomia" ? "🍽️" : "✨"}
                  </div>
                )}
              </div>

              <div className="card__body">
                <div className="meta">
                  {e.section === "gastronomia" ? (
                    <>
                      <span>{formatDate(e.date)}</span>
                      {e.place ? <span>• {e.place}</span> : null}
                    </>
                  ) : (
                    <>
                      <span>{formatDateRange(e.dateStart, e.dateEnd)}</span>
                      {e.place ? <span>• {e.place}</span> : null}
                    </>
                  )}
                </div>

                <h3>{e.title}</h3>

                {e.section === "gastronomia" ? (
                  <>
                    <p className="excerpt">{e.description}</p>
                    <div className="ratings">
                      <span className="badge">Inês: {fmtRating(e.ratingInes)}</span>
                      <span className="badge">Tomás: {fmtRating(e.ratingTomas)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="excerpt">
                      <span className="muted">Tomás:</span> {e.descTomas}
                    </p>
                    <p className="excerpt">
                      <span className="muted">Inês:</span> {e.descInes}
                    </p>
                    {e.videos?.length ? (
                      <div className="miniBadgeRow">
                        <span className="miniBadge">🎥 {e.videos.length} vídeo(s)</span>
                      </div>
                    ) : null}
                  </>
                )}
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

      <footer className="footer">
        <div className="container footer__inner">
          <span className="muted small">© {new Date().getFullYear()}</span>
          <span className="muted small">um site só nosso</span>
        </div>
      </footer>

      {open ? (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          onClick={(ev) => {
            if (ev.target.classList.contains("modal")) setOpen(null);
          }}
        >
          <div className="modal__panel">
            <button
              className="modal__close"
              onClick={() => setOpen(null)}
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="modal__head">
              <div className="meta">
                {open.section === "gastronomia" ? (
                  <>
                    <span>{formatDate(open.date)}</span>
                    {open.place ? <span>• {open.place}</span> : null}
                  </>
                ) : (
                  <>
                    <span>{formatDateRange(open.dateStart, open.dateEnd)}</span>
                    {open.place ? <span>• {open.place}</span> : null}
                  </>
                )}
              </div>
              <h2>{open.title}</h2>
            </div>

            {open.section === "gastronomia" ? (
              <>
                <p className="modal__text">{open.description}</p>

                <div className="ratings ratings--modal">
                  <span className="badge">Inês: {fmtRating(open.ratingInes)}</span>
                  <span className="badge">Tomás: {fmtRating(open.ratingTomas)}</span>
                </div>
              </>
            ) : (
              <div className="twoCol">
                <div className="col">
                  <h3 className="colTitle">Tomás</h3>
                  <p className="modal__text">{open.descTomas}</p>
                </div>
                <div className="col">
                  <h3 className="colTitle">Inês</h3>
                  <p className="modal__text">{open.descInes}</p>
                </div>
              </div>
            )}

            {/* ✅ Vídeos aparecem em ambas as secções */}
            {open.videos?.length ? (
              <div className="videoGrid">
                {open.videos.map((src) => (
                  <video
                    key={src}
                    src={src}
                    controls
                    playsInline
                    preload="metadata"
                  />
                ))}
              </div>
            ) : null}

            {open.photos?.length ? (
              <div className="gallery">
                {open.photos.map((src) => (
                  <img key={src} src={src} alt={open.title} loading="lazy" />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
