import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Definiciones de interfaces (si no las tienes ya en un archivo compartido, mantenlas aquí)
interface Contenido {
  idContenido: number;
  titulo: string;
  descripcion: string;
  tipoContenido: string;
  urlContenido: string;
}

const ContenidosCurso: React.FC = () => {
  const { idCurso } = useParams<{ idCurso: string }>(); // Captura el idCurso de la URL
  const navigate = useNavigate(); // Para el botón de "Volver"

  // Estados para el curso y sus contenidos
  const [nombreCurso, setNombreCurso] = useState("");
  const [contenidos, setContenidos] = useState<Contenido[]>([]);

  // Estados para la gestión de nuevos/edición de contenidos
  const [nuevoContenido, setNuevoContenido] = useState<Partial<Contenido>>({}); // Usamos Partial para permitir campos vacíos al inicio
  const [editandoContenido, setEditandoContenido] = useState<Contenido | null>(null);

  // Función para cargar los contenidos del curso
  const cargarContenidosDelCurso = () => {
    if (idCurso) {
      // Cargar nombre del curso
      axios
        .get(`http://localhost:8080/api/contenidos/curso/${idCurso}`)
        .then((res) => {
          
          setNombreCurso(res.data[0].curso.nombre);
    
        })
        .catch((err) => {
          console.error("Error cargando nombre del curso:", err);
          // Puedes redirigir o mostrar un error si el curso no existe
        });

      // Cargar contenidos del curso
      axios
        .get(`http://localhost:8080/api/contenidos/curso/${idCurso}`)
        .then((res) => {
        console.log(res.data);
          setContenidos(res.data);
        })
        .catch((err) => {
          console.error("Error cargando contenidos:", err);
          setContenidos([]); // Asegurarse de que esté vacío si hay un error
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
    <div className="container py-4">
      <h2 className="text-center mb-4">
        📚 Contenidos del Curso:{" "}
        <span className="text-primary">{nombreCurso || "Cargando..."}</span>
      </h2>
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        🔙 Volver a Cursos
      </button>

      {/* Formulario para añadir/editar contenido */}
      <div className="card mb-4 shadow-sm p-3">
        <h4>{editandoContenido ? "✏️ Editar Contenido" : "➕ Nuevo Contenido"}</h4>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="titulo"
              placeholder="Título del Contenido"
              className="form-control"
              value={nuevoContenido.titulo || ""}
              onChange={manejarCambioContenido}
            />
          </div>
          <div className="col-md-6">
            <select
              name="tipoContenido"
              className="form-select"
              value={nuevoContenido.tipoContenido || ""}
              onChange={manejarCambioContenido}
            >
              <option value="">Selecciona tipo de contenido</option>
              <option value="texto">Texto</option>
              <option value="imagen">Imagen</option>
              <option value="video">Video</option>
              <option value="documento">Documento</option> {/* Agregué "documento" como ejemplo */}
            </select>
          </div>
          <div className="col-12">
            <textarea
              name="descripcion"
              placeholder="Descripción del Contenido"
              className="form-control"
              rows={3}
              value={nuevoContenido.descripcion || ""}
              onChange={manejarCambioContenido}
            ></textarea>
          </div>
          <div className="col-12">
            <input
              type="text"
              name="urlContenido"
              placeholder="URL del Recurso (Ej: URL de YouTube, Google Drive, imagen)"
              className="form-control"
              value={nuevoContenido.urlContenido || ""}
              onChange={manejarCambioContenido}
            />
          </div>
          <div className="col-12 d-flex gap-2">
            <button className="btn btn-success" onClick={guardarContenido}>
              {editandoContenido ? "✅ Actualizar Contenido" : "➕ Añadir Contenido"}
            </button>
            {editandoContenido && (
              <button className="btn btn-secondary" onClick={cancelarEdicionContenido}>
                ❌ Cancelar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lista de contenidos */}
      <h3 className="mt-5 mb-3">Contenidos Existentes</h3>
      {contenidos.length === 0 ? (
        <p>No hay contenidos disponibles para este curso. ¡Añade el primero!</p>
      ) : (
        <ul className="list-group">
          {contenidos.map((contenido) => (
            <li key={contenido.idContenido} className="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded">
              <div>
                <h5>{contenido.titulo}</h5>
                <p className="mb-1">{contenido.descripcion}</p>
                <p className="text-muted small">
                  <strong>Tipo:</strong> {contenido.tipoContenido}
                </p>
                {contenido.urlContenido && (
                  <a
                    href={contenido.urlContenido}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-info btn-sm mt-1"
                  >
                    🔗 Ver Recurso
                  </a>
                )}
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editarContenidoClick(contenido)} // Renombré para evitar confusión con el estado
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarContenido(contenido.idContenido)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContenidosCurso;