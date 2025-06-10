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
    <div className="relative p-4 sm:p-2 md:p-4 pt-24 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen overflow-hidden">

      {/* Fondo decorativo animado con luces difusas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse top-[-60px] left-[-60px]"></div>
        <div className="absolute w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 bg-pink-400 opacity-30 rounded-full blur-2xl animate-pulse bottom-[80px] right-[-40px]"></div>
        <div className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-purple-300 opacity-20 rounded-full blur-2xl animate-ping top-[50%] left-[60%]"></div>
      </div>

      {/* Gif decorativo Mario siempre visible */}
      <img
        src="/imagenes/Mario.gif"
        alt="Mario decorativo"
        className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 w-24 sm:w-32 md:w-44 h-auto z-50 pointer-events-none"
      />

      {/* Contenido principal */}
      <div className="relative z-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span>📚</span> Asignaciones de Cursos
        </h1>

        <div className="mb-8 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl border border-blue-200 flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
          {/* Ilustración decorativa */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/201/201614.png"
            alt="Estudiante feliz"
            className="w-16 h-16 sm:w-24 sm:h-24"
          />

          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg sm:text-xl font-semibold text-blue-700">➕ Nueva asignación</h2>
            <div className="flex flex-col md:flex-row items-center gap-2 sm:gap-4">
              <select
                className="border border-blue-300 bg-white/70 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner w-full md:w-auto"
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
                className="border border-blue-300 bg-white/70 backdrop-blur-md rounded-lg px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner w-full md:w-auto"
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
                className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 text-white font-bold px-4 sm:px-6 py-2 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
                onClick={crearAsignacion}
              >
                🌟 Asignar
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-300 backdrop-blur-sm bg-white/80">
          <table className="min-w-full text-gray-800 text-sm sm:text-base">
            <thead className="bg-blue-200/60 text-blue-900">
              <tr>
                <th className="text-left px-2 sm:px-6 py-3 border-b">ID</th>
                <th className="text-left px-2 sm:px-6 py-3 border-b">Curso</th>
                <th className="text-left px-2 sm:px-6 py-3 border-b">Estudiante</th>
                <th className="text-left px-2 sm:px-6 py-3 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((asignacion, idx) => (
                <tr
                  key={asignacion.idAsignacion}
                  className={`${idx % 2 === 0 ? "bg-white/70" : "bg-gray-100/50"} hover:bg-blue-50 transition`}
                >
                  <td className="px-2 sm:px-6 py-3 border-b">{asignacion.idAsignacion}</td>
                  <td className="px-2 sm:px-6 py-3 border-b">{asignacion.curso.nombre}</td>
                  <td className="px-2 sm:px-6 py-3 border-b">{asignacion.estudiante.name}</td>
                  <td className="px-2 sm:px-6 py-3 border-b">
                    <button
                      onClick={() => eliminarAsignacion(asignacion.idAsignacion)}
                      className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:shadow-rose-400/50 transition duration-300 hover:scale-105 w-full md:w-auto"
                    >
                      ❌ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {asignaciones.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-6">
                    No hay asignaciones registradas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}