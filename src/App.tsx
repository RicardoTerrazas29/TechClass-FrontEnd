import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './navegador/Login';
import MenuAdmin from './navegador/menuAdmin';
import MenuProfesor from './navegador/menuProfesor';
import MenuEstudiante from './navegador/menuEstudiante';
// importar el menuAdmin
import PrincipalAdm from './navegador/menuAdmin/principal';
import AdministradorPage from './navegador/menuAdmin/administrador';
import ProfesoresAdm from './navegador/menuAdmin/profesores';
import EstudiantesAdm from './navegador/menuAdmin/estudiantes';
//importar el menuProfesor
import PrincipalPro from './navegador/menuProfesor/principal';
//importar el menuEstudiante
import PrincipalEst from './navegador/menuEstudiante/principal';
//importar el token
import ClaveOlvidada from './navegador/token/claveOlvidada';
import IngresarToken from './navegador/token/ingresarToken';
import CambiarClave from './navegador/token/cambiarClave';


import { Navigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/*  aqui pones diferentes principales para que no haya confucion con otros principales, por eso se le crea otra clase como principalPro, principalAdm y Est*/}

        {/* Token */}
        <Route path="/clave-olvidada" element={<ClaveOlvidada />} />
        <Route path="/ingresar-token" element={<IngresarToken />} />
        <Route path="/cambiar-clave" element={<CambiarClave />} />

        {/* Menu Administrador */}
        <Route path="/admin" element={<MenuAdmin />}>
          <Route index element={<Navigate to="principal" replace />} /> {/* al momento de iniciar sesion redirige automaticamente a principal.tsx */}
          <Route path="principal" element={<PrincipalAdm />} />
          <Route path="administrador" element={<AdministradorPage />} />
          <Route path="profesores" element={<ProfesoresAdm />} />
          <Route path="estudiantes" element={<EstudiantesAdm />} />
        </Route>

        {/* Menu Profesor */}
        <Route path="/profesor" element={<MenuProfesor />}>
        <Route index element={<Navigate to="principal" replace />} /> {/* al momento de iniciar sesion redirige automaticamente a principal.tsx, */}
        <Route path="principal" element={<PrincipalPro />} />
        </Route>

        {/* Menu Estudiante */}
        <Route path="/estudiante" element={<MenuEstudiante />}>
        <Route index element={<Navigate to="principal" replace />} /> {/* al momento de iniciar sesion redirige automaticamente a principal.tsx */}
        <Route path="principal" element={<PrincipalEst />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
