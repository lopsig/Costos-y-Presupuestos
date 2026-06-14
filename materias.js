// ============================================
// materias.js
// Funciones para el registro de materia prima
// ============================================

let idEditando = null;

function guardarMateriaPrima() {
  const nombre = document.getElementById("mp-nombre").value.trim();
  const unidad = document.getElementById("mp-unidad").value;
  const cantidad = parseFloat(document.getElementById("mp-cantidad").value);
  const precio = parseFloat(document.getElementById("mp-precio").value);
  const merma = parseFloat(document.getElementById("mp-merma").value);

  if (!nombre || isNaN(cantidad) || isNaN(precio) || isNaN(merma)) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  if (idEditando !== null) {
    // Modo edición: actualizar el elemento existente
    const indice = materiasPrimas.findIndex((mp) => mp.id === idEditando);
    materiasPrimas[indice] = {
      id: idEditando,
      nombre,
      unidad,
      cantidad,
      precio,
      merma,
    };
    idEditando = null;
    document.querySelector(".btn-guardar").textContent =
      "Agregar Materia Prima";
  } else {
    // Modo creación: agregar nuevo elemento
    materiasPrimas.push({
      id: proximoIdMateria,
      nombre,
      unidad,
      cantidad,
      precio,
      merma,
    });
    proximoIdMateria++;
  }

  // Sincronizar con localStorage para que persista entre páginas
  localStorage.setItem("materiasPrimas", JSON.stringify(materiasPrimas));

  limpiarFormulario();
  renderTablaMateriaPrima();
}

function editarMateriaPrima(id) {
  const mp = materiasPrimas.find((mp) => mp.id === id);
  if (!mp) return;

  document.getElementById("mp-nombre").value = mp.nombre;
  document.getElementById("mp-unidad").value = mp.unidad;
  document.getElementById("mp-cantidad").value = mp.cantidad;
  document.getElementById("mp-precio").value = mp.precio;
  document.getElementById("mp-merma").value = mp.merma;

  idEditando = id;
  document.querySelector(".btn-guardar").textContent =
    "Actualizar Materia Prima";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarMateriaPrima(id) {
  materiasPrimas = materiasPrimas.filter((mp) => mp.id !== id);

  // Sincronizar con localStorage
  localStorage.setItem("materiasPrimas", JSON.stringify(materiasPrimas));

  renderTablaMateriaPrima();
}

function limpiarFormulario() {
  document.getElementById("mp-nombre").value = "";
  document.getElementById("mp-cantidad").value = "";
  document.getElementById("mp-precio").value = "";
  document.getElementById("mp-merma").value = "";
}

function renderTablaMateriaPrima() {
  const tbody = document.getElementById("tabla-materia-prima");

  if (materiasPrimas.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="7">No hay materias primas registradas.</td></tr>';
    return;
  }

  tbody.innerHTML = materiasPrimas
    .map((mp) => {
      const precioReal = mp.precio / (mp.cantidad * (1 - mp.merma / 100));
      return `
      <tr>
        <td>${mp.nombre}</td>
        <td>${mp.unidad}</td>
        <td>${mp.cantidad}</td>
        <td>$${mp.precio.toFixed(2)}</td>
        <td>${mp.merma}%</td>
        <td>$${precioReal.toFixed(4)}</td>
        <td>
          <button onclick="editarMateriaPrima(${mp.id})">Editar</button>
          <button onclick="eliminarMateriaPrima(${mp.id})">Eliminar</button>
        </td>
      </tr>
    `;
    })
    .join("");
}

renderTablaMateriaPrima();
