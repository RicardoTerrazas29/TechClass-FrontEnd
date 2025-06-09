import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate

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
  const [editandoCurso, setEditandoCurso] = useState<boolean>(false);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    foto: "",
    nombreProfesor: "",
  });

  const navigate = useNavigate(); // ✅ Hook para navegación

  useEffect(() => {
    cargarCursos();
    axios
      .get("http://localhost:8080/profesor")
      .then((res) =>
        setProfesores(
          res.data.map((prof: any) => ({ id: prof.idProfesor, name: prof.name }))
        )
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

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">📚 Gestión de Cursos 📚</h2>

      {/* Crear/editar curso */}
      {/* ...Formulario omitido por brevedad... */}

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

                {/* ✅ Botón corregido para redirigir al componente ContenidosCurso */}
                <button
                  className="btn btn-primary btn-sm rounded-pill px-3 d-flex align-items-center gap-2 shadow-sm"
                  onClick={() =>
                    navigate(`/profesor/cursos/${curso.idCurso}/contenidos`)
                  }
                >
                  <i className="bi bi-journal-text"></i>
                  Ver Contenidos
                </button>

                <button
                  className="btn btn-warning btn-sm me-2 mt-2"
                  onClick={() => editarCurso(curso)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => eliminarCurso(curso.idCurso)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursoProfesor;



