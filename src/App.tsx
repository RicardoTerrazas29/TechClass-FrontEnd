import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./navegador/Login";
import MenuPrincipal from "./navegador/MenuPrincipal";
import ProtectedRoute from "./navegador/ProtectedRoute";
// importar el menuAdmin
import PrincipalAdm from "./navegador/menuAdmin/principal";
import AdministradorPage from "./navegador/menuAdmin/administrador";
import ProfesoresAdm from "./navegador/menuAdmin/profesores";
import EstudiantesAdm from "./navegador/menuAdmin/estudiantes";

//importar el menuProfesor
import PrincipalPro from "./navegador/menuProfesor/principal";
import CursoProfesor from "./navegador/menuProfesor/cursoProfesor";
import EstudiantesPro from "./navegador/menuProfesor/estudiantesPro";
import PerfilProfesor from "./navegador/menuProfesor/perfilPro";
import GraficoEstudiantes from "./navegador/menuProfesor/grafico";

//importar el menuEstudiante
import PrincipalEst from "./navegador/menuEstudiante/principal";
import PerfilEstudiante from "./navegador/menuEstudiante/perfilEstu";

//importar el token
import ClaveOlvidada from "./navegador/token/claveOlvidada";
import IngresarToken from "./navegador/token/ingresarToken";
import CambiarClave from "./navegador/token/cambiarClave";

import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/*  aqui pones diferentes principales para que no haya confucion con otros principales, por eso se le crea otra clase como principalPro, principalAdm y Est, etc*/}

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
          <Route path="/profesor" element={<MenuPrincipal />}>
            <Route index element={<Navigate to="principal" replace />} />
            <Route path="principal" element={<PrincipalPro />} />
            <Route path="estudiantes" element={<EstudiantesPro />} />
            <Route path="cursos" element={<CursoProfesor />} />
            <Route path="perfil" element={<PerfilProfesor />} />
            <Route path="grafico" element={<GraficoEstudiantes />} />
          </Route>
        </Route>

        {/* Menu Estudiante */}
        <Route element={<ProtectedRoute allowedRoles={["ESTUDIANTE"]} />}>
          <Route path="/estudiante" element={<MenuPrincipal />}>
            <Route index element={<Navigate to="principal" replace />} />
            <Route path="principal" element={<PrincipalEst />} />
            <Route path="perfil" element={<PerfilEstudiante />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
