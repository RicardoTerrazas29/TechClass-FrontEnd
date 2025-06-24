import { useMisLogros } from "@/hooks/useMisLogros";

function MisLogros() {
    const idEstudiante = Number(localStorage.getItem("idEstudiante"));
     const { logros, loading } = useMisLogros(idEstudiante);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 flex items-center gap-2">
          <span>🏅</span> Mis Logros
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="animate-spin text-blue-500 text-2xl">⏳</span>
          </div>
        ) : logros.length === 0 ? (
          <div className="alert alert-info text-center rounded-xl">
            ¡Aún no tienes logros! Completa módulos para conseguirlos.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {logros.map((logro) => (
              <div
                key={logro.idLogro}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-2 border border-blue-100 hover:shadow-xl transition"
              >
                <img
                  src={`http://localhost:8080/${logro.icono}`}
                  alt={logro.titulo}
                  className="w-20 h-20 object-contain rounded-full border-2 border-blue-200 mb-2"
                />
                <h3 className="font-bold text-lg text-blue-700 text-center">{logro.titulo}</h3>
                <div className="text-sm text-gray-600 text-center">
                  <div>
                    <span className="font-semibold">Curso:</span> {logro.curso.nombre}
                  </div>
                  <div>
                    <span className="font-semibold">Contenido:</span> {logro.contenido.titulo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MisLogros