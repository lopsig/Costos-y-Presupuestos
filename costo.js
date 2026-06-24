// ============================================
// costo.js
// Funciones para el cálculo del costo de producción
// ============================================

//-----/////////-----
window.recetaActivaGlobal = null;

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
  //Etapa 1: Captura de datos y validación
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

  window.recetaActivaGlobal = receta;
  //------///////-------

  //Etapa 2: Bucle de ingredientes y cálculo de mermas
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

    const precioSinMerma = mp.precio / mp.cantidad;
    const costoSinMerma = precioSinMerma * ing.cantidad;
    const costoMerma = costoIngrediente - costoSinMerma;

    const stockDisponible = mp.cantidad;

    detalleIngredientes += `
      <tr>
        <td>${mp.nombre}</td>
        <td>${ing.cantidad} ${mp.unidad}</td>
        <td>${stockDisponible} ${mp.unidad}</td> <td>$${costoMerma.toFixed(4)}</td>   <td>$${costoIngrediente.toFixed(4)}</td>
      </tr>
    `;
  });
  //-------///////-----------

  //Etapa 3: Estructura de costos en cadena

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

  
  //Etapa 4: Renderizado de la interfaz y botón operativo
  document.getElementById("resultado-costo").innerHTML = `
    <h3>Desglose de costos: ${receta.nombre}</h3>

    <h4>Ingredientes</h4>
    <table>
      <thead>
        <tr>
          <th>Ingrediente</th>
          <th>Cantidad usada</th>
          <th>Stock Disponible</th>
          <th>Costo Merma</th>
          <th>Costo Total</th>
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

    <div style="margin-top: 20px; text-align: right;">
      <button class="btn-principal" onclick="ejecutarProduccion()" style="background-color: #2ecc71; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
        Producir Receta
      </button>
    </div>
  `;
}


//////////////////////////////////////////
function ejecutarProduccion() {
  const receta = window.recetaActivaGlobal;

  if (!receta) {
    alert("No hay ninguna receta activa para producir.");
    return;
  }

  let stockSuficiente = true;

  // PASO 1: Validar si hay stock suficiente en materiasPrimas antes de alterar nada
  receta.ingredientes.forEach((ing) => {
    const mp = materiasPrimas.find((m) => m.id === ing.idMateria);
    if (mp) {
      if (mp.cantidad < ing.cantidad) {
        alert(
          `⚠ Inventario insuficiente de: ${mp.nombre}.\nRequieres: ${ing.cantidad} ${mp.unidad}\nStock actual: ${mp.cantidad} ${mp.unidad}`,
        );
        stockSuficiente = false;
      }
    }
  });


  if (!stockSuficiente) return;


  receta.ingredientes.forEach((ing) => {
    const mp = materiasPrimas.find((m) => m.id === ing.idMateria);
    if (mp) {
      mp.cantidad = mp.cantidad - ing.cantidad;
    }
  });

  localStorage.setItem("materiasPrimas", JSON.stringify(materiasPrimas));

  alert(
    `Orden de producción exitosa para la receta "${receta.nombre}". Stock Actualizado`,
  );


  calcularCosto();
}

// Inicializar el selector al cargar la página
actualizarSelectorRecetas();


