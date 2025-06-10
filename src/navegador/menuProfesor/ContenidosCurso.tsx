import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Definiciones de interfaces (si no las tienes ya en un archivo compartido, mantenlas aquí)
interface Contenido {
  idContenido: number;
  titulo: string;
  descripcion: string;
  tipoContenido: string;
  recursos?: Recurso[];
}

interface Recurso {
  idRecurso?: number; 
  nombre: string;
  tipoContenido: string;
  url: string;
}

const ContenidosCurso: React.FC = () => {
  const { idCurso } = useParams<{ idCurso: string }>(); // Captura el idCurso de la URL
  const navigate = useNavigate(); // Para el botón de "Volver"

  // Estados para el curso y sus contenidos
  const [nombreCurso, setNombreCurso] = useState<string>("");
  const [contenidos, setContenidos] = useState<Contenido[]>([]);

  // Estados para la gestión de nuevos/edición de contenidos
  const [nuevoContenido, setNuevoContenido] = useState<Partial<Contenido>>({}); // Usamos Partial para permitir campos vacíos al inicio
  const [editandoContenido, setEditandoContenido] = useState<Contenido | null>(null);

  // Estado para los recursos
  const [formularioRecurso, setFormularioRecurso] = useState<number | null>(null);
  const [nuevoRecurso, setNuevoRecurso] = useState<Recurso>({
    nombre: "",
    url: "",
    tipoContenido: "",
  })
  const [recursosVisibles, setRecursosVisibles] = useState<number|null>(null);

  const toggleRecursos = (idContenido: number) => {
    setRecursosVisibles(recursosVisibles === idContenido ? null : idContenido);
  }

  // Función para crear un nuevo recurso
  const crearRecurso = (idContenido: number) => {
    setFormularioRecurso(formularioRecurso === idContenido ? null : idContenido);
    setNuevoRecurso({ nombre: "", tipoContenido: "", url: "" }); 
  };

  const handleResource =(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setNuevoRecurso({...nuevoRecurso, [name]: value});
  }

  const guardarRecurso = (idContenido: number) => {
    if (nuevoRecurso.idRecurso) {
    // Editar recurso existente
    axios
      .put(
        `http://localhost:8080/api/contenidos/${idContenido}/recursos/${nuevoRecurso.idRecurso}`,
        nuevoRecurso
      )
      .then(() => {
        setFormularioRecurso(null);
        setNuevoRecurso({ nombre: "", url: "", tipoContenido: "" });
        cargarContenidosDelCurso();
      })
      .catch((err) => console.error("Error al editar recurso:", err));
    } else {
    // Aquí deberías hacer el POST a tu backend
    axios.post(`http://localhost:8080/api/contenidos/${idContenido}/recursos`, [nuevoRecurso])
      .then(() => {
        setFormularioRecurso(null);
        setNuevoRecurso({ nombre: "", url: "", tipoContenido: "" });
        cargarContenidosDelCurso();
      })
      .catch((err) => console.error("Error al guardar recurso:", err));
    }
  };

  // Función para editar un recurso
  const editarRecursoClick = (idContenido: number, recurso: any) => {
    setFormularioRecurso(idContenido);
    setNuevoRecurso({
      nombre: recurso.nombre,
      url: recurso.url,
      tipoContenido: recurso.tipoContenido,
      idRecurso: recurso.idRecurso, // Asegúrate de tener este campo en tu modelo
    });
  };
  // Función para eliminar un recurso
  const eliminarRecurso = (idContenido: number, idRecurso: number) => {
  axios
    .delete(`http://localhost:8080/api/contenidos/${idContenido}/recursos/${idRecurso}`)
    .then(() => cargarContenidosDelCurso())
    .catch((err) => console.error("Error al eliminar recurso:", err));
  };
  // Función para cargar los contenidos del curso
  const cargarContenidosDelCurso = () => {
    if (idCurso) {
       axios
      .get(`http://localhost:8080/api/contenidos/curso/${idCurso}`)
      .then((res) => {
        setNombreCurso(res.data.nombreCurso);
        setContenidos(res.data.contenidos);
      })
      .catch((err) => {
        console.error("Error cargando curso y contenidos:", err);
        setNombreCurso("Curso no encontrado");
        setContenidos([]);
      });
    }
  };

  useEffect(() => {
    cargarContenidosDelCurso();
  }, [idCurso]); // Dependencia en idCurso para recargar si cambia la URL

  // Funciones para la gestión de contenidos (crear, editar, eliminar)
  const manejarCambioContenido = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNuevoContenido({ ...nuevoContenido, [name]: value });
  };

  const guardarContenido = () => {
    if (!idCurso) return; // Asegurarse de tener un idCurso
    const contenidoDTO = { ...nuevoContenido, idCurso: Number(idCurso) }; // Asegurarse de que idCurso sea un número

    const endpoint = editandoContenido
      ? `http://localhost:8080/api/contenidos/${editandoContenido.idContenido}`
      : "http://localhost:8080/api/contenidos";
    const metodo = editandoContenido ? axios.put : axios.post;

    metodo(endpoint, contenidoDTO)
      .then(() => {
        cargarContenidosDelCurso(); // Recargar la lista de contenidos
        setNuevoContenido({}); // Limpiar formulario
        setEditandoContenido(null); // Desactivar modo edición
      })
      .catch((err) => console.error("Error al guardar contenido:", err));
  };

  const editarContenidoClick = (contenido: Contenido) => {
    setEditandoContenido(contenido); // Establecer el contenido que se está editando
    setNuevoContenido(contenido); // Cargar datos en el formulario
  };

  const cancelarEdicionContenido = () => {
    setEditandoContenido(null);
    setNuevoContenido({}); // Limpiar formulario
  };

  const eliminarContenido = (idContenido: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este contenido?")) return;
    axios
      .delete(`http://localhost:8080/api/contenidos/${idContenido}`)
      .then(() => cargarContenidosDelCurso()) // Recargar la lista
      .catch((err) => console.error("Error al eliminar contenido:", err));
  };

  return (
  <div className="py-4 px-4 sm:px-4 bg-[#f0f8ff] min-vh-100">
    <h2
      className="w-100 text-center mb-4"
      style={{
        color: "#0077b6",
        fontWeight: "bold",
        fontSize: "2.2rem",
        wordBreak: "break-word",
      }}
    >
      📚 Contenidos del Curso:{" "}
      <span className="text-primary">{nombreCurso || "Cargando..."}</span>
    </h2>
    <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-2">
      <button
        className="btn btn-secondary"
        onClick={() => navigate(-1)}
        style={{ fontSize: "1.1rem" }}
      >
        🔙 Volver a Cursos
      </button>
    </div>

    {/* Formulario para añadir/editar contenido */}
    <div
      className="card mb-4 shadow-sm p-3"
      style={{
        borderRadius: "20px",
        background: "#e3f2fd",

        margin: "0 auto",
      }}
    >
      <h4 style={{ color: "#023e8a", fontWeight: "bold" }}>
        {editandoContenido ? "✏️ Editar Contenido" : "➕ Nuevo Contenido"}
      </h4>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <input
            type="text"
            name="titulo"
            placeholder="Título del Contenido"
            className="form-control"
            style={{ borderRadius: "10px", fontSize: "1.1rem" }}
            value={nuevoContenido.titulo || ""}
            onChange={manejarCambioContenido}
          />
        </div>
        <div className="col-12 col-md-6">
          <select
            name="tipoContenido"
            className="form-select"
            style={{ borderRadius: "10px", fontSize: "1.1rem" }}
            value={nuevoContenido.tipoContenido || ""}
            onChange={manejarCambioContenido}
          >
            <option value="">--Selecciona tipo de contenido--</option>
            <option value="Teoría">📖 Teoría</option>
            <option value="Evaluación">📝 Evaluación</option>
            <option value="Foro">💬 Foro</option>
          </select>
        </div>
        <div className="col-12">
          <textarea
            name="descripcion"
            placeholder="Descripción del Contenido"
            className="form-control"
            style={{ borderRadius: "10px", fontSize: "1.1rem" }}
            rows={3}
            value={nuevoContenido.descripcion || ""}
            onChange={manejarCambioContenido}
          ></textarea>
        </div>
        <div className="col-12 d-flex flex-column flex-sm-row gap-2">
          <button
            className="btn btn-success"
            style={{ fontSize: "1.1rem", borderRadius: "10px" }}
            onClick={guardarContenido}
          >
            {editandoContenido ? "✅ Actualizar Contenido" : "➕ Añadir Contenido"}
          </button>
          {editandoContenido && (
            <button
              className="btn btn-secondary"
              style={{ fontSize: "1.1rem", borderRadius: "10px" }}
              onClick={cancelarEdicionContenido}
            >
              ❌ Cancelar
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Lista de contenidos */}
    <h3
      className="mt-5 mb-3"
      style={{ color: "#0077b6", fontWeight: "bold" }}
    >
      Contenidos Existentes
    </h3>
    {contenidos.length === 0 ? (
      <div
        className="alert alert-info text-center"
        style={{ fontSize: "1.2rem", borderRadius: "15px" }}
      >
        No hay contenidos disponibles para este curso. ¡Añade el primero!
      </div>
    ) : (
      <ul className="list-group" style={{ margin: "0 auto" }}>
        {contenidos.map((contenido) => (
          <li
            key={contenido.idContenido}
            className="list-group-item d-flex flex-column mb-3 shadow-sm"
            style={{
              borderRadius: "15px",
              background: "#fffbea",
              border: "2px solid #ffd166",
              wordBreak: "break-word",
            }}
          >
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
              <div className="flex-grow-1">
                <h5 style={{ color: "#f77f00", fontWeight: "bold" }}>
                  {contenido.titulo}
                </h5>
                <p className="mb-1" style={{ fontSize: "1.1rem" }}>
                  {contenido.descripcion}
                </p>
                <p className="text-muted small">
                  <strong>Tipo:</strong> {contenido.tipoContenido}
                </p>
              </div>
              <div className="d-flex flex-wrap gap-2 mt-2 mt-md-0">
                <button
                  className="btn btn-info btn-sm"
                  style={{ fontSize: "1.1rem", borderRadius: "10px" }}
                  onClick={() => toggleRecursos(contenido.idContenido)}
                >
                  {recursosVisibles === contenido.idContenido
                    ? "🔼 Ocultar Recursos"
                    : "🔽 Mostrar Recursos"}
                </button>
                <button
                  className="btn btn-success btn-sm"
                  style={{ fontSize: "1.1rem", borderRadius: "10px" }}
                  onClick={() => crearRecurso(contenido.idContenido)}
                >
                  ➕ Añadir Recurso
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  style={{ fontSize: "1.1rem", borderRadius: "10px" }}
                  onClick={() => editarContenidoClick(contenido)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ fontSize: "1.1rem", borderRadius: "10px" }}
                  onClick={() => eliminarContenido(contenido.idContenido)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
            {/* Mostrar recursos si corresponde */}
            {recursosVisibles === contenido.idContenido && (
              <div
                className="mt-3"
                style={{
                  background: "#e0f7fa",
                  borderRadius: "10px",
                  padding: "10px",
                  overflowX: "auto",
                }}
              >
                <h6 style={{ color: "#009688", fontWeight: "bold" }}>
                  Recursos:
                </h6>
                {contenido.recursos && contenido.recursos.length > 0 ? (
                  <ul className="p-0 m-0" style={{ listStyle: "none" }}>
                    {contenido.recursos.map((recurso, idx) => (
                      <li
                        key={idx}
                        className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2 gap-2"
                        style={{ fontSize: "1.05rem" }}
                      >
                        <span
                          style={{
                            color: "#0288d1",
                            fontWeight: "bold",
                            wordBreak: "break-word",
                          }}
                        >
                          {recurso.nombre}
                        </span>
                        <span>({recurso.tipoContenido})</span>
                        <a
                          href={recurso.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#43a047",
                            textDecoration: "underline",
                            wordBreak: "break-all",
                          }}
                        >
                          Ver recurso
                        </a>
                        <div className="d-flex gap-2 mt-2 mt-sm-0">
                          <button
                            className="btn btn-danger btn-sm"
                            style={{ borderRadius: "8px" }}
                            onClick={() => {
                              if (
                                window.confirm(
                                  "¿Estás seguro de eliminar este recurso?"
                                ) &&
                                recurso.idRecurso !== undefined
                              ) {
                                eliminarRecurso(
                                  contenido.idContenido,
                                  recurso.idRecurso
                                );
                              }
                            }}
                          >
                            🗑️
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            style={{ borderRadius: "8px" }}
                            onClick={() =>
                              editarRecursoClick(
                                contenido.idContenido,
                                recurso
                              )
                            }
                          >
                            ✏️
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted" style={{ fontSize: "1.1rem" }}>
                    No hay recursos para este contenido.
                  </p>
                )}
              </div>
            )}
            {/* Formulario de recurso solo para este contenido */}
            {formularioRecurso === contenido.idContenido && (
              <form
                className="mt-3 border-top pt-3"
                style={{
                  background: "#fff3e0",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <div className="mb-2">
                  <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Nombre del recurso"
                    style={{ borderRadius: "8px", fontSize: "1.05rem" }}
                    value={nuevoRecurso.nombre}
                    onChange={handleResource}
                    required
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="url"
                    className="form-control"
                    placeholder="URL del recurso"
                    style={{ borderRadius: "8px", fontSize: "1.05rem" }}
                    value={nuevoRecurso.url}
                    onChange={handleResource}
                    required
                  />
                </div>
                <div className="mb-2">
                  <select
                    name="tipoContenido"
                    className="form-select"
                    style={{ borderRadius: "8px", fontSize: "1.05rem" }}
                    value={nuevoRecurso.tipoContenido}
                    onChange={handleResource}
                    required
                  >
                    <option value="">--Tipo de recurso--</option>
                    <option value="Documento">📄 Documento</option>
                    <option value="Video">🎬 Video</option>
                    <option value="Juego Interactivo">
                      🎮 Juego Interactivo
                    </option>
                    <option value="Quiz">❓ Quiz</option>
                  </select>
                </div>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: "8px", fontSize: "1.05rem" }}
                    onClick={() => guardarRecurso(contenido.idContenido)}
                  >
                    {nuevoRecurso.idRecurso
                      ? "Guardar Cambios"
                      : "Guardar Recurso"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ borderRadius: "8px", fontSize: "1.05rem" }}
                    onClick={() => setFormularioRecurso(null)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
};

export default ContenidosCurso;