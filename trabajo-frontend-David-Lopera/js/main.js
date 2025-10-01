let estudiantes = [];
const registrosPorPagina = 5;
let paginaActual = 1;
let totalRegistros = 0;
let filaParaEliminar = null;

document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos desde JSON
  fetch("Assets/data/estudiantes.json")
    .then(res => res.json())
    .then(data => {
      estudiantes = data;
      totalRegistros = estudiantes.length;
      mostrarPagina(1);
    });

  // Botón de nuevo registro
  const btnNuevo = document.querySelector(".section-header button");
  const modal = document.getElementById("modalNuevoRegistro");

  btnNuevo.addEventListener("click", () => {
    modal.style.display = "flex";
  });
});

function mostrarPagina(pagina) {
  const tbody = document.querySelector("#Estudiantes tbody");
  tbody.innerHTML = ""; // Limpiar tabla

  const inicio = (pagina - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;
  const estudiantesPagina = estudiantes.slice(inicio, fin);

  estudiantesPagina.forEach(est => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${est.codigo}</td>
      <td>${est.identificacion}</td>
      <td>${est.nombre}</td>
      <td>${est.grado}</td>
      <td>${est.grupo}</td>
      <td>${est.estado}</td>
    `;

    // Celda de acciones
    const tdAcciones = document.createElement("td");

    const btnVer = document.createElement("button");
    btnVer.classList.add("btn-icon", "ver");
    btnVer.innerHTML = `<i class="bi bi-search"></i>`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-icon", "eliminar");
    btnEliminar.innerHTML = `<i class="bi bi-trash"></i>`;

    tdAcciones.appendChild(btnVer);
    tdAcciones.appendChild(btnEliminar);
    fila.appendChild(tdAcciones);

    // Evento para abrir el modal de eliminación
    btnEliminar.addEventListener("click", () => {
      abrirModalEliminar(est.nombre, fila);
    });

    tbody.appendChild(fila);
  });

  // Actualizar rango
  const rangoInicio = inicio + 1;
  const rangoFin = Math.min(fin, estudiantes.length);
  document.getElementById("rango").textContent = `${rangoInicio} a ${rangoFin}`;
  document.getElementById("total").textContent = estudiantes.length;
  paginaActual = pagina;
}

// Modal de nuevo registro
function cerrarModalRegistro() {
  document.getElementById("modalNuevoRegistro").style.display = "none";
}

// Modal de eliminación
function abrirModalEliminar(nombre, fila) {
  document.getElementById("nombreEstudiante").textContent = nombre;
  document.getElementById("modalEliminar").style.display = "flex";
  filaParaEliminar = fila;
}

function cerrarModalEliminar() {
  document.getElementById("modalEliminar").style.display = "none";
  filaParaEliminar = null;
}

function confirmarEliminacion() {
  if (filaParaEliminar) {
    filaParaEliminar.remove();
    filaParaEliminar = null;
  }
  cerrarModalEliminar();
}