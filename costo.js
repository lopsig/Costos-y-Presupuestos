// ============================================
// costo.js
// Funciones para el cálculo del costo de producción
// ============================================

// actualizarSelectorRecetas: llena el select con las recetas disponibles
function actualizarSelectorRecetas() {
  const select = document.getElementById("sel-receta");
  select.innerHTML = '<option value="">-- Selecciona una receta --</option>';
  recetas.forEach((rec) => {
    select.innerHTML += `<option value="${rec.id}">${rec.nombre}</option>`;
  });
}

// calcularCosto: calcula el costo real de la receta seleccionada
function calcularCosto() {
  const idSeleccionado = parseInt(document.getElementById("sel-receta").value);

  if (isNaN(idSeleccionado)) {
    alert("Por favor selecciona una receta.");
    return;
  }

  const receta = recetas.find((r) => r.id === idSeleccionado);
  if (!receta) {
    alert("Receta no encontrada.");
    return;
  }

  // --- PASO 1: Costo de ingredientes con merma ---
  let costoIngredientes = 0;
  let detalleIngredientes = "";

  receta.ingredientes.forEach((ing) => {
    const mp = materiasPrimas.find((m) => m.id === ing.idMateria);
    if (!mp) return;

    // Precio real considerando merma
    // Fórmula: precio / (cantidad * (1 - merma/100))
    const precioRealPorUnidad =
      mp.precio / (mp.cantidad * (1 - mp.merma / 100));
    const costoIngrediente = precioRealPorUnidad * ing.cantidad;
    costoIngredientes += costoIngrediente;

    detalleIngredientes += `
      <tr>
        <td>${mp.nombre}</td>
        <td>${ing.cantidad} ${mp.unidad}</td>
        <td>${mp.merma}%</td>
        <td>$${costoIngrediente.toFixed(4)}</td>
      </tr>
    `;
  });

  // --- PASO 2: Mano de obra ---
  // Fórmula: (minutos / 60) × costo por hora
  const costoManoObra = (receta.tiempo / 60) * configuracion.costoHoraManoObra;

  // --- PASO 3: Subtotal ---
  const subtotal = costoIngredientes + costoManoObra;

  // --- PASO 4: Costos indirectos ---
  // Fórmula: subtotal × (porcentaje / 100)
  const costosIndirectos =
    subtotal * (configuracion.porcentajeIndirectos / 100);

  // --- PASO 5: Costo total ---
  const costoTotal = subtotal + costosIndirectos;

  // --- PASO 6: Costo por porción ---
  const costoPorcion = costoTotal / receta.porciones;

  // --- PASO 7: Precio de venta con margen de ganancia ---
  // Fórmula: costo por porción × (1 + margen/100)
  const precioVenta = costoPorcion * (1 + configuracion.margenGanancia / 100);

  // --- Mostrar desglose en pantalla ---
  document.getElementById("resultado-costo").innerHTML = `
    <h3>Desglose de costos: ${receta.nombre}</h3>

    <h4>Ingredientes</h4>
    <table>
      <thead>
        <tr>
          <th>Ingrediente</th>
          <th>Cantidad usada</th>
          <th>Merma</th>
          <th>Costo</th>
        </tr>
      </thead>
      <tbody>${detalleIngredientes}</tbody>
    </table>

    <div class="resumen-costos">
      <p>Costo total ingredientes: <strong>$${costoIngredientes.toFixed(2)}</strong></p>
      <p>Mano de obra (${receta.tiempo} min a $${configuracion.costoHoraManoObra}/hora): <strong>$${costoManoObra.toFixed(2)}</strong></p>
      <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
      <p>Costos indirectos (${configuracion.porcentajeIndirectos}%): <strong>$${costosIndirectos.toFixed(2)}</strong></p>
      <hr>
      <p>Costo total de la receta: <strong>$${costoTotal.toFixed(2)}</strong></p>
      <p>Costo por porción (${receta.porciones} porciones): <strong>$${costoPorcion.toFixed(2)}</strong></p>
      <p>Precio de venta sugerido (margen ${configuracion.margenGanancia}%): <strong>$${precioVenta.toFixed(2)}</strong></p>
    </div>
  `;
}

// Inicializar el selector al cargar la página
actualizarSelectorRecetas();
