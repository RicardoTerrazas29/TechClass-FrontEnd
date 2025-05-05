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
  const [nuevoEstudiante, setNuevoEstudiante] = useState<Omit<Estudiante, 'idEstudiante'>>({
    name: '',
    dni: '',
    genero: 'masculino',  // Valor por defecto
    address: '',
    mail: '',
    clave: '',
  });
  const [editando, setEditando] = useState<Estudiante | null>(null);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    const response = await axios.get<Estudiante[]>('http://localhost:8080/estudiante');
    setEstudiantes(response.data);
  };

  const handleCrear = async () => {
    try {
      await axios.post('http://localhost:8080/estudiante', [nuevoEstudiante]);
      setNuevoEstudiante({
        name: '',
        dni: '',
        genero: 'masculino',  // Resetear a masculino
        address: '',
        mail: '',
        clave: '',
      });
      fetchEstudiantes();
    } catch (error) {
      console.error('Error al crear estudiante:', error);
    }
  };

  const handleActualizar = async () => {
    if (editando) {
      try {
        await axios.put(`http://localhost:8080/estudiante/${editando.idEstudiante}`, editando);
        setEditando(null);
        fetchEstudiantes();
      } catch (error) {
        console.error('Error al actualizar estudiante:', error);
      }
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/estudiante/${id}`);
      fetchEstudiantes();
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Estudiantes</h2>

      {/* Formulario para crear */}
      <div className="card p-4 mb-4">
        <h4>Crear Nuevo Estudiante</h4>
        <div className="row">
          <div className="col">
            <input className="form-control mb-2" placeholder="Nombre" value={nuevoEstudiante.name}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, name: e.target.value })} />
          </div>
          <div className="col">
            <input className="form-control mb-2" placeholder="DNI" value={nuevoEstudiante.dni}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, dni: e.target.value })} />
          </div>
          <div className="col">
            <select className="form-control mb-2" value={nuevoEstudiante.genero}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, genero: e.target.value })}>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
          </div>
          <div className="col">
            <input className="form-control mb-2" placeholder="Dirección" value={nuevoEstudiante.address}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, address: e.target.value })} />
          </div>
          <div className="col">
            <input className="form-control mb-2" placeholder="Correo" value={nuevoEstudiante.mail}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, mail: e.target.value })} />
          </div>
          <div className="col">
            <input className="form-control mb-2" placeholder="Clave" type="password" value={nuevoEstudiante.clave}
              onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, clave: e.target.value })} />
          </div>
          <div className="col-auto">
            <button className="btn btn-primary mb-2" onClick={handleCrear}>Crear</button>
          </div>
        </div>
      </div>

      {/* Tabla de estudiantes */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
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
            <tr key={estudiante.idEstudiante}>
              <td>{estudiante.idEstudiante}</td>

              {/* nombre */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <input className="form-control" value={editando.name}
                    onChange={(e) => setEditando({ ...editando, name: e.target.value })} />
                ) : (
                  estudiante.name
                )}
              </td>

              {/* dni */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <input className="form-control" value={editando.dni}
                    onChange={(e) => setEditando({ ...editando, dni: e.target.value })} />
                ) : (
                  estudiante.dni
                )}
              </td>

              {/* genero */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <select className="form-control" value={editando.genero}
                    onChange={(e) => setEditando({ ...editando, genero: e.target.value })}>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                ) : (
                  estudiante.genero
                )}
              </td>

              {/* direccion */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <input className="form-control" value={editando.address}
                    onChange={(e) => setEditando({ ...editando, address: e.target.value })} />
                ) : (
                  estudiante.address
                )}
              </td>
              
              {/* correo */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <input className="form-control" value={editando.mail}
                    onChange={(e) => setEditando({ ...editando, mail: e.target.value })} />
                ) : (
                  estudiante.mail
                )}
              </td>
              
              {/* Clave */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <>
                    <input
                      className="form-control mb-1"
                      type="password"
                      value={editando.clave}
                      onChange={(e) => setEditando({ ...editando, clave: e.target.value })}
                    />
                    <small className="text-danger">⚠️ Importante: actualice la contraseña</small>
                  </>
                ) : (
                  "••••••"
                )}
              </td>

              {/* Botones */}
              <td>
                {editando?.idEstudiante === estudiante.idEstudiante ? (
                  <>
                    <button className="btn btn-success btn-sm me-2" onClick={handleActualizar}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditando(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditando(estudiante)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(estudiante.idEstudiante)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudiantesAdm;
