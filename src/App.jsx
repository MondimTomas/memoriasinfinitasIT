import { useMemo, useState } from "react";
import "./styles.css";

const SECTIONS = [
  { key: "gastronomia", label: "Gastronomia" },
  { key: "experiencias", label: "Experiências" },
];

// ---- DADOS (edita à vontade) ----
// Fotos ficam em /public/photos/... e referenciam-se assim: "/photos/xxx.jpg"
const ENTRIES = [
  // GASTRONOMIA
 {
  id: "g-moments-lounge-tapas",
  section: "gastronomia",
  title: "Jantar — Moments Lounge Tapas",
  date: "2025-10-02", // muda se quiseres
  place: "Moments Lounge Tapas",
  description: "Segunda reunião. Comemos polvo e tataki de atum, e bebemos sangria louca.",
  photos: ["/photos/moments1.jpg", "/photos/moments2.jpg"],
  ratingInes: 7,
  ratingTomas: 7,
},


  // EXPERIÊNCIAS (pode ter data única OU range)
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
},

];

function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateRange(start, end) {
  if (!start) return "";
  if (!end || end === start) return formatDate(start);

  const s = start.split("-").map(Number);
  const e = end.split("-").map(Number);
  const ds = new Date(s[0], s[1] - 1, s[2]);
  const de = new Date(e[0], e[1] - 1, e[2]);

  // Se for no mesmo mês/ano, fica mais clean: "15–16 junho 2024"
  const sameMonth = s[0] === e[0] && s[1] === e[1];
  if (sameMonth) {
    const monthYear = de.toLocaleDateString("pt-PT", { month: "long", year: "numeric" });
    return `${s[2]}–${e[2]} ${monthYear}`;
  }
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function fmtRating(x) {
  if (x === null || x === undefined || x === "") return "—";
  return Number.isFinite(Number(x)) ? String(x) : String(x);
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
            ? [e.title, e.place, e.description, e.date, e.ratingInes, e.ratingTomas].join(" ")
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
      .sort((a, b) => {
        const da = a.section === "gastronomia" ? a.date : a.dateStart;
        const db = b.section === "gastronomia" ? b.date : b.dateStart;
        return da < db ? 1 : -1;
      });
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
            placeholder="Pesquisar (ex.: Porto, ramen, Lisboa)…"
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
                  <div className="thumb__empty">✨</div>
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
            <button className="modal__close" onClick={() => setOpen(null)} aria-label="Fechar">
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

                {open.photos?.length ? (
                  <div className="gallery">
                    {open.photos.map((src) => (
                      <img key={src} src={src} alt={open.title} loading="lazy" />
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <>
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

                {open.photos?.length ? (
                  <div className="gallery">
                    {open.photos.map((src) => (
                      <img key={src} src={src} alt={open.title} loading="lazy" />
                    ))}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
