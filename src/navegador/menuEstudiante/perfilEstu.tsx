import { useState, useEffect } from "react";

const PerfilEstudiante = () => {
  const [estudiante, setEstudiante] = useState({
    idEstudiante: "",
    name: "",
    dni: "",
    genero: "",
    address: "",
    mail: "",
    clave: "",
  });

  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const idEstudiante = localStorage.getItem("idEstudiante");
    if (!idEstudiante) {
      alert("No se ha encontrado el usuario.");
      return;
    }

    fetch(`http://localhost:8080/estudiante/${idEstudiante}`)
      .then((res) => res.json())
      .then((data) => setEstudiante(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedEstudiante = { ...estudiante };
    if (newPassword) updatedEstudiante.clave = newPassword;

    const res = await fetch(
      `http://localhost:8080/estudiante/${estudiante.idEstudiante}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEstudiante),
      }
    );

    if (res.ok) {
      alert("✅ Perfil actualizado correctamente");
      setNewPassword("");
    } else {
      alert("❌ Error al actualizar el perfil");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEstudiante((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/background-text-with-vector-illustrationschool-supplies-education-students_505564-3432.jpg')",
      }}
    >
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl border-2 border-[#70A1FF]">
          <h2 className="text-3xl text-center font-bold text-[#2F3542] mb-8">
            📚 Perfil del Estudiante
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block font-medium text-[#2F3542] mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={estudiante.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED6DF]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2F3542] mb-1">
                DNI
              </label>
              <input
                type="text"
                name="dni"
                value={estudiante.dni}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED6DF]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2F3542] mb-1">
                Género
              </label>
              <input
                type="text"
                name="genero"
                value={estudiante.genero}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED6DF]"
              />
            </div>

            <div>
              <label className="block font-medium text-[#2F3542] mb-1">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={estudiante.address}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED6DF]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-[#2F3542] mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="mail"
                value={estudiante.mail}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED6DF]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium text-[#2F3542] mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Obligatorio cambiar clave"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B81]"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-[#FF6B81] hover:bg-[#ff4757] text-white font-semibold py-3 rounded-lg w-full transition duration-300"
              >
                💾 Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PerfilEstudiante;
