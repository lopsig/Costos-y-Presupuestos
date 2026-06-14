// ============================================
// datos.js
// Variables compartidas entre todas las páginas
// Se leen desde localStorage si ya existen,
// si no, se usan los datos quemados por defecto
// ============================================

// Datos quemados de materias primas (se usan solo la primera vez)
const materiasPrimasDefault = [
  { id: 1, nombre: "Harina", unidad: "kg", cantidad: 1, precio: 2.0, merma: 5 },
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

// Datos quemados de recetas (se usan solo la primera vez)
const recetasDefault = [
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

// Configuración por defecto (se usa solo la primera vez)
const configuracionDefault = {
  costoHoraManoObra: 2.5,
  porcentajeIndirectos: 15,
  margenGanancia: 40,
};

// ── Leer desde localStorage o usar los datos por defecto ──

// Si localStorage tiene datos los usa, si no usa los quemados
let materiasPrimas = localStorage.getItem("materiasPrimas")
  ? JSON.parse(localStorage.getItem("materiasPrimas"))
  : materiasPrimasDefault;

let recetas = localStorage.getItem("recetas")
  ? JSON.parse(localStorage.getItem("recetas"))
  : recetasDefault;

let configuracion = localStorage.getItem("configuracion")
  ? JSON.parse(localStorage.getItem("configuracion"))
  : configuracionDefault;

// ── Contadores de id ──
// Se calculan automáticamente buscando el id más alto existente
// para que nunca se repitan aunque se recargue la página
let proximoIdMateria =
  materiasPrimas.reduce((max, mp) => Math.max(max, mp.id), 0) + 1;
let proximoIdReceta = recetas.reduce((max, r) => Math.max(max, r.id), 0) + 1;
