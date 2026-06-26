// ============================================
// materias.js
// Funciones para el registro de materia prima
// ============================================

let idEditando = null;

function guardarCliente() {
  const cedula = document.getElementById("cliente-cedula").value.trim();
  const nombre = document.getElementById("cliente-nombre").value;
  const apellido = document.getElementById("cliente-apellido").value;
  const correo = document.getElementById("cliente-correo").value;
  const celular = document.getElementById("cliente-celular").value;

  if (!cedula || !nombre || !apellido || !correo || !celular) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  if (idEditando !== null) {
    // Modo edición: actualizar el elemento existente
    const indice = clientes.findIndex((cli) => cli.id === idEditando);
    clientes[indice] = {
      id: idEditando,
      cedula,
      nombre,
      apellido,
      correo,
      celular,
    };
    idEditando = null;
    document.querySelector(".btn-guardar").textContent =
      "Guardar Cliente";
  } else {
    // Modo creación: agregar nuevo elemento
    clientes.push({
      id: proximoIdClientes,
      cedula,
      nombre,
      apellido,
      correo,
      celular,
    });
    proximoIdClientes++;
  }

  // Sincronizar con localStorage para que persista entre páginas
  localStorage.setItem("clientes", JSON.stringify(clientes));

  limpiarFormulario();
  renderTablaClientes();
}

function editarCliente(id) {
  const cli = clientes.find((cli) => cli.id === id);
  if (!cli) return;

  document.getElementById("cliente-cedula").value = cli.cedula;
  document.getElementById("cliente-nombre").value = cli.nombre;
  document.getElementById("cliente-apellido").value = cli.apellido;
  document.getElementById("cliente-correo").value = cli.correo;
  document.getElementById("cliente-celular").value = cli.celular;

  idEditando = id;
  document.querySelector(".btn-guardar").textContent =
    "Actualizar Cliente";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarCliente(id) {
  clientes = clientes.filter((cli) => cli.id !== id);

  // Sincronizar con localStorage
  localStorage.setItem("clientes", JSON.stringify(clientes));

  renderTablaClientes();
}

function limpiarFormulario() {
  document.getElementById("cliente-cedula").value = "";
  document.getElementById("cliente-nombre").value = "";
  document.getElementById("cliente-apellido").value = "";
  document.getElementById("cliente-correo").value = "";
  document.getElementById("cliente-celular").value = "";
}

function renderTablaClientes() {
  const tbody = document.getElementById("tabla-clientes");

  if (clientes.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6">No clientes registrados.</td></tr>';
    return;
  }

  tbody.innerHTML = clientes
    .map((cli) => {
      return `
      <tr>
        <td>${cli.cedula}</td>
        <td>${cli.nombre}</td>
        <td>${cli.apellido}</td>
        <td>${cli.correo}</td>
        <td>${cli.celular}</td>
        <td>
          <button onclick="editarCliente(${cli.id})">Editar</button>
          <button onclick="eliminarCliente(${cli.id})">Eliminar</button>
        </td>
      </tr>
    `;
    })
    .join("");
}

renderTablaClientes();
