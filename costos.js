// ------MOSTRAR SECCIONES-------
const ocultarSeccion = () => {
  document.getElementById("conceptos").classList.remove("activa")
}

const mostrarSeccion = (idSeccion) => {
  ocultarSeccion()
  document.getElementById(idSeccion).classList.add("activa")
}

// -------TEST DE EVALUCION-------
// Respuestas correctas y explicaciones (OBJETO)
const respuestas = {
  p1: {
    correcta: 'b',
    explicacion: 'La mano de obra representa el esfuerzo humano en la producción. No son las máquinas ni los materiales, sino las personas que trabajan para producir bienes o servicios.'
  },
  p2: {
    correcta: 'b',
    explicacion: 'El costeo de recetas calcula el costo total de los ingredientes. Es una herramienta muy usada en restaurantes y negocios de alimentos para fijar precios y controlar gastos.'
  },
  p3: {
    correcta: 'b',
    explicacion: 'El punto de equilibrio es el nivel de ventas donde los ingresos igualan a los costos. En ese punto no hay ganancias ni pérdidas; a partir de ahí comienza la utilidad.'
  },
  p4: {
    correcta: 'c',
    explicacion: 'La materia prima está formada por los materiales que se transforman o incorporan al producto final, siendo un componente fundamental del costo de producción.'
  },
  p5: {
    correcta: 'b',
    explicacion: 'Alquiler del local, debido a que es un gasto que siempre debe pagarse'
  }
};

// Evaluar el test al enviar
const evaluarTest = (event) => {
  event.preventDefault();

  let puntaje = 0;

  for (let num = 1; num <= 5; num++) {
    const pregunta  = document.getElementById('pregunta-' + num);
    const nombre   = 'p' + num;
    const seleccion = document.querySelector(`input[name="${nombre}"]:checked`);
    const feedback  = document.getElementById('feedback-' + num);

    // Verificar que respondió
    if (!seleccion) {
      feedback.textContent = '⚠ Por favor selecciona una respuesta.';
      feedback.className = 'feedback advertencia';
      return; // Detener si falta alguna respuesta
    }

    // Bloquear opciones
    document.querySelectorAll(`input[name="${nombre}"]`).forEach(input => input.disabled = true);

    // Revisar si es correcto
    if (seleccion.value === respuestas[nombre].correcta) {
      puntaje++;
      pregunta.classList.add('correcta');
      feedback.textContent = '✓ ¡Correcto!';
      feedback.className = 'feedback correcto';
    } else {
      pregunta.classList.add('incorrecta');
      feedback.innerHTML = `✗ Incorrecto. <strong>Explicación:</strong> ${respuestas[nombre].explicacion}`;
      feedback.className = 'feedback incorrecto';
    }
  }

  // Mostrar resultado final
  const resultado = document.getElementById('resultado-test');
  resultado.style.display = 'flex';

  if (puntaje === 5) {
    resultado.className = 'resultado-test resultado-excelente';
    resultado.innerHTML = '<span class="puntaje">5 / 5</span><span class="mensaje-resultado">¡Excelente! Dominas todos los conceptos.</span>';
  } else if (puntaje >= 3) {
    resultado.className = 'resultado-test resultado-bien';
    resultado.innerHTML = '<span class="puntaje"> ${puntaje} / 5 </span><span class="mensaje-resultado">¡Muy bien! Revisa la pregunta incorrecta.</span>';
  } else {
    resultado.className = 'resultado-test resultado-revisar';
    resultado.innerHTML = `<span class="puntaje">${puntaje} / 5 </span><span class="mensaje-resultado">Repasa los temas e inténtalo de nuevo. ¡Tú puedes!</span>`;
  }


  // Cambiar botones
  document.querySelector('.btn-evaluar').style.display = 'none';
  document.getElementById('btn-reintentar').style.display = 'inline-block';
}

// Reiniciar el test
function reiniciarTest() {
  for (let num = 1; num <= 5; num++) {
    const nombre = 'p' + num;

    document.querySelectorAll(`input[name="${nombre}"]`).forEach(i => {
      i.checked  = false;
      i.disabled = false;
    });

    document.getElementById('feedback-' + num).textContent = '';
    document.getElementById('feedback-' + num).className   = 'feedback';
    document.getElementById('pregunta-' + num).className   = 'pregunta';
  }

  const resultado = document.getElementById('resultado-test');
  resultado.style.display = 'none';
  resultado.className = 'resultado-test';

<<<<<<< Updated upstream
  document.querySelector('.btn-evaluar').style.display = 'inline-block';
  document.getElementById('btn-reintentar').style.display = 'none';


}
=======
  document.querySelector(".btn-evaluar").style.display = "inline-block";
  document.getElementById("btn-reintentar").style.display = "none";
}

