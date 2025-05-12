const AvatarUsuario = () => {
  const genero = localStorage.getItem("genero");
  let url = "";
  if (genero === "masculino") {
    url = "/imagenes/avatar-masculino.png";
  } else if (genero === "femenino") {
    url = "/imagenes/avatar-femenino.png";
  } else {
    url = "/imagenes/avatar-otro.png";
  }

  return <img src={url} alt="Perfil" className="w-10 h-10 rounded-full" />;
};

export default AvatarUsuario;
