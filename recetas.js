// ============================================
// recetas.js
// Funciones para el registro de recetas
// ============================================

// Variable para saber si estamos editando o creando
// null = modo creación, número = id de la receta que se edita
let idRecetaEditando = null;

// agregarIngrediente: agrega una fila dinámica al formulario
function agregarIngrediente() {
  const lista = document.getElementById("lista-ingredientes");

  const opciones = materiasPrimas
    .map(
      (mp) => `<option value="${mp.id}">${mp.nombre} (${mp.unidad})</option>`,
    )
    .join("");

  const fila = document.createElement("div");
  fila.className = "fila-ingrediente";
  fila.innerHTML = `
    <select class="ing-materia">${opciones}</select>
    <input type="number" class="ing-cantidad" placeholder="Cantidad" min="0" step="0.01">
    <button type="button" onclick="this.parentElement.remove()">X</button>
  `;

  lista.appendChild(fila);
}

// editarReceta: carga los datos de la receta en el formulario para editarla
function editarReceta(id) {
  // Buscar la receta por su id
  const receta = recetas.find((r) => r.id === id);
  if (!receta) return;

  // Cargar los datos generales en el formulario
  document.getElementById("rec-nombre").value = receta.nombre;
  document.getElementById("rec-porciones").value = receta.porciones;
  document.getElementById("rec-tiempo").value = receta.tiempo;

  // Limpiar la lista de ingredientes actual
  const lista = document.getElementById("lista-ingredientes");
  lista.innerHTML = "";

  // Recrear una fila por cada ingrediente de la receta
  receta.ingredientes.forEach((ing) => {
    // Construir las opciones del select
    const opciones = materiasPrimas
      .map(
        (mp) =>
          // Si el id coincide con el ingrediente, marcarlo como selected
          `<option value="${mp.id}" ${mp.id === ing.idMateria ? "selected" : ""}>
        ${mp.nombre} (${mp.unidad})
      </option>`,
      )
      .join("");

    // Crear la fila con el ingrediente y cantidad correctos
    const fila = document.createElement("div");
    fila.className = "fila-ingrediente";
    fila.innerHTML = `
      <select class="ing-materia">${opciones}</select>
      <input type="number" class="ing-cantidad" value="${ing.cantidad}" min="0" step="0.01">
      <button type="button" onclick="this.parentElement.remove()">X</button>
    `;

    lista.appendChild(fila);
  });

  // Activar el modo edición guardando el id
  idRecetaEditando = id;

  // Cambiar el texto del botón
  document.querySelector(".btn-guardar-receta").textContent =
    "Actualizar Receta";

  // Scroll al inicio para que el usuario vea el formulario
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// guardarReceta: guarda o actualiza una receta según el modo activo
function guardarReceta() {
  const nombre = document.getElementById("rec-nombre").value.trim();
  const porciones = parseInt(document.getElementById("rec-porciones").value);
  const tiempo = parseInt(document.getElementById("rec-tiempo").value);

  if (!nombre || isNaN(porciones) || isNaN(tiempo)) {
    alert("Por favor completa el nombre, porciones y tiempo de la receta.");
    return;
  }

  const filas = document.querySelectorAll(".fila-ingrediente");

  if (filas.length === 0) {
    alert("Agrega al menos un ingrediente a la receta.");
    return;
  }

  // Construir el array de ingredientes recorriendo las filas
  const ingredientes = [];
  for (let fila of filas) {
    const idMateria = parseInt(fila.querySelector(".ing-materia").value);
    const cantidad = parseFloat(fila.querySelector(".ing-cantidad").value);

    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor ingresa cantidades válidas en todos los ingredientes.");
      return;
    }

    ingredientes.push({ idMateria, cantidad });
  }

  if (idRecetaEditando !== null) {
    // Modo edición: actualizar la receta existente
    const indice = recetas.findIndex((r) => r.id === idRecetaEditando);
    recetas[indice] = {
      id: idRecetaEditando,
      nombre,
      porciones,
      tiempo,
      ingredientes,
    };

    // Restaurar el modo creación
    idRecetaEditando = null;
    document.querySelector(".btn-guardar-receta").textContent =
      "Guardar Receta";
  } else {
    // Modo creación: agregar nueva receta
    recetas.push({
      id: proximoIdReceta,
      nombre,
      porciones,
      tiempo,
      ingredientes,
    });
    proximoIdReceta++;
  }

  // Sincronizar con localStorage
  localStorage.setItem("recetas", JSON.stringify(recetas));

  // Limpiar el formulario
  document.getElementById("rec-nombre").value = "";
  document.getElementById("rec-porciones").value = "";
  document.getElementById("rec-tiempo").value = "";
  document.getElementById("lista-ingredientes").innerHTML = "";

  renderTablaRecetas();
}

// eliminarReceta: elimina una receta del array por su id
function eliminarReceta(id) {
  recetas = recetas.filter((r) => r.id !== id);
  localStorage.setItem("recetas", JSON.stringify(recetas));
  renderTablaRecetas();
}

// renderTablaRecetas: dibuja la tabla con todas las recetas registradas
function renderTablaRecetas() {
  const tbody = document.getElementById("tabla-recetas");

  if (recetas.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6">No hay recetas registradas.</td></tr>';
    return;
  }

  tbody.innerHTML = recetas
    .map((rec) => {
      const nombresIngredientes = rec.ingredientes
        .map((ing) => {
          const mp = materiasPrimas.find((m) => m.id === ing.idMateria);
          return mp
            ? `${mp.nombre} (${ing.cantidad} ${mp.unidad})`
            : "Ingrediente eliminado";
        })
        .join(", ");

      return `
      <tr>
        <td>${rec.nombre}</td>
        <td>${rec.porciones}</td>
        <td>${rec.tiempo} min</td>
        <td>${nombresIngredientes}</td>
        <td>
          <button onclick="editarReceta(${rec.id})">Editar</button>
          <button onclick="eliminarReceta(${rec.id})">Eliminar</button>
        </td>
      </tr>
    `;
    })
    .join("");
}

renderTablaRecetas();
