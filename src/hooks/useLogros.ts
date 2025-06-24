import { useState, useEffect } from "react";
import axios from "axios";

export interface Logro{
    idLogro:number;
    titulo:string;
    icono:string;
    curso:{idCurso:number; nombre:string};
    contenido:{idContenido:number;titulo:string};
}

export interface Curso{
    idCurso: number;
    nombre: string;
}

export interface Contenido{
    idContenido: number;
    titulo: string;
}

export function useLogros(){
    const [logros,setLogros]=useState<Logro[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [contenidos, setContenidos] = useState<Contenido[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Para edición
    const [selectedLogro, setSelectedLogro] = useState<Logro | null>(null);

    useEffect(() => {
        fetchLogros();
        fetchCursos();
    }, []);

    const fetchLogros = async () => {
        setLoading(true);
        try {
        const res = await axios.get("http://localhost:8080/api/logros");
        setLogros(res.data);
        } catch (e) {
        setError("Error al cargar logros");
        } finally {
        setLoading(false);
        }
    };

    const fetchCursos = async () => {
        try {
        const res = await axios.get("http://localhost:8080/api/cursos");
        setCursos(res.data);
        } catch (e) {
        setError("Error al cargar cursos");
        }
    };

    const fetchContenidos = async (idCurso: number) => {
        try {
        const res = await axios.get(`http://localhost:8080/api/contenidos/curso/${idCurso}`);
        setContenidos(res.data.contenidos || []);
        } catch (e) {
        setContenidos([]);
        }
    };

    const crearLogro = async (data: {
        titulo: string;
        icono: File;
        idCurso: number;
        idContenido: number;
    }) => {
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        formData.append("icono", data.icono);
        formData.append("idCurso", String(data.idCurso));
        formData.append("idContenido", String(data.idContenido));
        await axios.post("http://localhost:8080/api/logros", formData);
        fetchLogros();
    };

    const editarLogro = async (
        idLogro: number,
        data: { titulo: string; icono?: File; idCurso: number; idContenido: number }
    ) => {
        const formData = new FormData();
        formData.append("titulo", data.titulo);
        if (data.icono) formData.append("icono", data.icono);
        formData.append("idCurso", String(data.idCurso));
        formData.append("idContenido", String(data.idContenido));
        await axios.put(`http://localhost:8080/api/logros/${idLogro}`, formData);
        fetchLogros();
    };

    const eliminarLogro = async (idLogro: number) => {
        await axios.delete(`http://localhost:8080/api/logros/${idLogro}`);
        fetchLogros();
    };

    return {
        logros,
        cursos,
        contenidos,
        loading,
        error,
        selectedLogro,
        setSelectedLogro,
        fetchContenidos,
        crearLogro,
        editarLogro,
        eliminarLogro,
        fetchLogros,
    };
}