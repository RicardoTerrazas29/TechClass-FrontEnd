import {useState} from "react";
import Joyride from "react-joyride";

const steps = [
    {
        content: <div>
        <h2>¡Vamos a comenzar con nuestro viaje!</h2>
        <img className="max-w-32 mx-auto my-4" src="/public/imagenes/rocket.png" alt="" />
        <p>¡Que lo disfrutes al cien por ciento!</p>
      </div>,
      styles: {
        options: {
          width: 600,
        },
      },
        locale: { skip: <strong aria-label="skip">S-A-L-T-A-R</strong> },
        placement: 'center',
        target: 'body',
    },
    {
        target: "#Dashboard",
        content: "Aquí puedes ver tus avance en el dashboard y tus objetivos.",
        title: 'Mi Dashboard',
        placement:"right-start"
    },
    {
        target: "#MisCursos",
        content: "Aquí puedes ver tus cursos y los contenidos.",
        title: "Mis Cursos",
        placement:"right-start"
    },
    {
        target: "#MisLogros",
        title: "Mis Logros",
        content: "Aquí puedes ver tus logros obtenidos.",
        placement:"right-start"
    },
    {
        target: "#hongo",
        title: "Motívate con Toad",
        content: "Interactua con Toad para sentirte motivado. Hazle click para ver y escuchar el mensaje.",
    },
    {
        target: "#nuti",
        content: (
            <div>
            <h3>Juega con Nuti</h3>
            <img className="max-w-32 mx-auto" src="/public/imagenes/ardilla.png" alt="" />
            <p>Conoce a Nuti y diviértete con ella.</p>
          </div>
          )
        
    },
    {
        target: "#perfil",
        content: (
            <div>
            <h3>Mi Perfil</h3>
            <img className="max-w-32 mx-auto" src="/public/imagenes/perfil.png" alt="" />
            <p>Aqui puedes editar tu perfil y cerrar sesión cuando desees salir de tu plataforma educativa</p>
          </div>
        ),
    }
    
  ];

function Tour() {
    const [run, setRun] = useState(false);

  const handleClickStart = () => {
    setRun(true);
  };

    return (
      <div>
          <Joyride
            steps={steps}
            run={run}
            continuous
            showSkipButton
            showProgress
            disableOverlayClose
            scrollToFirstStep
            disableScrolling={false}
            locale={{
                back: "Atrás",
                close: "Cerrar",
                last: "Finalizar",
                nextLabelWithProgress: 'Siguiente (Paso {step} de {steps})',
                skip: "Saltar"
            }}
            styles={{
                options: {
                  zIndex: 10000,
                },
              }}
            callback={data => {
                if (data.status === "finished" || data.status === "skipped") {
                    setRun(false);
                  }
            }}
          />
          <button 
           className="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded" 
           onClick={handleClickStart}>
            🧭 <span className="hidden sm:inline">Empezar tour</span>
          </button>
      </div>
    );
  }

  export default Tour