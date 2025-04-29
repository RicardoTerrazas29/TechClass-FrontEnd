import { Outlet, useNavigate } from 'react-router-dom';

const MenuBar = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div>
      {/* Barra superior */}
      <header style={headerStyle}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          TechClass
        </div>
        <button style={buttonStyle} onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </header>

      {/* Barra lateral */}
      <aside style={asideStyle}>
        <nav style={navStyle}>
          <button style={navButtonStyle} onClick={() => navigate('principal')}>
            Principal
          </button>
          <button style={navButtonStyle} onClick={() => navigate('administrador')}>
            Administrador
          </button>
          <button style={navButtonStyle} onClick={() => navigate('Profesores')}>
            Profesores
          </button>
          <button style={navButtonStyle} onClick={() => navigate('Estudiantes')}>
            Estudiantes
          </button>
        </nav>
      </aside>

      {/* Contenido de las páginas */}
      <main style={{ marginLeft: '250px', marginTop: '60px', padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  width: '100%',
  height: '60px',
  backgroundColor: '#343a40',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  color: 'white',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
};

const asideStyle: React.CSSProperties = {
  width: '250px',
  height: '100vh',
  backgroundColor: '#343a40',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  padding: '80px 20px 20px 20px',
  position: 'fixed',
  top: 0,
  left: 0,
  overflowY: 'auto',
  marginTop: '60px',
};

const navStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '100%',
};

const buttonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  textDecoration: 'none',
};

const navButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  textAlign: 'left',
  padding: '10px 0',
  width: '100%',
};

export default MenuBar;
