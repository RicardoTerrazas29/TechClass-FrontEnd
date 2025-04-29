import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Administrador {
  idAdministrador: number;
  name: string;
  mail: string;
  clave: string;
}

const AdministradorPage: React.FC = () => {
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [nuevoAdmin, setNuevoAdmin] = useState<Omit<Administrador, 'idAdministrador'>>({ name: '', mail: '', clave: '' });
  const [editando, setEditando] = useState<Administrador | null>(null);

  const fetchAdministradores = async () => {
    const response = await axios.get<Administrador[]>('http://localhost:8080/administrador');
    setAdministradores(response.data);
  };

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const handleCrear = async () => {
    try {
      await axios.post('http://localhost:8080/administrador', [nuevoAdmin]);
      setNuevoAdmin({ name: '', mail: '', clave: '' });
      fetchAdministradores();
    } catch (error) {
      console.error('Error al crear:', error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      try {
        await axios.put(`http://localhost:8080/administrador/${editando.idAdministrador}`, editando);
        setEditando(null);
        fetchAdministradores();
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/administrador/${id}`);
      fetchAdministradores();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Administradores</h2>

      {/* Crear Nuevo Administrador */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Crear Nuevo Administrador</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nuevoAdmin.name}
                onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, name: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={nuevoAdmin.mail}
                onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, mail: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="password"
                className="form-control"
                placeholder="Clave"
                value={nuevoAdmin.clave}
                onChange={(e) => setNuevoAdmin({ ...nuevoAdmin, clave: e.target.value })}
              />
            </div>
            <div className="col-md-3 d-grid">
              <button className="btn btn-primary" onClick={handleCrear}>
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Administradores */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
              <tr key={admin.idAdministrador}>
                <td>{admin.idAdministrador}</td>

                {/* Nombre */}
                <td>
                  {editando?.idAdministrador === admin.idAdministrador ? (
                    <input
                      className="form-control"
                      value={editando.name}
                      onChange={(e) => setEditando({ ...editando, name: e.target.value })}
                    />
                  ) : (
                    admin.name
                  )}
                </td>

                {/* Correo */}
                <td>
                  {editando?.idAdministrador === admin.idAdministrador ? (
                    <input
                      className="form-control"
                      value={editando.mail}
                      onChange={(e) => setEditando({ ...editando, mail: e.target.value })}
                    />
                  ) : (
                    admin.mail
                  )}
                </td>

                {/* Clave */}
                <td>
                  {editando?.idAdministrador === admin.idAdministrador ? (
                    <input
                      type="password"
                      className="form-control"
                      value={editando.clave}
                      onChange={(e) => setEditando({ ...editando, clave: e.target.value })}
                    />
                  ) : (
                    <span>********</span> // Mostramos la clave oculta
                  )}
                </td>

                {/* Botones */}
                <td>
                  {editando?.idAdministrador === admin.idAdministrador ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={handleActualizar}>
                        Guardar
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => setEditando(admin)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(admin.idAdministrador)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdministradorPage;
