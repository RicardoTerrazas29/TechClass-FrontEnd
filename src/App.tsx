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
import MisLogros from "./navegador/menuEstudiante/misLogros";
import RecursoContenido from "./navegador/menuEstudiante/RecursoContenido";

// Token
import ClaveOlvidada from "./navegador/token/claveOlvidada";
import IngresarToken from "./navegador/token/ingresarToken";
import CambiarClave from "./navegador/token/cambiarClave";
import Logros from "./navegador/menuProfesor/logros";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Token */}
        <Route path="/clave-olvidada" element={<ClaveOlvidada />} />
        <Route path="/ingresar-token" element={<IngresarToken />} />
        <Route path="/cambiar-clave" element={<CambiarClave />} />

        {/* Menu Administrador */}
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
          {/* Ruta base para el profesor que carga MenuPrincipal */}
          <Route path="/profesor" element={<MenuPrincipal />}>
            <Route index element={<Navigate to="principal" replace />} />
            <Route path="principal" element={<PrincipalPro />} />
            <Route path="estudiantes" element={<EstudiantesPro />} />
            <Route path="cursos" element={<CursoProfesor />} />
            {/* Aquí es donde necesitamos definir la ruta de contenidos de manera específica
                para que no choque con la ruta "cursos" principal.
                Lo más seguro es que "cursos/:idCurso/contenidos" sea una ruta de *tipo absoluto*
                si está en el mismo nivel de <Route path="cursos" ... />.
                Pero como está dentro de "/profesor", debería funcionar.
                El problema puede ser que la ruta "cursos" sin más, sin un outlet, no está diseñada para
                tener rutas anidadas.
                
                Vamos a probar a poner la ruta de contenidos FUERA de la ruta "cursos", pero DENTRO de la ruta "/profesor".
                El path ya es relativo a "/profesor", por lo tanto "cursos/:idCurso/contenidos" debería coincidir.
                
                La única razón por la que diría "No routes matched" es si hay un problema con el orden o el
                manejo del Outlet en MenuPrincipal.
            */}
            <Route path="perfil" element={<PerfilProfesor />} />
            <Route path="monitor" element={<GraficoEstudiantes />} />
            <Route path="asignaciones" element={<AsignacionCursoPage />} />
            {/* **Mantener la ruta de contenidos aquí, ya que el navigate la apunta como relativa a /profesor** */}
            <Route path="cursos/:idCurso/contenidos" element={<ContenidosCurso />} />
            <Route path="logros" element={<Logros/>}/>
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
            <Route path="cursos/:id/recurso/:idRecurso" element={<RecursoContenido />} />
            <Route path="logros" element={<MisLogros/>}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

