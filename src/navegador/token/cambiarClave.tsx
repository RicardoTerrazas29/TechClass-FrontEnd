// src/navegador/token/cambiarClave.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CambiarClave = () => {
  const [nuevaClave, setNuevaClave] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Token inválido. Vuelve a solicitar recuperación.");
      navigate('/clave-olvidada');
      return;
    }

    const res = await fetch('http://localhost:8080/auth/resetear-clave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, nuevaClave })
    });

    if (res.ok) {
      alert("Contraseña cambiada exitosamente. Ahora puedes iniciar sesión.");
      navigate('/');
    } else {
      alert("Error cambiando contraseña.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Cambiar Contraseña</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="password" placeholder="Nueva contraseña" value={nuevaClave} onChange={e => setNuevaClave(e.target.value)} required />
        <button className="btn btn-success w-100" type="submit">Actualizar contraseña</button>
      </form>
    </div>
  );
};

export default CambiarClave;
