// src/navegador/Login.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") navigate("/admin");
    else if (role === "PROFESOR") navigate("/profesor");
    else if (role === "ESTUDIANTE") navigate("/estudiante");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      if (data.role === "ADMIN") navigate("/admin");
      else if (data.role === "PROFESOR") navigate("/profesor");
      else if (data.role === "ESTUDIANTE") navigate("/estudiante");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Iniciar Sesión</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-2" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>

      {/* Link para recuperar clave */}
      <div className="mt-3 text-center">
        <Link to="/clave-olvidada">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};

export default Login;
