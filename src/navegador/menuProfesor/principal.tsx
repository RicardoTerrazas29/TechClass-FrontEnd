const PrincipalPro = () => {
  const nombreUsuario = localStorage.getItem('name') || 'Profesor';

  return (
    <div style={containerStyle}>
      {/* Título de bienvenida */}
      <h1 className="display-4 text-dark mb-3">Bienvenido Profesor, {nombreUsuario}!</h1>

      {/* Mensaje de bienvenida */}
      <p className="lead text-muted mb-4">
        Gracias por ser parte esencial de TechClass. Tu compromiso es clave para el éxito de nuestros estudiantes.
      </p>

      {/* Mensaje informativo y de apoyo */}
      <p className="text-muted">
        Aquí encontrarás todas las herramientas necesarias para guiar a tus estudiantes hacia su éxito académico. 
        <br />
        ¡Tu labor es fundamental para moldear el futuro de nuestros estudiantes!
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

export default PrincipalPro;
