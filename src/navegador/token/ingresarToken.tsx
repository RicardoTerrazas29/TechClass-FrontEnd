// src/navegador/token/ingresarToken.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IngresarToken = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('token', token);
    navigate('/cambiar-clave');
  };

  return (
    <div className="container mt-5">
      <h4>Ingresa el Token</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Token recibido por correo" value={token} onChange={e => setToken(e.target.value)} required />
        <button className="btn btn-primary w-100" type="submit">Validar token</button>
      </form>
    </div>
  );
};

export default IngresarToken;
