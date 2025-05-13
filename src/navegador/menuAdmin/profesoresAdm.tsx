import React, { useEffect, useState } from "react";
import axios from "axios";

interface Profesor {
  idProfesor: number;
  name: string;
  phone: string;
  mail: string;
  clave: string;
}

const ProfesoresAdm: React.FC = () => {
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [nuevoProfesor, setNuevoProfesor] = useState<
    Omit<Profesor, "idProfesor">
  >({
    name: "",
    phone: "",
    mail: "",
    clave: "",
  });
  const [editando, setEditando] = useState<Profesor | null>(null);
  const [erroresNuevo, setErroresNuevo] = useState<{ [key: string]: string }>(
    {}
  );
  const [erroresEditar, setErroresEditar] = useState<{ [key: string]: string }>(
    {}
  );
  // Cargar lista
  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    const response = await axios.get<Profesor[]>(
      "http://localhost:8080/profesor"
    );
    setProfesores(response.data);
  };

  const handleCrear = async () => {
    const errores = validarCampos(nuevoProfesor);
    if (Object.keys(errores).length > 0) {
      setErroresNuevo(errores);
      return;
    }
    try {
      await axios.post("http://localhost:8080/profesor", [nuevoProfesor]);
      setNuevoProfesor({ name: "", phone: "", mail: "", clave: "" });
      setErroresNuevo({});
      fetchProfesores();
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      const { idProfesor, ...datosEditar } = editando;
      const errores = validarCampos(datosEditar);
      if (Object.keys(errores).length > 0) {
        setErroresEditar(errores);
        return;
      }
      try {
        await axios.put(
          `http://localhost:8080/profesor/${editando.idProfesor}`,
          editando
        );
        setEditando(null);
        setErroresEditar({});
        fetchProfesores();
      } catch (error) {
        console.error("Error al actualizar:", error);
      }
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/profesor/${id}`);
      fetchProfesores();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const validarCampos = (profesor: Omit<Profesor, "idProfesor">) => {
    const errores: { [key: string]: string } = {};

    if (!/^[a-zA-Z\s]+$/.test(profesor.name)) {
      errores.name = "El nombre solo debe contener letras y espacios.";
    }

    if (!/^\d{9}$/.test(profesor.phone)) {
      errores.phone = "El telefono debe tener exactamente 9 dígitos numéricos.";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(profesor.mail)) {
      errores.mail = "El correo no es válido.";
    }

    if (!profesor.clave) {
      errores.clave = "La clave no puede estar vacía.";
    }

    return errores;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/blue-box-notebook-green-apple-pink-marker-colorful-sticky-notes_157927-214.jpg')",
      }}
    >
      <div className="container bg-white bg-opacity-75 p-4 rounded-4 shadow">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          👩‍💼 Gestión de Profesores 👨‍💼
        </h2>
        {/* Crear nuevo profesor */}
        <div className="card shadow-lg mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">➕ Agregar Nuevo Profesor</h5>
          </div>

          <div className="row g-3 p-4">
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                placeholder="👦 Nombre"
                value={nuevoProfesor.name}
                onChange={(e) =>
                  setNuevoProfesor({
                    ...nuevoProfesor,
                    name: e.target.value,
                  })
                }
              />
              {erroresNuevo.name && (
                <div className="text-danger small ms-1">
                  {erroresNuevo.name}
                </div>
              )}
            </div>
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                placeholder="🏠 Teléfono"
                value={nuevoProfesor.phone}
                onChange={(e) =>
                  setNuevoProfesor({
                    ...nuevoProfesor,
                    phone: e.target.value,
                  })
                }
              />
              {erroresNuevo.phone && (
                <div className="text-danger small ms-1">
                  {erroresNuevo.phone}
                </div>
              )}
            </div>
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                placeholder="📧 Correo"
                value={nuevoProfesor.mail}
                onChange={(e) =>
                  setNuevoProfesor({
                    ...nuevoProfesor,
                    mail: e.target.value,
                  })
                }
              />
              {erroresNuevo.mail && (
                <div className="text-danger small ms-1">
                  {erroresNuevo.mail}
                </div>
              )}
            </div>
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                type="password"
                placeholder="🔑 Clave"
                value={nuevoProfesor.clave}
                onChange={(e) =>
                  setNuevoProfesor({
                    ...nuevoProfesor,
                    clave: e.target.value,
                  })
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
                👨‍🏫 Crear Profesor
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de profesores */}
        <div className="table-responsive d-none d-md-block rounded">
          <table className="table table-striped table-bordered table-hover bg-white rounded shadow-sm">
            <thead className="table-success text-center">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Clave</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {profesores.map((profesor) => (
                <tr
                  key={profesor.idProfesor}
                  className="text-center align-middle"
                >
                  <td>{profesor.idProfesor}</td>

                  {/* Nombre */}
                  <td>
                    {editando?.idProfesor === profesor.idProfesor ? (
                      <input
                        className="form-control"
                        value={editando.name}
                        onChange={(e) =>
                          setEditando({ ...editando, name: e.target.value })
                        }
                      />
                    ) : (
                      profesor.name
                    )}
                    {erroresEditar.name &&
                      editando?.idProfesor === profesor.idProfesor && (
                        <div className="text-danger small">
                          {erroresEditar.name}
                        </div>
                      )}
                  </td>

                  {/* Teléfono */}
                  <td>
                    {editando?.idProfesor === profesor.idProfesor ? (
                      <input
                        className="form-control"
                        value={editando.phone}
                        onChange={(e) =>
                          setEditando({ ...editando, phone: e.target.value })
                        }
                      />
                    ) : (
                      profesor.phone
                    )}
                    {erroresEditar.phone &&
                      editando?.idProfesor === profesor.idProfesor && (
                        <div className="text-danger small">
                          {erroresEditar.phone}
                        </div>
                      )}
                  </td>

                  {/* Correo */}
                  <td>
                    {editando?.idProfesor === profesor.idProfesor ? (
                      <input
                        className="form-control"
                        value={editando.mail}
                        onChange={(e) =>
                          setEditando({ ...editando, mail: e.target.value })
                        }
                      />
                    ) : (
                      profesor.mail
                    )}
                    {erroresEditar.mail &&
                      editando?.idProfesor === profesor.idProfesor && (
                        <div className="text-danger small">
                          {erroresEditar.mail}
                        </div>
                      )}
                  </td>

                  {/* Clave */}
                  <td>
                    {editando?.idProfesor === profesor.idProfesor ? (
                      <>
                        <input
                          type="password"
                          className="form-control mb-1"
                          value={editando.clave}
                          onChange={(e) =>
                            setEditando({ ...editando, clave: e.target.value })
                          }
                        />
                        <small className="text-danger">
                          ⚠️ Importante: también actualice la contraseña
                        </small>
                      </>
                    ) : (
                      <span>********</span>
                    )}
                    {erroresEditar.clave &&
                      editando?.idProfesor === profesor.idProfesor && (
                        <div className="text-danger small">
                          {erroresEditar.clave}
                        </div>
                      )}
                  </td>

                  {/* Botones */}
                  <td>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      {editando?.idProfesor === profesor.idProfesor ? (
                        <>
                          <div className="d-grid w-100">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={handleActualizar}
                            >
                              💾 Guardar
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                setEditando(null);
                                setErroresEditar({});
                              }}
                            >
                              ❌ Cancelar
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="d-grid w-100 ">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => setEditando(profesor)}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleEliminar(profesor.idProfesor)
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
          {profesores.map((profesor) => (
            <div key={profesor.idProfesor} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold">{profesor.name}</h5>
                <p className="card-text mb-1">
                  <strong>ID:</strong> {profesor.idProfesor}
                </p>
                <p className="card-text mb-1">
                  <strong>DNI:</strong> {profesor.phone}
                </p>

                <p className="card-text mb-1">
                  <strong>Correo:</strong> {profesor.mail}
                </p>
                <p className="card-text mb-3">
                  <strong>Clave:</strong> ••••••
                </p>
                <div className="d-flex gap-2 flex-column">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditando(profesor)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(profesor.idProfesor)}
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

export default ProfesoresAdm;
