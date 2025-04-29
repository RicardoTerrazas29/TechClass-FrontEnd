// src/navegador/token/claveOlvidada.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClaveOlvidada = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/auth/recuperar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (res.ok) {
      alert("Correo enviado. Revisa tu bandeja de entrada.");
      navigate('/ingresar-token');
    } else {
      alert("Error enviando correo.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Recuperar Contraseña</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="email" placeholder="Correo registrado" value={email} onChange={e => setEmail(e.target.value)} required />
        <button className="btn btn-primary w-100" type="submit">Enviar correo de recuperación</button>
      </form>
    </div>
  );
};

export default ClaveOlvidada;
