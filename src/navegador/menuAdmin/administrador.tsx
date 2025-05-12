import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./AdministradorPage.css"; // Archivo CSS separado (crea uno)

interface Administrador {
  idAdministrador: number;
  name: string;
  mail: string;
  clave: string;
}

const AdministradorPage: React.FC = () => {
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [nuevoAdmin, setNuevoAdmin] = useState<
    Omit<Administrador, "idAdministrador">
  >({ name: "", mail: "", clave: "" });
  const [editando, setEditando] = useState<Administrador | null>(null);

  const fetchAdministradores = async () => {
    const response = await axios.get<Administrador[]>(
      "http://localhost:8080/administrador"
    );
    setAdministradores(response.data);
  };

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const esNombreValido = (nombre: string) =>
    /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(nombre);
  const esCorreoValido = (correo: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const esClaveValida = (clave: string) =>
    /^[\w!@#$%^&*()\-_=+[\]{};:'",.<>/?\\|`~]+$/.test(clave);

  const handleCrear = async () => {
    if (
      !esNombreValido(nuevoAdmin.name) ||
      !esCorreoValido(nuevoAdmin.mail) ||
      !esClaveValida(nuevoAdmin.clave)
    ) {
      alert(
        "Por favor, revisa los campos. El nombre solo debe tener letras, el correo debe ser válido y la clave debe tener caracteres permitidos."
      );
      return;
    }

    try {
      await axios.post("http://localhost:8080/administrador", [nuevoAdmin]);
      setNuevoAdmin({ name: "", mail: "", clave: "" });
      fetchAdministradores();
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      if (
        !esNombreValido(editando.name) ||
        !esCorreoValido(editando.mail) ||
        !esClaveValida(editando.clave)
      ) {
        alert("Por favor, revisa los campos editados.");
        return;
      }

      try {
        await axios.put(
          `http://localhost:8080/administrador/${editando.idAdministrador}`,
          editando
        );
        setEditando(null);
        fetchAdministradores();
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/administrador/${id}`);
      fetchAdministradores();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/flat-lay-workspace-with-laptop_23-2148219339.jpg')",
      }}
    >
      <div className="container bg-white bg-opacity-75 p-4 rounded-4 shadow">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          👩‍💼 Administradores 👨‍💼
        </h2>

        <div className="card shadow-lg mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">➕ Agregar Nuevo Administrador</h5>
          </div>
          <div className="card-body bg-light rounded">
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="👦 Nombre"
                  value={nuevoAdmin.name}
                  onChange={(e) =>
                    setNuevoAdmin({ ...nuevoAdmin, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="email"
                  className="form-control"
                  placeholder="📧 Correo"
                  value={nuevoAdmin.mail}
                  onChange={(e) =>
                    setNuevoAdmin({ ...nuevoAdmin, mail: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="🔑 Clave"
                  value={nuevoAdmin.clave}
                  onChange={(e) =>
                    setNuevoAdmin({ ...nuevoAdmin, clave: e.target.value })
                  }
                />
              </div>
              <div className="col-12 d-grid">
                <button
                  className="btn btn-success mt-2 fw-bold fs-5"
                  onClick={handleCrear}
                >
                  🚀 Crear Administrador
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive rounded">
          <table className="table table-bordered table-striped table-hover bg-white rounded shadow-sm">
            <thead className="table-success text-center">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Clave</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {administradores.map((admin) => (
                <tr
                  key={admin.idAdministrador}
                  className="text-center align-middle"
                >
                  <td>{admin.idAdministrador}</td>

                  <td>
                    {editando?.idAdministrador === admin.idAdministrador ? (
                      <input
                        className="form-control"
                        value={editando.name}
                        onChange={(e) =>
                          setEditando({ ...editando, name: e.target.value })
                        }
                      />
                    ) : (
                      admin.name
                    )}
                  </td>

                  <td>
                    {editando?.idAdministrador === admin.idAdministrador ? (
                      <input
                        className="form-control"
                        value={editando.mail}
                        onChange={(e) =>
                          setEditando({ ...editando, mail: e.target.value })
                        }
                      />
                    ) : (
                      admin.mail
                    )}
                  </td>

                  <td>
                    {editando?.idAdministrador === admin.idAdministrador ? (
                      <>
                        <input
                          type="password"
                          className="form-control"
                          value={editando.clave}
                          onChange={(e) =>
                            setEditando({ ...editando, clave: e.target.value })
                          }
                        />
                        <small className="text-danger">
                          ⚠️ Actualice también la clave
                        </small>
                      </>
                    ) : (
                      "********"
                    )}
                  </td>

                  <td>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      {editando?.idAdministrador === admin.idAdministrador ? (
                        <>
                          <div className="d-grid w-100">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={handleActualizar}
                            >
                              💾 Guardar
                            </button>
                          </div>
                          <div className="d-grid w-100">
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditando(null)}
                            >
                              ❌ Cancelar
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-grid w-100">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => setEditando(admin)}
                            >
                              ✏️ Editar
                            </button>
                          </div>
                          <div className="d-grid w-100">
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleEliminar(admin.idAdministrador)
                              }
                            >
                              🗑️ Eliminar
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdministradorPage;
