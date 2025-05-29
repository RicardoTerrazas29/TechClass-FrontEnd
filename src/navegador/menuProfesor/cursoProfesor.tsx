// CursoProfesor.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Curso {
  idCurso: number;
  nombre: string;
  descripcion: string;
  foto: string;
  nombreProfesor: string;
  idProfesor: number;
}

interface Contenido {
  idContenido: number;
  titulo: string;
  descripcion: string;
  tipoContenido: string;
  urlContenido: string;
}

const CursoProfesor: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [nombreProfesor, setNombreProfesor] = useState<number | null>(null);
  const [profesores, setProfesores] = useState<{ id: number; name: string }[]>([]);
  const [editandoCurso, setEditandoCurso] = useState<boolean>(false);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    foto: "",
    nombreProfesor: "",
  });

  const [contenidos, setContenidos] = useState<Contenido[]>([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState<Curso | null>(null);
  const [mostrarContenidos, setMostrarContenidos] = useState(false);
  const [nuevoContenido, setNuevoContenido] = useState<Partial<Contenido>>({});
  const [editandoContenido, setEditandoContenido] = useState<Contenido | null>(null);

  useEffect(() => {
    cargarCursos();
    axios
      .get("http://localhost:8080/profesor")
      .then((res) =>
        setProfesores(res.data.map((prof: any) => ({ id: prof.idProfesor, name: prof.name })))
      )
      .catch((err) => console.error("Error al obtener profesores:", err));
  }, []);

  const validarCampos = (): boolean => {
    const nuevosErrores = {
      nombre: "",
      descripcion: "",
      foto: "",
      nombreProfesor: "",
    };

    let valido = true;
    if (!nombre.trim()) {
      nuevosErrores.nombre = "El nombre del curso es obligatorio.";
      valido = false;
    }
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
      valido = false;
    }
    if (!foto && !editandoCurso) {
      nuevosErrores.foto = "Debes subir una imagen para el curso.";
      valido = false;
    }
    if (!nombreProfesor) {
      nuevosErrores.nombreProfesor = "Selecciona un profesor.";
      valido = false;
    }

    setErrores(nuevosErrores);
    return valido;
  };

  const cargarCursos = () => {
    axios
      .get("http://localhost:8080/api/cursos")
      .then((res) => setCursos(res.data))
      .catch((err) => console.error("Error al obtener cursos:", err));
  };

  const crearCurso = () => {
    if (!validarCampos()) return;
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (foto) formData.append("foto", foto);
    formData.append("idProfesor", String(nombreProfesor));
    axios
      .post("http://localhost:8080/api/cursos", formData)
      .then(() => {
        cargarCursos();
        resetForm();
      })
      .catch((err) => console.error("Error al crear curso:", err));
  };

  const editarCurso = (curso: Curso) => {
    setEditandoCurso(true);
    setCursoId(curso.idCurso);
    setNombre(curso.nombre);
    setDescripcion(curso.descripcion);
    setFoto(null);
    setNombreProfesor(curso.idProfesor);
  };

  const actualizarCurso = () => {
    if (!cursoId || !validarCampos()) return;
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (foto) formData.append("foto", foto);
    formData.append("idProfesor", String(nombreProfesor));
    axios
      .put(`http://localhost:8080/api/cursos/${cursoId}`, formData)
      .then(() => {
        cargarCursos();
        resetForm();
      })
      .catch((err) => console.error("Error al actualizar curso:", err));
  };

  const eliminarCurso = (id: number) => {
    axios
      .delete(`http://localhost:8080/api/cursos/${id}`)
      .then(() => {
        setCursos((prev) => prev.filter((c) => c.idCurso !== id));
      })
      .catch((err) => console.error("Error al eliminar curso:", err));
  };

  const resetForm = () => {
    setEditandoCurso(false);
    setCursoId(null);
    setNombre("");
    setDescripcion("");
    setFoto(null);
    setNombreProfesor(null);
    setErrores({ nombre: "", descripcion: "", foto: "", nombreProfesor: "" });
  };

  const cargarContenidos = (curso: Curso) => {
    axios
      .get(`http://localhost:8080/api/contenidos/curso/${curso.idCurso}`)
      .then((res) => {
        setContenidos(res.data);
        setCursoSeleccionado(curso);
        setMostrarContenidos(true);
      })
      .catch((err) => {
        console.error("Error al obtener contenidos:", err);
        setMostrarContenidos(false);
      });
  };

  const cerrarContenidos = () => {
    setMostrarContenidos(false);
    setCursoSeleccionado(null);
    setContenidos([]);
    cancelarEdicionContenido();
  };

  const manejarCambioContenido = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNuevoContenido({ ...nuevoContenido, [name]: value });
  };

  const guardarContenido = () => {
    if (!cursoSeleccionado) return;
    const contenidoDTO = { ...nuevoContenido, idCurso: cursoSeleccionado.idCurso };
    const endpoint = editandoContenido
      ? `http://localhost:8080/api/contenidos/${editandoContenido.idContenido}`
      : "http://localhost:8080/api/contenidos";
    const metodo = editandoContenido ? axios.put : axios.post;

    metodo(endpoint, contenidoDTO)
      .then(() => {
        cargarContenidos(cursoSeleccionado);
        setNuevoContenido({});
        setEditandoContenido(null);
      })
      .catch((err) => console.error("Error al guardar contenido:", err));
  };

  const editarContenido = (contenido: Contenido) => {
    setEditandoContenido(contenido);
    setNuevoContenido(contenido);
  };

  const cancelarEdicionContenido = () => {
    setEditandoContenido(null);
    setNuevoContenido({});
  };

  const eliminarContenido = (idContenido: number) => {
    if (!cursoSeleccionado) return;
    if (!window.confirm("¿Estás seguro de eliminar este contenido?")) return;
    axios
      .delete(`http://localhost:8080/api/contenidos/${idContenido}`)
      .then(() => cargarContenidos(cursoSeleccionado))
      .catch((err) => console.error("Error al eliminar contenido:", err));
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">📚 Gestión de Cursos 📚</h2>

      {/* Crear/editar curso */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4>{editandoCurso ? "✏️ Editar Curso" : "➕ Nuevo Curso"}</h4>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className={`form-control ${errores.nombre && "is-invalid"}`}
                placeholder="Nombre del Curso"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className={`form-control ${errores.descripcion && "is-invalid"}`}
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
            </div>
            <div className="col-md-6">
              <input
                type="file"
                className={`form-control ${errores.foto && "is-invalid"}`}
                onChange={(e) => setFoto(e.target.files?.[0] || null)}
              />
              {errores.foto && <div className="invalid-feedback">{errores.foto}</div>}
            </div>
            <div className="col-md-6">
              <select
                className={`form-control ${errores.nombreProfesor && "is-invalid"}`}
                value={nombreProfesor ?? ""}
                onChange={(e) => setNombreProfesor(Number(e.target.value))}
              >
                <option value="">Selecciona un profesor</option>
                {profesores.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errores.nombreProfesor && <div className="invalid-feedback">{errores.nombreProfesor}</div>}
            </div>
            <div className="col-12 d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={editandoCurso ? actualizarCurso : crearCurso}
              >
                {editandoCurso ? "✅ Actualizar" : "➕ Crear"} Curso
              </button>
              {editandoCurso && (
                <button className="btn btn-secondary" onClick={resetForm}>
                  ❌ Cancelar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lista de cursos */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cursos.map((curso) => (
          <div className="col" key={curso.idCurso}>
            <div className="card h-100 shadow-sm">
              {curso.foto && (
                <img
                  src={`http://localhost:8080/${curso.foto}`}
                  alt={curso.nombre}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{curso.nombre}</h5>
                <p className="card-text">{curso.descripcion}</p>
                <p className="text-muted">Profesor: {curso.nombreProfesor}</p>
                <button className="btn btn-primary btn-sm me-2" onClick={() => cargarContenidos(curso)}>
                  📄 Ver Contenidos
                </button>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarCurso(curso)}>
                  ✏️ Editar
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarCurso(curso.idCurso)}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gestión de contenidos */}
      {mostrarContenidos && cursoSeleccionado && (
        <div className="mt-5 p-4 border rounded bg-light">
          <h3>Contenidos del curso: <span className="text-primary">{cursoSeleccionado.nombre}</span></h3>
          <button className="btn btn-secondary btn-sm mb-3" onClick={cerrarContenidos}>✖️ Cerrar</button>

          <div className="mb-3">
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={nuevoContenido.titulo || ""}
              onChange={manejarCambioContenido}
              className="form-control mb-2"
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={nuevoContenido.descripcion || ""}
              onChange={manejarCambioContenido}
              className="form-control mb-2"
            />
            <select
              name="tipoContenido"
              value={nuevoContenido.tipoContenido || ""}
              onChange={manejarCambioContenido}
              className="form-select mb-2"
            >
              <option value="">Tipo de contenido</option>
              <option value="texto">Texto</option>
              <option value="imagen">Imagen</option>
              <option value="video">Video</option>
            </select>
            <input
              type="text"
              name="urlContenido"
              placeholder="URL del contenido"
              value={nuevoContenido.urlContenido || ""}
              onChange={manejarCambioContenido}
              className="form-control mb-2"
            />
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={guardarContenido}>
                {editandoContenido ? "✅ Actualizar" : "➕ Crear"} contenido
              </button>
              {editandoContenido && (
                <button className="btn btn-secondary" onClick={cancelarEdicionContenido}>
                  ❌ Cancelar
                </button>
              )}
            </div>
          </div>

          <ul className="list-group">
            {contenidos.map((contenido) => (
              <li key={contenido.idContenido} className="list-group-item">
                <h5>{contenido.titulo}</h5>
                <p>{contenido.descripcion}</p>
                <p><strong>Tipo:</strong> {contenido.tipoContenido}</p>
                {contenido.urlContenido && (
                  <a href={contenido.urlContenido} target="_blank" rel="noopener noreferrer">Ver recurso</a>
                )}
                <div className="mt-2">
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editarContenido(contenido)}>✏️ Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarContenido(contenido.idContenido)}>🗑️ Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CursoProfesor;


