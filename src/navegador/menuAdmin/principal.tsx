const PrincipalAdm = () => {
  const nombreUsuario = localStorage.getItem('name') || 'Administrador';

  return (
    <div style={containerStyle}>
      {/* Título de bienvenida */}
      <h1 className="display-4 text-dark mb-3">Bienvenido Administrador, {nombreUsuario}!</h1>

      {/* Mensaje de bienvenida */}
      <p className="lead text-muted mb-4">
        Gracias por garantizar el funcionamiento y éxito de TechClass. Tu rol es clave en la gestión de la plataforma.
      </p>

      {/* Mensaje de apoyo y responsabilidad */}
      <p className="text-muted">
        Desde la supervisión de usuarios hasta la administración de recursos, tu trabajo asegura la mejor experiencia educativa para todos. 
        <br />
        ¡Gracias por mantener todo en orden y seguir optimizando el sistema!
      </p>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  textAlign: 'center',
};

export default PrincipalAdm;
