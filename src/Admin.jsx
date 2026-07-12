import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import "./styles.css";

const emptyForm = {
  title: "",
  date: "",
  place: "",
  description: "",
  rating_tomas: "",
  rating_ines: "",
};

function toInputValue(value) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function safeFileName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .toLowerCase();
}

function isVideo(file) {
  return file.type.startsWith("video/");
}

function isImage(file) {
  return file.type.startsWith("image/");
}

export default function Admin() {
  const [message, setMessage] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  async function loadRestaurants() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .order("date", { ascending: false });

    setLoading(false);

    if (error) {
      setMessage(`Erro ao carregar reviews: ${error.message}`);
      return;
    }

    setRestaurants(data || []);
  }

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFiles([]);
    setMessage("");
  }

  function startEdit(restaurant) {
    setEditingId(restaurant.id);
    setMessage("");
    setFiles([]);

    setForm({
      title: restaurant.title || "",
      date: restaurant.date || "",
      place: restaurant.place || "",
      description: restaurant.description || "",
      rating_tomas: toInputValue(restaurant.rating_tomas),
      rating_ines: toInputValue(restaurant.rating_ines),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadFiles() {
    const photos = [];
    const videos = [];

    if (!files.length) return { photos, videos };

    setUploading(true);

    for (const file of files) {
      if (!isImage(file) && !isVideo(file)) {
        setUploading(false);
        throw new Error(`Ficheiro inválido: ${file.name}`);
      }

      const folder = isVideo(file) ? "videos" : "photos";
      const uniqueName = `${Date.now()}-${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const path = `${folder}/${uniqueName}`;

      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        setUploading(false);
        throw uploadError;
      }

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      const publicUrl = data.publicUrl;

      if (isVideo(file)) {
        videos.push(publicUrl);
      } else {
        photos.push(publicUrl);
      }
    }

    setUploading(false);

    return { photos, videos };
  }

  async function saveRestaurant(e) {
    e.preventDefault();
    setMessage("");

    try {
      const uploaded = await uploadFiles();

      const payload = {
        title: form.title.trim(),
        date: form.date || null,
        place: form.place.trim() || null,
        description: form.description.trim() || null,
        rating_tomas: form.rating_tomas === "" ? null : Number(form.rating_tomas),
        rating_ines: form.rating_ines === "" ? null : Number(form.rating_ines),
      };

      let result;

      if (editingId) {
        const current = restaurants.find((r) => r.id === editingId);

        payload.photos = [...(current?.photos || []), ...uploaded.photos];
        payload.videos = [...(current?.videos || []), ...uploaded.videos];

        result = await supabase
          .from("restaurants")
          .update(payload)
          .eq("id", editingId);
      } else {
        payload.photos = uploaded.photos;
        payload.videos = uploaded.videos;

        result = await supabase.from("restaurants").insert(payload);
      }

      if (result.error) {
        setMessage(`Erro ao guardar: ${result.error.message}`);
        return;
      }

      setMessage(editingId ? "Review atualizada com sucesso ✅" : "Review guardada com sucesso ✅");

      resetForm();
      await loadRestaurants();
    } catch (err) {
      setUploading(false);
      setMessage(`Erro: ${err.message}`);
    }
  }

  async function deleteRestaurant(id, title) {
    const ok = window.confirm(`Tens a certeza que queres apagar "${title}"?`);
    if (!ok) return;

    setMessage("");

    const { error } = await supabase.from("restaurants").delete().eq("id", id);

    if (error) {
      setMessage(`Erro ao apagar: ${error.message}`);
      return;
    }

    setMessage("Review apagada com sucesso ✅");

    if (editingId === id) {
      resetForm();
    }

    await loadRestaurants();
  }

  return (
    <div className="app">
      <main className="container adminPage">
        <div className="adminHeader">
          <div>
            <h1>{editingId ? "Editar restaurante" : "Adicionar restaurante"}</h1>
            <p className="muted">
              Aqui consegues adicionar, editar e apagar reviews guardadas no Supabase.
            </p>
          </div>

          {editingId ? (
            <button className="adminButton adminButton--ghost" onClick={resetForm}>
              Cancelar edição
            </button>
          ) : null}
        </div>

        <form className="adminForm" onSubmit={saveRestaurant}>
          <label>
            Nome
            <input
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Ex.: Kodashi"
              required
            />
          </label>

          <label>
            Data
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </label>

          <label>
            Local
            <input
              value={form.place}
              onChange={(e) => updateField("place", e.target.value)}
              placeholder="Ex.: Setúbal"
            />
          </label>

          <label>
            Descrição
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Escreve a memória..."
              rows={5}
            />
          </label>

          <div className="adminGridTwo">
            <label>
              Nota Tomás
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={form.rating_tomas}
                onChange={(e) => updateField("rating_tomas", e.target.value)}
              />
            </label>

            <label>
              Nota Inês
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={form.rating_ines}
                onChange={(e) => updateField("rating_ines", e.target.value)}
              />
            </label>
          </div>

          <label>
            Fotos / vídeos
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
            />
          </label>

          {files.length ? (
            <p className="muted small">{files.length} ficheiro(s) selecionado(s)</p>
          ) : null}

          <button className="adminButton" type="submit" disabled={uploading}>
            {uploading
              ? "A enviar ficheiros..."
              : editingId
                ? "Guardar alterações"
                : "Guardar restaurante"}
          </button>

          {message ? <p className="adminMessage">{message}</p> : null}
        </form>

        <section className="adminListSection">
          <div className="adminListHeader">
            <h2>Reviews guardadas</h2>
            <button className="adminButton adminButton--ghost" onClick={loadRestaurants}>
              Atualizar lista
            </button>
          </div>

          {loading ? <p className="muted">A carregar...</p> : null}

          {!loading && restaurants.length === 0 ? (
            <p className="muted">Ainda não há reviews no Supabase.</p>
          ) : null}

          <div className="adminList">
            {restaurants.map((r) => (
              <article key={r.id} className="adminListItem">
                <div>
                  <h3>{r.title}</h3>
                  <p className="muted small">
                    {r.date || "Sem data"} {r.place ? `• ${r.place}` : ""}
                  </p>
                  <p className="adminListDescription">
                    {r.description || "Sem descrição."}
                  </p>

                  <div className="ratings">
                    <span className="badge">Tomás: {r.rating_tomas ?? "—"}</span>
                    <span className="badge">Inês: {r.rating_ines ?? "—"}</span>
                  </div>

                  <p className="muted small">
                    {(r.photos || []).length} foto(s) • {(r.videos || []).length} vídeo(s)
                  </p>
                </div>

                <div className="adminListActions">
                  <button className="adminButton adminButton--ghost" onClick={() => startEdit(r)}>
                    Editar
                  </button>
                  <button
                    className="adminButton adminButton--danger"
                    onClick={() => deleteRestaurant(r.id, r.title)}
                  >
                    Apagar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
