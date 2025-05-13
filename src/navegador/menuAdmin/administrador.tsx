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
  const [erroresNuevo, setErroresNuevo] = useState<{ [key: string]: string }>(
    {}
  );
  const [erroresEditar, setErroresEditar] = useState<{ [key: string]: string }>(
    {}
  );
  const fetchAdministradores = async () => {
    const response = await axios.get<Administrador[]>(
      "http://localhost:8080/administrador"
    );
    setAdministradores(response.data);
  };

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const handleCrear = async () => {
    const errores = validarCampos(nuevoAdmin);
    if (Object.keys(errores).length > 0) {
      setErroresNuevo(errores);
      return;
    }

    try {
      await axios.post("http://localhost:8080/administrador", [nuevoAdmin]);
      setNuevoAdmin({ name: "", mail: "", clave: "" });
      setErroresNuevo({});
      fetchAdministradores();
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      const { idAdministrador, ...datosEditar } = editando;
      const errores = validarCampos(datosEditar);
      if (Object.keys(errores).length > 0) {
        setErroresEditar(errores);
        return;
      }

      try {
        await axios.put(
          `http://localhost:8080/administrador/${editando.idAdministrador}`,
          editando
        );
        setEditando(null);
        setErroresEditar({});
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

  const validarCampos = (
    administrador: Omit<Administrador, "idAdministrador">
  ) => {
    const errores: { [key: string]: string } = {};

    if (!/^[a-zA-Z\s]+$/.test(administrador.name)) {
      errores.name = "El nombre solo debe contener letras y espacios.";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(administrador.mail)) {
      errores.mail = "El correo no es válido.";
    }

    if (!administrador.clave) {
      errores.clave = "La clave no puede estar vacía.";
    }

    return errores;
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
                {erroresNuevo.name && (
                  <div className="text-danger small ms-1">
                    {erroresNuevo.name}
                  </div>
                )}
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
                {erroresNuevo.mail && (
                  <div className="text-danger small ms-1">
                    {erroresNuevo.mail}
                  </div>
                )}
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
                {erroresNuevo.clave && (
                  <div className="text-danger small ms-1">
                    {erroresNuevo.clave}
                  </div>
                )}
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
        {/* Tabla de administradores */}
        <div className="table-responsive d-none d-md-block rounded">
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
                    {erroresEditar.name &&
                      editando?.idAdministrador === admin.idAdministrador && (
                        <div className="text-danger small">
                          {erroresEditar.name}
                        </div>
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
                    {erroresEditar.mail &&
                      editando?.idAdministrador === admin.idAdministrador && (
                        <div className="text-danger small">
                          {erroresEditar.mail}
                        </div>
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
                    {erroresEditar.clave &&
                      editando?.idAdministrador === admin.idAdministrador && (
                        <div className="text-danger small">
                          {erroresEditar.clave}
                        </div>
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
        {/* Vista tipo tarjeta para móviles */}
        <div className="d-md-none">
          {administradores.map((admin) => (
            <div key={admin.idAdministrador} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold">{admin.name}</h5>
                <p className="card-text mb-1">
                  <strong>ID:</strong> {admin.idAdministrador}
                </p>
                <p className="card-text mb-1">
                  <strong>Correo:</strong> {admin.mail}
                </p>
                <p className="card-text mb-3">
                  <strong>Clave:</strong> ••••••
                </p>
                <div className="d-flex gap-2 flex-column">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditando(admin)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(admin.idAdministrador)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdministradorPage;
