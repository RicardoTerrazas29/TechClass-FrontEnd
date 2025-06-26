import { useState, useEffect } from "react";
import { useLogros, Logro } from "@/hooks/useLogros";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";

type FormState = {
  titulo: string;
  icono: File | null;
  idCurso: number | "";
  idContenido: number | "";
};

function Logros() {
  const {
    logros,
    cursos,
    contenidos,
    loading,
    error,
    selectedLogro,
    setSelectedLogro,
    fetchContenidos,
    crearLogro,
    editarLogro,
    eliminarLogro,
  } = useLogros();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FormState>({
    titulo: "",
    icono: null,
    idCurso: "",
    idContenido: "",
  });

  // Cargar contenidos cuando cambia el curso seleccionado
  useEffect(() => {
    if (form.idCurso) fetchContenidos(Number(form.idCurso));
  }, [form.idCurso]);

  // Si editando, cargar datos en el formulario
  useEffect(() => {
    if (selectedLogro) {
      setForm({
        titulo: selectedLogro.titulo,
        icono: null,
        idCurso: selectedLogro.curso.idCurso,
        idContenido: selectedLogro.contenido.idContenido,
      });
      fetchContenidos(selectedLogro.curso.idCurso);
      setShowModal(true);
    }
  }, [selectedLogro]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "icono") {
      setForm((f) => ({ ...f, icono: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.titulo || !form.idCurso || !form.idContenido || (!form.icono && !selectedLogro)) {
      alert("Completa todos los campos requeridos.");
      return;
    }
    try {
      if (selectedLogro) {
        await editarLogro(selectedLogro.idLogro, {
          titulo: form.titulo,
          icono: form.icono || undefined,
          idCurso: Number(form.idCurso),
          idContenido: Number(form.idContenido),
        });
      } else {
        await crearLogro({
          titulo: form.titulo,
          icono: form.icono!,
          idCurso: Number(form.idCurso),
          idContenido: Number(form.idContenido),
        });
      }
      setShowModal(false);
      setForm({ titulo: "", icono: null, idCurso: "", idContenido: "" });
      setSelectedLogro(null);
    } catch {
      alert("Error al guardar el logro.");
    }
  };

  const handleEdit = (logro: Logro) => setSelectedLogro(logro);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar este logro?")) {
      await eliminarLogro(id);
    }
  };

  const handleNew = () => {
    setForm({ titulo: "", icono: null, idCurso: "", idContenido: "" });
    setSelectedLogro(null);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 flex items-center gap-2">
            <span>🏆</span> Gestión de Logros
          </h2>
          <button
            className="inline-flex gap-2 rounded-lg px-4 py-2 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            onClick={handleNew}
          >
            <Plus /> Nuevo Logro
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : logros.length === 0 ? (
          <div className="alert alert-info text-center rounded-xl">
            No hay logros registrados aún.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(logros) && logros.length === 0 ? (
                <div>No hay logros</div>
            ) : (logros.map((logro:Logro) => (
              <div
                key={logro.idLogro}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-2 border border-blue-100 hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:8080/${logro.icono}`}
                  alt={logro.titulo}
                  className="w-20 h-20 object-contain rounded-full border-2 border-blue-200 mb-2"
                />
                <h4 className="font-bold text-lg text-blue-700 text-center">{logro.titulo.toUpperCase()}</h4>
                <div className="text-sm text-gray-600 text-center">
                  <div>
                    <span className="font-semibold">Curso:</span> {logro.curso.nombre}
                  </div>
                  <div>
                    <span className="font-semibold">Contenido:</span> {logro.contenido.titulo}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="inline-flex gap-2 rounded-lg px-4 py-2 bg-amber-400 hover:bg-amber-500 transition items-center"
                    onClick={() => handleEdit(logro)}
                  >
                    <Edit size={16} /> Editar
                  </button>
                  <button
                    className="inline-flex gap-2 rounded-lg px-4 py-2 bg-red-500 hover:bg-red-600 transition items-center"
                    onClick={() => handleDelete(logro.idLogro)}
                  >
                    <Trash2 size={16} /> Eliminar
                  </button>
                </div>
              </div>
            )))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-2 relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                onClick={() => {
                  setShowModal(false);
                  setSelectedLogro(null);
                }}
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-4 text-blue-700">
                {selectedLogro ? "Editar Logro" : "Nuevo Logro"}
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="font-semibold">Título</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control rounded-lg"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold">Curso</label>
                  <select
                    name="idCurso"
                    className="form-select rounded-lg"
                    value={form.idCurso}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un curso</option>
                    {cursos.map((c) => (
                      <option key={c.idCurso} value={c.idCurso}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold">Contenido</label>
                  <select
                    name="idContenido"
                    className="form-select rounded-lg"
                    value={form.idContenido}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona un contenido</option>
                    {contenidos.map((c) => (
                      <option key={c.idContenido} value={c.idContenido}>
                        {c.titulo}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold">Icono</label>
                  <input
                    type="file"
                    name="icono"
                    className="form-control rounded-lg"
                    accept="image/*"
                    onChange={handleChange}
                    required={!selectedLogro}
                  />
                  {selectedLogro && (
                    <div className="mt-2">
                      <img
                        src={`http://localhost:8080/${selectedLogro.icono}`}
                        alt="icono actual"
                        className="w-12 h-12 object-contain rounded-full border"
                      />
                      <span className="text-xs text-gray-500 ml-2">Icono actual</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setSelectedLogro(null);
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {selectedLogro ? "Guardar Cambios" : "Crear Logro"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Logros;