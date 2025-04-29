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
  const [nuevoProfesor, setNuevoProfesor] = useState<Omit<Profesor, 'idProfesor'>>({
    name: '',
    phone: '',
    mail: '',
    clave: '',
  });
  const [editando, setEditando] = useState<Profesor | null>(null);

  // Cargar lista
  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    const response = await axios.get<Profesor[]>('http://localhost:8080/profesor');
    setProfesores(response.data);
  };

  const handleCrear = async () => {
    try {
      await axios.post('http://localhost:8080/profesor', [nuevoProfesor]);
      setNuevoProfesor({ name: '', phone: '', mail: '', clave: '' });
      fetchProfesores();
    } catch (error) {
      console.error('Error al crear:', error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      try {
        await axios.put(`http://localhost:8080/profesor/${editando.idProfesor}`, editando);
        setEditando(null);
        fetchProfesores();
      } catch (error) {
        console.error('Error al actualizar:', error);
      }
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/profesor/${id}`);
      fetchProfesores();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gestión de Profesores</h2>

      {/* Crear nuevo profesor */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Crear Nuevo Profesor</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={nuevoProfesor.name}
                onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, name: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono"
                value={nuevoProfesor.phone}
                onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, phone: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={nuevoProfesor.mail}
                onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, mail: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="password"
                className="form-control"
                placeholder="Clave"
                value={nuevoProfesor.clave}
                onChange={(e) => setNuevoProfesor({ ...nuevoProfesor, clave: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary" onClick={handleCrear}>
                Crear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de profesores */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
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
              <tr key={profesor.idProfesor}>
                <td>{profesor.idProfesor}</td>

                {/* Nombre */}
                <td>
                  {editando?.idProfesor === profesor.idProfesor ? (
                    <input
                      className="form-control"
                      value={editando.name}
                      onChange={(e) => setEditando({ ...editando, name: e.target.value })}
                    />
                  ) : (
                    profesor.name
                  )}
                </td>

                {/* Teléfono */}
                <td>
                  {editando?.idProfesor === profesor.idProfesor ? (
                    <input
                      className="form-control"
                      value={editando.phone}
                      onChange={(e) => setEditando({ ...editando, phone: e.target.value })}
                    />
                  ) : (
                    profesor.phone
                  )}
                </td>

                {/* Correo */}
                <td>
                  {editando?.idProfesor === profesor.idProfesor ? (
                    <input
                      className="form-control"
                      value={editando.mail}
                      onChange={(e) => setEditando({ ...editando, mail: e.target.value })}
                    />
                  ) : (
                    profesor.mail
                  )}
                </td>

                {/* Clave */}
                <td>
                  {editando?.idProfesor === profesor.idProfesor ? (
                    <input
                      type="password"
                      className="form-control"
                      value={editando.clave}
                      onChange={(e) => setEditando({ ...editando, clave: e.target.value })}
                    />
                  ) : (
                    <span>********</span>
                  )}
                </td>

                {/* Botones */}
                <td>
                  {editando?.idProfesor === profesor.idProfesor ? (
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
                      <button className="btn btn-warning btn-sm me-2" onClick={() => setEditando(profesor)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(profesor.idProfesor)}>
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

export default ProfesoresAdm;
