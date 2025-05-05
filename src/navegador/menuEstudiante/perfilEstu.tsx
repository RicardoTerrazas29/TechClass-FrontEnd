import { useState, useEffect } from 'react';

const PerfilEstudiante = () => {
  const [estudiante, setEstudiante] = useState({
    idEstudiante: '',
    name: '',
    dni: '',
    genero: '',
    address: '',
    mail: '',
    clave: '',
  });

  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const idEstudiante = localStorage.getItem("idEstudiante");
    if (!idEstudiante) {
      alert("No se ha encontrado el usuario.");
      return;
    }

    fetch(`http://localhost:8080/estudiante/${idEstudiante}`)
      .then(res => res.json())
      .then(data => setEstudiante(data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEstudiante = { ...estudiante };
    if (newPassword) updatedEstudiante.clave = newPassword;

    const res = await fetch(`http://localhost:8080/estudiante/${estudiante.idEstudiante}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEstudiante),
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
    setEstudiante(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px", borderRadius: "1rem" }}>
        <h3 className="text-center mb-4">📚 Perfil del Estudiante</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={estudiante.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">DNI</label>
            <input
              className="form-control"
              type="text"
              name="dni"
              value={estudiante.dni}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Género</label>
            <input
              className="form-control"
              type="text"
              name="genero"
              value={estudiante.genero}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              className="form-control"
              type="text"
              name="address"
              value={estudiante.address}
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
              value={estudiante.mail}
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

export default PerfilEstudiante;
