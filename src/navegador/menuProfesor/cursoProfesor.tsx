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

const CursoProfesor: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [nombreProfesor, setNombreProfesor] = useState<number | null>(null);
  const [profesores, setProfesores] = useState<{ id: number; name: string }[]>(
    []
  );
  const [editando, setEditando] = useState<boolean>(false);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    foto: "",
    nombreProfesor: "",
  });

  // Validar campos
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
    if (!foto && !editando) {
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

  // Cargar cursos y profesores
  useEffect(() => {
    cargarCursos(); // ✅ Usar función para cargar cursos
    axios
      .get("http://localhost:8080/profesor")
      .then((res) =>
        setProfesores(
          res.data.map((prof: any) => ({
            id: prof.idProfesor,
            name: prof.name,
          }))
        )
      )
      .catch((err) => console.error("Error al obtener profesores:", err));
  }, []);

  // Cargar cursos desde la API
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

  const eliminarCurso = (id: number) => {
    axios
      .delete(`http://localhost:8080/api/cursos/${id}`)
      .then(() => {
        setCursos(cursos.filter((curso) => curso.idCurso !== id));
      })
      .catch((err) => console.error("Error al eliminar curso:", err));
  };

  const editarCurso = (curso: Curso) => {
    setEditando(true);
    setCursoId(curso.idCurso);
    setNombre(curso.nombre);
    setDescripcion(curso.descripcion);
    setFoto(null);
    setNombreProfesor(curso.idProfesor);
  };

  const actualizarCurso = () => {
    if (!cursoId) return;
    if (!validarCampos()) return;

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

  const resetForm = () => {
    setEditando(false);
    setCursoId(null);
    setNombre("");
    setDescripcion("");
    setFoto(null);
    setNombreProfesor(null);
    setErrores({
      nombre: "",
      descripcion: "",
      foto: "",
      nombreProfesor: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/stacked-books-wooden-desk-front-view-education-concept_93675-90873.jpg')",
      }}
    >
      <div className="container bg-white bg-opacity-75 p-4 rounded-4 shadow">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          📚 Gestión de Cursos 📚
        </h2>
        {/* Crear nuevo curso */}
        <div className="card shadow-lg mb-4">
          <div className="card-header bg-success text-white">
            <h3>{editando ? "✏️ Editar Curso" : "➕ Nuevo Curso"}</h3>
          </div>

          <div className="row g-3 p-4">
            <div className="col-12 col-md-6">
              <label>Nombre del Curso</label>
              <input
                type="text"
                className={`form-control rounded-3 shadow-sm ${
                  errores.nombre ? "border border-red-500" : ""
                }`}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errores.nombre && (
                <p className="text-red-600 text-sm mt-1">{errores.nombre}</p>
              )}
            </div>
            <div className="col-12 col-md-6">
              <label>Descripción</label>
              <input
                type="text"
                className={`form-control rounded-3 shadow-sm ${
                  errores.descripcion ? "border border-red-500" : ""
                }`}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {errores.descripcion && (
                <p className="text-red-600 text-sm mt-1">
                  {errores.descripcion}
                </p>
              )}
            </div>
            <div className="col-12 col-md-6">
              <label>Foto</label>
              <input
                type="file"
                className={`form-control rounded-3 shadow-sm ${
                  errores.foto ? "border border-red-500" : ""
                }`}
                onChange={(e) =>
                  setFoto(e.target.files ? e.target.files[0] : null)
                }
              />
              {errores.foto && (
                <p className="text-red-600 text-sm mt-1">{errores.foto}</p>
              )}
            </div>
            <div className="col-12 col-md-6">
              <label>Profesor</label>
              <select
                className={`form-control rounded-3 shadow-sm ${
                  errores.nombreProfesor ? "border border-red-500" : ""
                }`}
                value={nombreProfesor ?? ""}
                onChange={(e) =>
                  setNombreProfesor(Number(e.target.value) || null)
                }
              >
                <option value="">Selecciona un profesor</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>
                    {profesor.name}
                  </option>
                ))}
              </select>
              {errores.nombreProfesor && (
                <p className="text-red-600 text-sm mt-1">
                  {errores.nombreProfesor}
                </p>
              )}
            </div>
            {editando ? (
              <div className="col-12 d-grid">
                <button
                  className="btn btn-success mt-2 fw-bold fs-5"
                  onClick={actualizarCurso}
                >
                  💾 Guardar
                </button>
              </div>
            ) : (
              <div className="col-12 d-grid">
                <button
                  className="btn btn-success mt-2 fw-bold fs-5"
                  onClick={crearCurso}
                >
                  📚 Curso
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Lista de cursos */}
        <h3 className="mb-4 text-primary">Listado de Cursos</h3>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {cursos.map((curso) => (
            <div className="col" key={curso.idCurso}>
              <div className="card h-100 shadow-sm border-0">
                {/* Imagen del curso */}
                {curso.foto && (
                  <img
                    src={`http://localhost:8080/${curso.foto}`}
                    alt={curso.nombre}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                )}

                {/* Contenido */}
                <div className="card-body bg-light">
                  <h5 className="card-title text-info fw-bold">
                    {curso.nombre}
                  </h5>
                  <p className="card-text text-secondary">
                    {curso.descripcion}
                  </p>

                  <p className="mb-2">
                    <span className="badge bg-success text-light">
                      Profesor: {curso.nombreProfesor}
                    </span>
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => editarCurso(curso)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminarCurso(curso.idCurso)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CursoProfesor;
