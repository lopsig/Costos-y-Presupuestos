// ============================================
// costo.js
// Funciones para el cálculo del costo de producción
// ============================================

//-----/////////-----
window.recetaActivaGlobal = null;
window.clienteActivoGlobal = null;

// actualizarSelectorRecetas: llena el select con las recetas disponibles
function actualizarSelectorRecetas() {
  const select = document.getElementById("sel-receta");
  select.innerHTML = '<option value="">-- Selecciona una receta --</option>';
  recetas.forEach((rec) => {
    select.innerHTML += `<option value="${rec.id}">${rec.nombre}</option>`;
  });
}

// actualizarSelectorClientes: llena el select con los clientes registrados
function actualizarSelectorClientes() {
  const select = document.getElementById("sel-cliente");
  if (!select) return;
  select.innerHTML = '<option value="">-- Selecciona un cliente --</option>';
  
  // Se busca del localStorage por si se agregaron nuevos, si no, usa el fallback por defecto
  const listaClientes = JSON.parse(localStorage.getItem("clientes")) || (typeof clientes !== "undefined" ? clientes : []);
  
  listaClientes.forEach((cli) => {
    select.innerHTML += `<option value="${cli.cedula}">${cli.nombre} ${cli.apellido}</option>`;
  });
}

// calcularCosto: calcula el costo real de la receta seleccionada
function calcularCosto() {
  //Etapa 1: Captura de datos y validación
  const idSeleccionado = parseInt(document.getElementById("sel-receta").value);
  const cedulaCliente = document.getElementById("sel-cliente").value;

  if (isNaN(idSeleccionado)) {
    alert("Por favor selecciona una receta.");
    return;
  }

  const receta = recetas.find((r) => r.id === idSeleccionado);
  if (!receta) {
    alert("Receta no encontrada.");
    return;
  }

  // Buscamos al cliente seleccionado en el local storage
const listaClientes =
  JSON.parse(localStorage.getItem("clientes")) ||
  (typeof clientes !== "undefined" ? clientes : []);
const cliente = listaClientes.find((c) => c.cedula === cedulaCliente);

if (!cliente) {
  alert("Cliente no encontrado.");
  return;
}

  window.recetaActivaGlobal = receta;
  window.clienteActivoGlobal = cliente;
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

    <div id="contenedor-cliente-produccion"></div>

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
  const cliente = window.clienteActivoGlobal;

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

  //Generar visualmente la tabla de asignación de cliente
  document.getElementById("contenedor-cliente-produccion").innerHTML = `
    <br>
    <h4 style="color: #2c3e50; margin-bottom: 8px;">✔ Orden Asignada para Distribución</h4>
    <table>
      <thead>
        <tr style="background-color: #34495e; color: white;">
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Celular</th>
          <th>Producto Asignado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${cliente.cedula}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.apellido}</td>
          <td>${cliente.correo}</td>
          <td>${cliente.celular}</td>
          <td><span style="background: #2ecc71; color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${receta.nombre}</span></td>
        </tr>
      </tbody>
    </table>
    <br>
  `;

  // Desactivamos u ocultamos el botón de producción para evitar que se presione dos veces seguidas para la misma orden
  const boton = document.querySelector(".btn-principal");
  if (boton) {
    boton.classList.add("btn-desactivado");
    boton.innerText = "🚀 Orden Despachada";
  }
}

// Inicializar el selector al cargar la página
actualizarSelectorRecetas();
actualizarSelectorClientes();


