import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./navegador/Login";
import MenuPrincipal from "./navegador/MenuPrincipal";
import ProtectedRoute from "./navegador/ProtectedRoute";

// Menu Admin
import PrincipalAdm from "./navegador/menuAdmin/principal";
import AdministradorPage from "./navegador/menuAdmin/administrador";
import ProfesoresAdm from "./navegador/menuAdmin/profesoresAdm";
import EstudiantesAdm from "./navegador/menuAdmin/estudiantesAdm";

// Menu Profesor
import PrincipalPro from "./navegador/menuProfesor/principal";
import CursoProfesor from "./navegador/menuProfesor/cursoProfesor";
import EstudiantesPro from "./navegador/menuProfesor/estudiantesPro";
import PerfilProfesor from "./navegador/menuProfesor/perfilPro";
import GraficoEstudiantes from "./navegador/menuProfesor/grafico";
import AsignacionCursoPage from "./navegador/menuProfesor/asignacion";
import ContenidosCurso from "./navegador/menuProfesor/ContenidosCurso";

// Menu Estudiante
import PrincipalEst from "./navegador/menuEstudiante/principal";
import PerfilEstudiante from "./navegador/menuEstudiante/perfilEstu";
import CursoEstudiante from "./navegador/menuEstudiante/cursoEstudiante";
import { CursoEstudianteContenido } from "./navegador/menuEstudiante/cursoEstudianteContenido";
import ConoceANuti from "./navegador/menuEstudiante/ConoceANuti";
import JuegoNuti from "./navegador/menuEstudiante/JuegoNuti"; // 🔴 Import CORRECTO

// Token
import ClaveOlvidada from "./navegador/token/claveOlvidada";
import IngresarToken from "./navegador/token/ingresarToken";
import CambiarClave from "./navegador/token/cambiarClave";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Token */}
        <Route path="/clave-olvidada" element={<ClaveOlvidada />} />
        <Route path="/ingresar-token" element={<IngresarToken />} />
        <Route path="/cambiar-clave" element={<CambiarClave />} />

        {/* Menu Admin */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<MenuPrincipal />}>
            <Route index element={<Navigate to="principal" replace />} />
            <Route path="principal" element={<PrincipalAdm />} />
            <Route path="administrador" element={<AdministradorPage />} />
            <Route path="profesores" element={<ProfesoresAdm />} />
            <Route path="estudiantes" element={<EstudiantesAdm />} />
          </Route>
        </Route>

        {/* Menu Profesor */}
        <Route element={<ProtectedRoute allowedRoles={["PROFESOR"]} />}>
          <Route path="/profesor" element={<MenuPrincipal />}>
            <Route index element={<Navigate to="principal" replace />} />
            <Route path="principal" element={<PrincipalPro />} />
            <Route path="estudiantes" element={<EstudiantesPro />} />
            <Route path="cursos" element={<CursoProfesor />} />
            <Route path="perfil" element={<PerfilProfesor />} />
            <Route path="monitor" element={<GraficoEstudiantes />} />
            <Route path="asignaciones" element={<AsignacionCursoPage />} />
            <Route path="cursos/:idCurso/contenidos" element={<ContenidosCurso />} />
          </Route>
        </Route>

        {/* Menu Estudiante */}
        <Route element={<ProtectedRoute allowedRoles={["ESTUDIANTE"]} />}>
          <Route path="/estudiante" element={<MenuPrincipal />}>
            <Route index element={<Navigate to="principal" replace />} />
            <Route path="principal" element={<PrincipalEst />} />
            <Route path="perfil" element={<PerfilEstudiante />} />
            <Route path="cursos" element={<CursoEstudiante />} />
            <Route path="cursos/:id" element={<CursoEstudianteContenido />} />
            <Route path="conoce-a-nuti" element={<ConoceANuti />} />
            <Route path="juego-nuti" element={<JuegoNuti />} /> {/* ✅ Esta línea */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;




