import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Providers/UserProvider"; // Asegúrate de tener el import correcto

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setRole } = useUser(); // 👈 obtenemos el setRole del contexto

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") navigate("/admin");
    else if (role === "PROFESOR") navigate("/profesor");
    else if (role === "ESTUDIANTE") navigate("/estudiante");
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);

      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);

      if (data.idProfesor) {
        localStorage.setItem("idProfesor", data.idProfesor);
      }

      if (data.idEstudiante) {
        localStorage.setItem("idEstudiante", data.idEstudiante);
      }

      setRole(data.role); // 👈 actualizamos el contexto con el nuevo rol

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
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary w-100" type="submit">
          Entrar
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/clave-olvidada">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};

export default Login;
