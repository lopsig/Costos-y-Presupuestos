// ============================================
// navegacion.js
// Resalta el botón activo en el nav según la página actual
// ============================================

// Al cargar cualquier página, marca como activo el botón
// cuyo href coincida con el archivo actual
document.addEventListener("DOMContentLoaded", () => {
  // Obtener el nombre del archivo actual (ej: "recetas.html")
  const paginaActual = window.location.pathname.split("/").pop();

  // Recorrer todos los links del nav y marcar el que coincida
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === paginaActual) {
      link.classList.add("activo");
    }
  });
});
