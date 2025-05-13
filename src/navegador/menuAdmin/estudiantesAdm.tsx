import React, { useEffect, useState } from "react";
import axios from "axios";

interface Estudiante {
  idEstudiante: number;
  name: string;
  dni: string;
  genero: string;
  address: string;
  mail: string;
  clave: string;
}

const EstudiantesAdm: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [nuevoEstudiante, setNuevoEstudiante] = useState<
    Omit<Estudiante, "idEstudiante">
  >({
    name: "",
    dni: "",
    genero: "masculino",
    address: "",
    mail: "",
    clave: "",
  });
  const [editando, setEditando] = useState<Estudiante | null>(null);
  const [erroresNuevo, setErroresNuevo] = useState<{ [key: string]: string }>(
    {}
  );
  const [erroresEditar, setErroresEditar] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    const response = await axios.get<Estudiante[]>(
      "http://localhost:8080/estudiante"
    );
    setEstudiantes(response.data);
  };

  const handleCrear = async () => {
    const errores = validarCampos(nuevoEstudiante);
    if (Object.keys(errores).length > 0) {
      setErroresNuevo(errores);
      return;
    }
    try {
      await axios.post("http://localhost:8080/estudiante", [nuevoEstudiante]);
      setNuevoEstudiante({
        name: "",
        dni: "",
        genero: "masculino",
        address: "",
        mail: "",
        clave: "",
      });
      setErroresNuevo({});
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al crear estudiante:", error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      const { idEstudiante, ...datosEditar } = editando;
      const errores = validarCampos(datosEditar);
      if (Object.keys(errores).length > 0) {
        setErroresEditar(errores);
        return;
      }
      try {
        await axios.put(
          `http://localhost:8080/estudiante/${editando.idEstudiante}`,
          editando
        );
        setEditando(null);
        setErroresEditar({});
        fetchEstudiantes();
      } catch (error) {
        console.error("Error al actualizar estudiante:", error);
      }
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/estudiante/${id}`);
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  const validarCampos = (estudiante: Omit<Estudiante, "idEstudiante">) => {
    const errores: { [key: string]: string } = {};

    if (!/^[a-zA-Z\s]+$/.test(estudiante.name)) {
      errores.name = "El nombre solo debe contener letras y espacios.";
    }

    if (!/^\d{8}$/.test(estudiante.dni)) {
      errores.dni = "El DNI debe tener exactamente 8 dígitos numéricos.";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(estudiante.mail)) {
      errores.mail = "El correo no es válido.";
    }

    if (!estudiante.clave) {
      errores.clave = "La clave no puede estar vacía.";
    }

    return errores;
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/school-supplies-school-desk-stationery-school-concept-blue-background-creative-chaos-space-text-markers-pens-notepads-stickers-copyspace_1048944-9587979.jpg')",
      }}
    >
      <div className="container bg-white bg-opacity-75 p-4 rounded-4 shadow">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          👩‍💼 Gestión de Estudiantes 👨‍💼
        </h2>

        {/* Formulario */}
        <div className="card shadow-lg mb-4">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">➕ Agregar Nuevo Estudiante</h5>
          </div>

          <div className="row g-3 p-4">
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                placeholder="👦 Nombre"
                value={nuevoEstudiante.name}
                onChange={(e) =>
                  setNuevoEstudiante({
                    ...nuevoEstudiante,
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
                placeholder="🆔 DNI"
                value={nuevoEstudiante.dni}
                onChange={(e) =>
                  setNuevoEstudiante({
                    ...nuevoEstudiante,
                    dni: e.target.value,
                  })
                }
              />
              {erroresNuevo.dni && (
                <div className="text-danger small ms-1">{erroresNuevo.dni}</div>
              )}
            </div>
            <div className="col-12 col-md-6">
              <select
                className="form-control rounded-3 shadow-sm"
                value={nuevoEstudiante.genero}
                onChange={(e) =>
                  setNuevoEstudiante({
                    ...nuevoEstudiante,
                    genero: e.target.value,
                  })
                }
              >
                <option value="masculino">🧒 Masculino</option>
                <option value="femenino">👧 Femenino</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                placeholder="🏠 Dirección"
                value={nuevoEstudiante.address}
                onChange={(e) =>
                  setNuevoEstudiante({
                    ...nuevoEstudiante,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                className="form-control rounded-3 shadow-sm"
                placeholder="📧 Correo"
                value={nuevoEstudiante.mail}
                onChange={(e) =>
                  setNuevoEstudiante({
                    ...nuevoEstudiante,
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
                value={nuevoEstudiante.clave}
                onChange={(e) =>
                  setNuevoEstudiante({
                    ...nuevoEstudiante,
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
                🎓 Crear Estudiante
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de estudiantes */}
        <div className="table-responsive d-none d-md-block rounded">
          <table className="table table-striped table-bordered table-hover bg-white rounded shadow-sm">
            <thead className="table-success text-center">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Género</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Clave</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr
                  key={estudiante.idEstudiante}
                  className="text-center align-middle"
                >
                  <td>{estudiante.idEstudiante}</td>
                  <td>
                    {editando?.idEstudiante === estudiante.idEstudiante ? (
                      <input
                        className="form-control"
                        value={editando.name}
                        onChange={(e) =>
                          setEditando({ ...editando, name: e.target.value })
                        }
                      />
                    ) : (
                      estudiante.name
                    )}
                    {erroresEditar.name &&
                      editando?.idEstudiante === estudiante.idEstudiante && (
                        <div className="text-danger small">
                          {erroresEditar.name}
                        </div>
                      )}
                  </td>
                  <td>
                    {editando?.idEstudiante === estudiante.idEstudiante ? (
                      <input
                        className="form-control"
                        value={editando.dni}
                        onChange={(e) =>
                          setEditando({ ...editando, dni: e.target.value })
                        }
                      />
                    ) : (
                      estudiante.dni
                    )}
                    {erroresEditar.dni &&
                      editando?.idEstudiante === estudiante.idEstudiante && (
                        <div className="text-danger small">
                          {erroresEditar.dni}
                        </div>
                      )}
                  </td>
                  <td>
                    {editando?.idEstudiante === estudiante.idEstudiante ? (
                      <select
                        className="form-control"
                        value={editando.genero}
                        onChange={(e) =>
                          setEditando({
                            ...editando,
                            genero: e.target.value,
                          })
                        }
                      >
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                      </select>
                    ) : (
                      estudiante.genero
                    )}
                  </td>
                  <td>
                    {editando?.idEstudiante === estudiante.idEstudiante ? (
                      <input
                        className="form-control"
                        value={editando.address}
                        onChange={(e) =>
                          setEditando({
                            ...editando,
                            address: e.target.value,
                          })
                        }
                      />
                    ) : (
                      estudiante.address
                    )}
                  </td>
                  <td>
                    {editando?.idEstudiante === estudiante.idEstudiante ? (
                      <input
                        className="form-control"
                        value={editando.mail}
                        onChange={(e) =>
                          setEditando({ ...editando, mail: e.target.value })
                        }
                      />
                    ) : (
                      estudiante.mail
                    )}
                    {erroresEditar.mail &&
                      editando?.idEstudiante === estudiante.idEstudiante && (
                        <div className="text-danger small">
                          {erroresEditar.mail}
                        </div>
                      )}
                  </td>
                  <td>
                    {editando?.idEstudiante === estudiante.idEstudiante ? (
                      <>
                        <input
                          className="form-control"
                          type="password"
                          value={editando.clave}
                          onChange={(e) =>
                            setEditando({
                              ...editando,
                              clave: e.target.value,
                            })
                          }
                        />
                        <small className="text-danger">
                          ⚠️ Actualiza la contraseña
                        </small>
                      </>
                    ) : (
                      "••••••"
                    )}
                    {erroresEditar.clave &&
                      editando?.idEstudiante === estudiante.idEstudiante && (
                        <div className="text-danger small">
                          {erroresEditar.clave}
                        </div>
                      )}
                  </td>
                  <td>
                    <div className="d-flex flex-column flex-sm-row gap-2">
                      {editando?.idEstudiante === estudiante.idEstudiante ? (
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
                              onClick={() => setEditando(estudiante)}
                            >
                              ✏️ Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleEliminar(estudiante.idEstudiante)
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
          {estudiantes.map((estudiante) => (
            <div key={estudiante.idEstudiante} className="card mb-3 shadow-sm">
              <div className="card-body">
                <h5 className="card-title fw-bold">{estudiante.name}</h5>
                <p className="card-text mb-1">
                  <strong>ID:</strong> {estudiante.idEstudiante}
                </p>
                <p className="card-text mb-1">
                  <strong>DNI:</strong> {estudiante.dni}
                </p>
                <p className="card-text mb-1">
                  <strong>Género:</strong> {estudiante.genero}
                </p>
                <p className="card-text mb-1">
                  <strong>Dirección:</strong> {estudiante.address}
                </p>
                <p className="card-text mb-1">
                  <strong>Correo:</strong> {estudiante.mail}
                </p>
                <p className="card-text mb-3">
                  <strong>Clave:</strong> ••••••
                </p>
                <div className="d-flex gap-2 flex-column">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditando(estudiante)}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleEliminar(estudiante.idEstudiante)}
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

export default EstudiantesAdm;
