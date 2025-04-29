import React from 'react';

const PrincipalPro = () => {
  const nombreUsuario = localStorage.getItem('name') || 'Usuario';

  return (
    <div style={containerStyle}>
      <h1>Bienvenido Profesor, {nombreUsuario}!</h1>
      <p>Estamos felices de tenerte aquí en TechClass.</p>
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
