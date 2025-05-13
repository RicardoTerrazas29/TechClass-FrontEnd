import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "chart.js";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

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
    axios
      .get("http://localhost:8080/estudiante")
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.error("Error al obtener estudiantes:", err));
  }, []);

  const conteoGenero = estudiantes.reduce<Record<string, number>>(
    (acc, est) => {
      const genero = est.genero || "Desconocido";
      acc[genero] = (acc[genero] || 0) + 1;
      return acc;
    },
    {}
  );

  const conteoDominio = estudiantes.reduce<Record<string, number>>(
    (acc, est) => {
      const dominio = est.mail?.split("@")[1] || "Desconocido";
      acc[dominio] = (acc[dominio] || 0) + 1;
      return acc;
    },
    {}
  );

  const conteoDireccion = estudiantes.reduce<Record<string, number>>(
    (acc, est) => {
      const direccion = est.address || "Desconocido";
      acc[direccion] = (acc[direccion] || 0) + 1;
      return acc;
    },
    {}
  );

  const acumulado = estudiantes.map((_, index) => index + 1);

  const opcionesGenerales = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/colorful-wood-puzzle-pieces-blue-background-geometric-shape-block-with-copy-space-concepts-logical-thinking-conundrum-solutions-rational-strategy-world-logic-day-education_42256-6849.jpg')",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-4">
          📊 Reporte Visual de Estudiantes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gráfico de Género */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-sky-700 mb-4">
              👦👧 Estudiantes por Género
            </h2>
            <Bar
              data={{
                labels: Object.keys(conteoGenero),
                datasets: [
                  {
                    label: "Cantidad",
                    data: Object.values(conteoGenero),
                    backgroundColor: ["#A5D8FF", "#FFB3BA", "#FFE066"],
                  },
                ],
              }}
              options={{
                ...opcionesGenerales,
                plugins: {
                  ...opcionesGenerales.plugins,
                  title: { display: true, text: "Distribución por Género" },
                },
              }}
            />
          </div>

          {/* Gráfico de Dominio de Correo */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-purple-700 mb-4">
              📧 Dominio de Correos
            </h2>
            <Pie
              data={{
                labels: Object.keys(conteoDominio),
                datasets: [
                  {
                    label: "Correos",
                    data: Object.values(conteoDominio),
                    backgroundColor: [
                      "#FFC1CC",
                      "#B2EBF2",
                      "#D1C4E9",
                      "#FFE082",
                      "#C8E6C9",
                    ],
                  },
                ],
              }}
              options={{
                ...opcionesGenerales,
                plugins: {
                  ...opcionesGenerales.plugins,
                  title: {
                    display: true,
                    text: "Distribución por Dominio de Correo",
                  },
                },
              }}
            />
          </div>

          {/* Gráfico de Dirección */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-green-700 mb-4">
              🏡 Estudiantes por Dirección
            </h2>
            <Doughnut
              data={{
                labels: Object.keys(conteoDireccion),
                datasets: [
                  {
                    label: "Direcciones",
                    data: Object.values(conteoDireccion),
                    backgroundColor: [
                      "#AED581",
                      "#4DD0E1",
                      "#FFCC80",
                      "#FF8A65",
                    ],
                  },
                ],
              }}
              options={{
                ...opcionesGenerales,
                plugins: {
                  ...opcionesGenerales.plugins,
                  title: { display: true, text: "Distribución por Dirección" },
                },
              }}
            />
          </div>

          {/* Gráfico de Acumulado */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold text-pink-700 mb-4">
              📈 Acumulado de Estudiantes
            </h2>
            <Line
              data={{
                labels: acumulado.map((_, i) => `#${i + 1}`),
                datasets: [
                  {
                    label: "Estudiantes Acumulados",
                    data: acumulado,
                    borderColor: "#FF80AB",
                    backgroundColor: "rgba(255, 128, 171, 0.4)",
                    tension: 0.3,
                    fill: true,
                  },
                ],
              }}
              options={{
                ...opcionesGenerales,
                plugins: {
                  ...opcionesGenerales.plugins,
                  title: {
                    display: true,
                    text: "Crecimiento de Registro de Estudiantes",
                  },
                },
                scales: {
                  x: { title: { display: true, text: "Estudiante" } },
                  y: {
                    title: { display: true, text: "Cantidad" },
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoEstudiantes;
