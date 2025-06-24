import { useState, useEffect } from "react";
import axios from "axios";

export interface Logro {
  idLogro: number;
  titulo: string;
  icono: string;
  curso: { nombre: string };
  contenido: { titulo: string };
}

export function useMisLogros(idEstudiante: number) {
  const [logros, setLogros] = useState<Logro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idEstudiante) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/logros/estudiante/${idEstudiante}`)
      .then((res) => setLogros(res.data))
      .finally(() => setLoading(false));
  }, [idEstudiante]);

  return { logros, loading };
}