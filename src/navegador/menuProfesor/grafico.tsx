import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

// Registro de módulos
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface Estudiante {
  idEstudiante: number;
  name: string;
  dni: string;
  genero: string;
  address: string;
  mail: string;
  clave: string;
}

const GraficoEstudiantes: React.FC = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/estudiante')
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.error('Error al obtener estudiantes:', err));
  }, []);

  // 1. Conteo por género
  const conteoGenero = estudiantes.reduce<Record<string, number>>((acc, est) => {
    const genero = est.genero || 'Desconocido';
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});

  // 2. Conteo por dominio de email
  const conteoDominio = estudiantes.reduce<Record<string, number>>((acc, est) => {
    const dominio = est.mail?.split('@')[1] || 'Desconocido';
    acc[dominio] = (acc[dominio] || 0) + 1;
    return acc;
  }, {});

  // 3. Conteo por dirección
  const conteoDireccion = estudiantes.reduce<Record<string, number>>((acc, est) => {
    const direccion = est.address || 'Desconocido';
    acc[direccion] = (acc[direccion] || 0) + 1;
    return acc;
  }, {});

  // 4. Conteo acumulado por índice
  const acumulado = estudiantes.map((_, index) => index + 1);

  const opcionesGenerales = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <h2>1. Gráfico de Barras - Género</h2>
      <Bar
        data={{
          labels: Object.keys(conteoGenero),
          datasets: [{
            label: 'Cantidad',
            data: Object.values(conteoGenero),
            backgroundColor: ['#42A5F5', '#FF7043', '#9CCC65'],
          }],
        }}
        options={{
          ...opcionesGenerales,
          plugins: { ...opcionesGenerales.plugins, title: { display: true, text: 'Estudiantes por Género' } },
        }}
      />

      <h2 style={{ marginTop: '3rem' }}>2. Gráfico Circular (Pie) - Dominio de Correo</h2>
      <Pie
        data={{
          labels: Object.keys(conteoDominio),
          datasets: [{
            label: 'Correos',
            data: Object.values(conteoDominio),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#FF9800'],
          }],
        }}
        options={{
          ...opcionesGenerales,
          plugins: { ...opcionesGenerales.plugins, title: { display: true, text: 'Estudiantes por Dominio de Correo' } },
        }}
      />

      <h2 style={{ marginTop: '3rem' }}>3. Gráfico Doughnut - Dirección</h2>
      <Doughnut
        data={{
          labels: Object.keys(conteoDireccion),
          datasets: [{
            label: 'Direcciones',
            data: Object.values(conteoDireccion),
            backgroundColor: ['#BA68C8', '#4DB6AC', '#FFD54F', '#E57373'],
          }],
        }}
        options={{
          ...opcionesGenerales,
          plugins: { ...opcionesGenerales.plugins, title: { display: true, text: 'Estudiantes por Dirección' } },
        }}
      />

      <h2 style={{ marginTop: '3rem' }}>4. Gráfico de Líneas - Acumulado de Estudiantes</h2>
      <Line
        data={{
          labels: acumulado.map((_, i) => `#${i + 1}`),
          datasets: [{
            label: 'Estudiantes Acumulados',
            data: acumulado,
            borderColor: '#3e95cd',
            backgroundColor: 'rgba(62,149,205,0.5)',
            tension: 0.3,
            fill: true,
          }],
        }}
        options={{
          ...opcionesGenerales,
          plugins: { ...opcionesGenerales.plugins, title: { display: true, text: 'Estudiantes Acumulados (Simulado)' } },
          scales: {
            x: { title: { display: true, text: 'Índice' } },
            y: { title: { display: true, text: 'Cantidad' }, beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default GraficoEstudiantes;