// -------DATOS DEL SISTEMA-------
let materiasPrimas = [
  {
    id: 1,
    nombre: "Harina",
    unidad: "kg",
    cantidad: 1,
    precio: 2.0,
    merma: 5
  },
  {
    id: 2,
    nombre: "Huevos",
    unidad: "unidad",
    cantidad: 12,
    precio: 1.8,
    merma: 0,
  },
  {
    id: 3,
    nombre: "Leche",
    unidad: "litro",
    cantidad: 1,
    precio: 1.0,
    merma: 2,
  },
  { id: 4, nombre: "Azúcar", unidad: "kg", cantidad: 1, precio: 1.2, merma: 0 },
  {
    id: 5,
    nombre: "Mantequilla",
    unidad: "kg",
    cantidad: 1,
    precio: 4.5,
    merma: 3,
  },
];

let recetas = [
  {
    id: 1,
    nombre: "Pastel de chocolate",
    porciones: 8,
    tiempo: 45,
    ingredientes: [
      { idMateria: 1, cantidad: 0.5 },
      { idMateria: 2, cantidad: 4 },
      { idMateria: 3, cantidad: 0.25 },
      { idMateria: 4, cantidad: 0.3 },
      { idMateria: 5, cantidad: 0.1 },
    ],
  },
];

let configuracion = {
  costoHoraManoObra: 2.5,
  porcentajeIndirectos: 15,
  margenGanancia: 40
};

let proximoIdMateria = 6;
let proximoIdReceta = 2;

// -------SECCION MATERIA PRIMA-------

