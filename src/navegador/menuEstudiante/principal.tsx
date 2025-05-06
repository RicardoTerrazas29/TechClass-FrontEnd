const PrincipalEst = () => {
  const nombreUsuario = localStorage.getItem('name') || 'Usuario';

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light p-4">
      {/* Título de bienvenida */}
      <h1 className="display-4 text-dark mb-3">Bienvenido Estudiante, {nombreUsuario}!</h1>

      {/* Mensaje de bienvenida */}
      <p className="lead text-muted mb-4">
        Estamos felices de tenerte aquí en TechClass. Aprovecha todas las oportunidades de aprendizaje.
      </p>

      {/* Mensaje motivacional o informativo */}
      <p className="text-muted">
        Tu educación es nuestra prioridad. Aprovecha al máximo las herramientas y recursos que tenemos disponibles para tu formación.
        <br />
        ¡Estás en el camino correcto para alcanzar tus metas educativas!
      </p>
    </div>
  );
};

export default PrincipalEst;
