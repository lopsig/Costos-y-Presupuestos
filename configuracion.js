// ============================================
// configuracion.js
// Funciones para la sección de configuración
// ============================================

function guardarConfiguracion() {
  const costoManoObra = parseFloat(
    document.getElementById("conf-mano-obra").value,
  );
  const porcentajeInd = parseFloat(
    document.getElementById("conf-indirectos").value,
  );
  const margenGanancia = parseFloat(
    document.getElementById("conf-margen").value,
  );

  if (isNaN(costoManoObra) || isNaN(porcentajeInd) || isNaN(margenGanancia)) {
    alert("Por favor ingresa valores válidos en la configuración.");
    return;
  }

  configuracion.costoHoraManoObra = costoManoObra;
  configuracion.porcentajeIndirectos = porcentajeInd;
  configuracion.margenGanancia = margenGanancia;

  // Sincronizar con localStorage para que persista entre páginas
  localStorage.setItem("configuracion", JSON.stringify(configuracion));

  document.getElementById("msg-configuracion").textContent =
    "✓ Configuración guardada correctamente.";
}

// Cargar los valores actuales en el formulario al iniciar
document.getElementById("conf-mano-obra").value =
  configuracion.costoHoraManoObra;
document.getElementById("conf-indirectos").value =
  configuracion.porcentajeIndirectos;
document.getElementById("conf-margen").value = configuracion.margenGanancia;