const guardarMateriaPrima = () => {
  const nombre = document.getElementById("mp-nombre").value.trim();
  const unidad = document.getElementById("mp-unidad").value;
  const cantidad = parseFloat(document.getElementById("mp-cantidad").value);
  const precio = parseFloat(document.getElementById("mp-precio").value);
  const merma = parseFloat(document.getElementById("mp-merma").value);

  if (!nombre || isNaN(cantidad) || isNaN(precio) || isNaN(merma)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  const nueva = {
    id: proximoIdMateria,
    nombre,
    unidad,
    cantidad,
    precio,
    merma
  }

  materiasPrimas.push(nueva)
  proximoIdMateria++

  document.getElementById("mp-nombre").value = "";
  document.getElementById("mp-cantidad").value = "";
  document.getElementById("mp-precio").value = "";
  document.getElementById("mp-merma").value = "";

  renderTablaMateriaPrima();
};

const eliminarMateriaPrima = (id) => {
  materiasPrimas = materiasPrimas.filter(mp => mp.id !== id)
  renderTablaMateriaPrima()
}

const renderTablaMateriaPrima = () => {
  const tbody = document.getElementById("tabla-materia-prima")

  if (materiasPrimas.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="7">No hay materias primas registradas.</td></tr>';
    return
  }

  tbody.innerHTML = materiasPrimas.map(mp => {
    const precioReal = mp.precio / (mp.cantidad * (1 - mp.merma / 100))
    
    return `
      <tr>
        <td>${mp.nombre}</td>
        <td>${mp.unidad}</td>
        <td>${mp.cantidad}</td>
        <td>$${mp.precio.toFixed(2)}</td>
        <td>${mp.merma}%</td>
        <td>$${precioReal.toFixed(4)}</td>
        <td>
          <button onclick="eliminarMateriaPrima(${mp.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }).join("");
}


// -------SECCION RECETAS-------
// ============================================
// SECCIÓN: RECETAS
// ============================================
 
// agregarIngrediente: agrega una nueva fila de ingrediente al formulario de recetas
function agregarIngrediente() {
  const lista = document.getElementById('lista-ingredientes');
 
  // Construir las opciones del select con las materias primas disponibles
  const opciones = materiasPrimas.map(mp =>
    `<option value="${mp.id}">${mp.nombre} (${mp.unidad})</option>`
  ).join('');
 
  // Crear la fila con un select de ingrediente, campo de cantidad y botón eliminar
  const fila = document.createElement('div');
  fila.className = 'fila-ingrediente';
  fila.innerHTML = `
    <select class="ing-materia">${opciones}</select>
    <input type="number" class="ing-cantidad" placeholder="Cantidad" min="0" step="0.01">
    <button type="button" onclick="this.parentElement.remove()">X</button>
  `;
 
  lista.appendChild(fila);
}
 
// guardarReceta: lee el formulario, valida y guarda la receta en el array
function guardarReceta() {
 
  // Leer datos generales de la receta
  const nombre    = document.getElementById('rec-nombre').value.trim();
  const porciones = parseInt(document.getElementById('rec-porciones').value);
  const tiempo    = parseInt(document.getElementById('rec-tiempo').value);
 
  // Validar datos generales
  if (!nombre || isNaN(porciones) || isNaN(tiempo)) {
    alert('Por favor completa el nombre, porciones y tiempo de la receta.');
    return;
  }
 
  // Leer las filas de ingredientes agregadas dinámicamente
  const filas = document.querySelectorAll('.fila-ingrediente');
 
  // Validar que haya al menos un ingrediente
  if (filas.length === 0) {
    alert('Agrega al menos un ingrediente a la receta.');
    return;
  }
 
  // Construir el array de ingredientes recorriendo cada fila
  const ingredientes = [];
  for (let fila of filas) {
    const idMateria = parseInt(fila.querySelector('.ing-materia').value);
    const cantidad  = parseFloat(fila.querySelector('.ing-cantidad').value);
 
    // Validar que la cantidad sea válida
    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Por favor ingresa cantidades válidas en todos los ingredientes.');
      return;
    }
 
    ingredientes.push({ idMateria, cantidad });
  }
 
  // Crear el objeto receta con todos los datos
  const nueva = {
    id: proximoIdReceta,
    nombre,
    porciones,
    tiempo,
    ingredientes
  };
 
  // Agregar al array y actualizar el próximo id
  recetas.push(nueva);
  proximoIdReceta++;
 
  // Limpiar el formulario
  document.getElementById('rec-nombre').value    = '';
  document.getElementById('rec-porciones').value = '';
  document.getElementById('rec-tiempo').value    = '';
  document.getElementById('lista-ingredientes').innerHTML = '';
 
  // Actualizar la tabla y el selector de recetas
  renderTablaRecetas();
  actualizarSelectorRecetas();
}
 
// eliminarReceta: elimina una receta del array por su id
function eliminarReceta(id) {
  recetas = recetas.filter(r => r.id !== id);
  renderTablaRecetas();
  actualizarSelectorRecetas();
}
 
// renderTablaRecetas: dibuja la tabla con todas las recetas registradas
function renderTablaRecetas() {
  const tbody = document.getElementById('tabla-recetas');
 
  if (recetas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No hay recetas registradas.</td></tr>';
    return;
  }
 
  tbody.innerHTML = recetas.map(rec => {
 
    // Construir el texto con los nombres de los ingredientes
    const nombresIngredientes = rec.ingredientes.map(ing => {
      // Buscar la materia prima que corresponde al id del ingrediente
      const mp = materiasPrimas.find(m => m.id === ing.idMateria);
      return mp ? `${mp.nombre} (${ing.cantidad} ${mp.unidad})` : 'Ingrediente eliminado';
    }).join(', ');
 
    return `
      <tr>
        <td>${rec.nombre}</td>
        <td>${rec.porciones}</td>
        <td>${rec.tiempo} min</td>
        <td>${nombresIngredientes}</td>
        <td>
          <button onclick="eliminarReceta(${rec.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');
}
 
// actualizarSelectorRecetas: llena el select de la sección Costo de Producción
function actualizarSelectorRecetas() {
  const select = document.getElementById('sel-receta');
 
  // Opción por defecto
  select.innerHTML = '<option value="">-- Selecciona una receta --</option>';
 
  // Agregar una opción por cada receta registrada
  recetas.forEach(rec => {
    select.innerHTML += `<option value="${rec.id}">${rec.nombre}</option>`;
  });
}
 
 
// ============================================
// SECCIÓN: CONFIGURACIÓN
// ============================================
 
// guardarConfiguracion: lee los campos y actualiza el objeto configuracion
function guardarConfiguracion() {
 
  const costoManoObra  = parseFloat(document.getElementById('conf-mano-obra').value);
  const porcentajeInd  = parseFloat(document.getElementById('conf-indirectos').value);
  const margenGanancia = parseFloat(document.getElementById('conf-margen').value);
 
  // Validar que los valores sean números válidos
  if (isNaN(costoManoObra) || isNaN(porcentajeInd) || isNaN(margenGanancia)) {
    alert('Por favor ingresa valores válidos en la configuración.');
    return;
  }
 
  // Actualizar el objeto de configuración
  configuracion.costoHoraManoObra    = costoManoObra;
  configuracion.porcentajeIndirectos = porcentajeInd;
  configuracion.margenGanancia = margenGanancia;

 
  // Mostrar mensaje de confirmación
  const msg = document.getElementById('msg-configuracion');
  msg.textContent = '✓ Configuración guardada correctamente.';
}
 
 
// ============================================
// SECCIÓN: COSTO DE PRODUCCIÓN
// ============================================
 
// calcularCosto: calcula el costo real de producción de la receta seleccionada
function calcularCosto() {
 
  const idSeleccionado = parseInt(document.getElementById('sel-receta').value);
 
  // Validar que se haya seleccionado una receta
  if (isNaN(idSeleccionado)) {
    alert('Por favor selecciona una receta.');
    return;
  }
 
  // Buscar la receta en el array
  const receta = recetas.find(r => r.id === idSeleccionado);
  if (!receta) {
    alert('Receta no encontrada.');
    return;
  }
 
  // --- PASO 1: Calcular el costo de cada ingrediente con merma ---
  let costoIngredientes = 0;
  let detalleIngredientes = '';
 
  receta.ingredientes.forEach(ing => {
 
    // Buscar la materia prima del ingrediente
    const mp = materiasPrimas.find(m => m.id === ing.idMateria);
    if (!mp) return;
 
    // Calcular el precio real por unidad considerando la merma
    // Ejemplo: si la merma es 10%, necesitamos un 10% más de ingrediente
    // Fórmula: precio / (cantidad * (1 - merma/100))
    const precioRealPorUnidad = mp.precio / (mp.cantidad * (1 - mp.merma / 100));
 
    // Costo de este ingrediente = precio real x unidad × cantidad usada en la receta
    const costoIngrediente = precioRealPorUnidad * ing.cantidad;
    costoIngredientes += costoIngrediente;
 
    // Guardar el detalle para mostrarlo en pantalla
    detalleIngredientes += `
      <tr>
        <td>${mp.nombre}</td>
        <td>${ing.cantidad} ${mp.unidad}</td>
        <td>${mp.merma}%</td>
        <td>$${costoIngrediente.toFixed(4)}</td>
      </tr>
    `;
  });
 
  // --- PASO 2: Calcular el costo de mano de obra ---
  // Fórmula: (tiempo en minutos / 60) × costo por hora
  const costoManoObra = (receta.tiempo / 60) * configuracion.costoHoraManoObra;
 
  // --- PASO 3: Calcular el subtotal (ingredientes + mano de obra) ---
  const subtotal = costoIngredientes + costoManoObra;
 
  // --- PASO 4: Calcular los costos indirectos sobre el subtotal ---
  // Fórmula: subtotal × (porcentaje / 100)
  const costosIndirectos = subtotal * (configuracion.porcentajeIndirectos / 100);
 
  // --- PASO 5: Calcular el costo total de la receta ---
  const costoTotal = subtotal + costosIndirectos;
 
  // --- PASO 6: Calcular el costo por porción ---
  const costoPorcion = costoTotal / receta.porciones;

  // -- paso 7: Calcular precio de venta ---
  const precioVenta = costoPorcion * (1 + configuracion.margenGanancia / 100);

  // --- Mostrar el desglose completo en pantalla ---
  const div = document.getElementById('resultado-costo');
  div.innerHTML = `
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
      <tbody>
        ${detalleIngredientes}
      </tbody>
    </table>
 
    <div class="resumen-costos">
      <p>Costo total ingredientes: <strong>$${costoIngredientes.toFixed(2)}</strong></p>
      <p>Mano de obra (${receta.tiempo} min a $${configuracion.costoHoraManoObra}/hora): <strong>$${costoManoObra.toFixed(2)}</strong></p>
      <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
      <p>Costos indirectos (${configuracion.porcentajeIndirectos}%): <strong>$${costosIndirectos.toFixed(2)}</strong></p>
      <hr>
      <p>Costo total de la receta: <strong>$${costoTotal.toFixed(2)}</strong></p>
      <p>Costo por porción (${receta.porciones} porciones): <strong>$${costoPorcion.toFixed(2)}</strong></p>
      <p>Margen aplicado (${configuracion.margenGanancia}%): <strong>$${precioVenta.toFixed(2)}</strong></p>
    </div>
  `;
}
 
 
// ============================================
// INICIALIZACIÓN
// ============================================
 
// Al cargar la página ejecutamos estas funciones para
// que las tablas y el selector arranquen con los datos quemados
 
renderTablaMateriaPrima();
renderTablaRecetas();
actualizarSelectorRecetas();
 
// Cargar los valores de configuración en el formulario
document.getElementById('conf-mano-obra').value  = configuracion.costoHoraManoObra;
document.getElementById('conf-indirectos').value = configuracion.porcentajeIndirectos;
document.getElementById('conf-margen').value = configuracion.margenGanancia;

>>>>>>> Stashed changes
