import { useEffect, useState } from "react";

interface Curso {
  idCurso: number;
  nombre: string;
}

interface Estudiante {
  idEstudiante: number;
  name: string;
}

interface AsignacionCurso {
  idAsignacion: number;
  curso: Curso;
  estudiante: Estudiante;
}

export default function AsignacionCursoPage() {
  const [asignaciones, setAsignaciones] = useState<AsignacionCurso[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [nuevoCursoId, setNuevoCursoId] = useState<number>(0);
  const [nuevoEstudianteId, setNuevoEstudianteId] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/asignaciones")
      .then((res) => res.json())
      .then(setAsignaciones)
      .catch((err) => console.error("Error al cargar asignaciones", err));

    fetch("http://localhost:8080/api/cursos")
      .then((res) => res.json())
      .then(setCursos);

    fetch("http://localhost:8080/estudiante")
      .then((res) => res.json())
      .then(setEstudiantes);
  }, []);

  const crearAsignacion = () => {
    if (!nuevoCursoId || !nuevoEstudianteId) {
      alert("Selecciona curso y estudiante");
      return;
    }

    fetch("http://localhost:8080/api/asignaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idCurso: nuevoCursoId,
        idEstudiante: nuevoEstudianteId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear asignación");
        return res.json();
      })
      .then((nueva) => {
        setAsignaciones([...asignaciones, nueva]);
        setNuevoCursoId(0);
        setNuevoEstudianteId(0);
      })
      .catch((err) => alert(err.message));
  };

  const eliminarAsignacion = (id: number) => {
    fetch(`http://localhost:8080/api/asignaciones/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo eliminar");
        setAsignaciones(asignaciones.filter((a) => a.idAsignacion !== id));
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Asignaciones de Cursos</h1>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Nueva asignación</h2>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <select
            className="border rounded p-2"
            value={nuevoCursoId}
            onChange={(e) => setNuevoCursoId(Number(e.target.value))}
          >
            <option value={0}>Seleccione curso</option>
            {cursos.map((curso) => (
              <option key={curso.idCurso} value={curso.idCurso}>
                {curso.nombre}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2"
            value={nuevoEstudianteId}
            onChange={(e) => setNuevoEstudianteId(Number(e.target.value))}
          >
            <option value={0}>Seleccione estudiante</option>
            {estudiantes.map((e) => (
              <option key={e.idEstudiante} value={e.idEstudiante}>
                {e.name}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={crearAsignacion}
          >
            ➕ Asignar
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Curso</th>
            <th className="border px-4 py-2">Estudiante</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion.idAsignacion}>
              <td className="border px-4 py-2">{asignacion.idAsignacion}</td>
              <td className="border px-4 py-2">{asignacion.curso.nombre}</td>
              <td className="border px-4 py-2">{asignacion.estudiante.name}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => eliminarAsignacion(asignacion.idAsignacion)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  ❌ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
