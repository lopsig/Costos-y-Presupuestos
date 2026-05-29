const ocultarSeccion = () => {
  document.getElementById("conceptos").classList.remove("activa")
}

const mostrarSeccion = (idSeccion) => {
  ocultarSeccion()
  document.getElementById(idSeccion).classList.add("activa")
}