import { useState, useEffect } from 'react';

const PerfilProfesor = () => {
  const [profesor, setProfesor] = useState({
    idProfesor: '',
    name: '',
    phone: '',
    mail: '',
    clave: '',
  });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const idProfesor = localStorage.getItem("idProfesor");
    if (!idProfesor) {
      alert("No se ha encontrado el usuario.");
      return;
    }

    fetch(`http://localhost:8080/profesor/${idProfesor}`)
      .then(res => res.json())
      .then(data => setProfesor(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfesor = { ...profesor };
    if (newPassword) updatedProfesor.clave = newPassword;

    const res = await fetch(`http://localhost:8080/profesor/${profesor.idProfesor}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfesor),
    });

    if (res.ok) {
      alert('✅ Perfil actualizado correctamente');
      setNewPassword('');
    } else {
      alert('❌ Error al actualizar el perfil');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfesor(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4">👨‍🏫 Perfil del Profesor</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={profesor.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              className="form-control"
              type="text"
              name="phone"
              value={profesor.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              className="form-control"
              type="email"
              name="mail"
              value={profesor.mail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nueva contraseña</label>
            <input
              className="form-control"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Obligatorio cambiar clave"
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            💾 Guardar cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default PerfilProfesor;
