import React, { useEffect, useState } from "react";
import axios from "axios";

type Curso = {
  idCurso: number;
  nombre: string;
  descripcion: string;
  foto: string;
  nombreProfesor: string;
  idProfesor: number;
};

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

  // ✅ Extrae la lógica en una función
  const cargarCursos = () => {
    axios
      .get("http://localhost:8080/api/cursos")
      .then((res) => setCursos(res.data))
      .catch((err) => console.error("Error al obtener cursos:", err));
  };

  const crearCurso = () => {
    if (!nombreProfesor) {
      alert("Por favor selecciona un profesor");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (foto) formData.append("foto", foto);
    formData.append("idProfesor", String(nombreProfesor));

    axios
      .post("http://localhost:8080/api/cursos", formData)
      .then(() => {
        cargarCursos(); // ✅ Refresca desde el backend
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
    if (!cursoId || !nombreProfesor) {
      alert("Faltan datos para actualizar");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (foto) formData.append("foto", foto);
    formData.append("idProfesor", String(nombreProfesor));

    axios
      .put(`http://localhost:8080/api/cursos/${cursoId}`, formData)
      .then(() => {
        cargarCursos(); // ✅ Refresca desde el backend
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
  };

  return (
    <div className="container mt-4">
      <h2>Cursos y Profesores</h2>
      <div className="card p-4 mb-4">
        <h3>{editando ? "Editar Curso" : "Nuevo Curso"}</h3>
        <form>
          <div className="form-group mb-3">
            <label>Nombre del Curso</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Descripción</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Foto</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setFoto(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <div className="form-group mb-3">
            <label>Profesor</label>
            <select
              className="form-control"
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
          </div>
          {editando ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={actualizarCurso}
            >
              Actualizar Curso
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={crearCurso}
            >
              Crear Curso
            </button>
          )}
        </form>
      </div>

      <h3>Lista de Cursos</h3>
      <div className="list-group">
        {cursos.map((curso) => (
          <div className="list-group-item" key={curso.idCurso}>
            <h5>{curso.nombre}</h5>
            <p>{curso.descripcion}</p>
            {curso.foto && (
              <img
                src={`http://localhost:8080/${curso.foto}`}
                alt={curso.nombre}
                width={100}
              />
            )}
            <p>
              <strong>Profesor:</strong> {curso.nombreProfesor}
            </p>
            <button
              className="btn btn-warning me-2"
              onClick={() => editarCurso(curso)}
            >
              Editar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => eliminarCurso(curso.idCurso)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursoProfesor;
