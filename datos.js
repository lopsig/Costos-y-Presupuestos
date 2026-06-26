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

  {
    id: 6,
    nombre: "Zanahoria",
    unidad: "kg",
    cantidad: 1,
    precio: 0.8,
    merma: 15,
  }, // 15% de merma por la cáscara y puntas
  {
    id: 7,
    nombre: "Aceite Vegetal",
    unidad: "litro",
    cantidad: 1,
    precio: 2.2,
    merma: 0,
  },
  {
    id: 8,
    nombre: "Nueces",
    unidad: "kg",
    cantidad: 0.5,
    precio: 5.0,
    merma: 2,
  },
  {
    id: 9,
    nombre: "Polvo de hornear",
    unidad: "kg",
    cantidad: 0.25,
    precio: 1.1,
    merma: 0,
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
  {
    id: 2,
    nombre: "Pastel de Zanahoria",
    porciones: 10, // Rinde para 10 porciones
    tiempo: 60, // 60 minutos de preparación y horneado
    ingredientes: [
      { idMateria: 1, cantidad: 0.3 }, // 300g de Harina (ID 1)
      { idMateria: 4, cantidad: 0.2 }, // 200g de Azúcar (ID 4)
      { idMateria: 2, cantidad: 4 }, // 4 Huevos (ID 2)
      { idMateria: 7, cantidad: 0.2 }, // 200ml de Aceite Vegetal (ID 7)
      { idMateria: 6, cantidad: 0.35 }, // 350g de Zanahoria rallada (ID 6)
      { idMateria: 8, cantidad: 0.08 }, // 80g de Nueces picadas (ID 8)
      { idMateria: 9, cantidad: 0.015 }, // 15g de Polvo de hornear (ID 9)
    ],
  },
];
// Configuración por defecto (se usa solo la primera vez)
const configuracionDefault = {
  costoHoraManoObra: 2.5,
  porcentajeIndirectos: 15,
  margenGanancia: 40,
};

// 
const clientesDefault = [
  {
    id: 1,
    cedula: "1721476818",
    nombre: "Jonathan",
    apellido: "López",
    correo: "jonathan@correo.com",
    celular: "0963355296",
  },
  {
    id: 2,
    cedula: "1721746818",
    nombre: "Angelith",
    apellido: "López",
    correo: "angelith@correo.com",
    celular: "0998989898",
  },
  {
    id: 3,
    cedula: "1705858585",
    nombre: "Wladimir",
    apellido: "López",
    correo: "wladdy@correo.com",
    celular: "0979797979",
  },
];

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
  
let clientes = localStorage.getItem("clientes")
  ? JSON.parse(localStorage.getItem("clientes"))
  : clientesDefault;


// ── Contadores de id ──
// Se calculan automáticamente buscando el id más alto existente
// para que nunca se repitan aunque se recargue la página
let proximoIdMateria =
  materiasPrimas.reduce((max, mp) => Math.max(max, mp.id), 0) + 1;
let proximoIdReceta = recetas.reduce((max, r) => Math.max(max, r.id), 0) + 1;
let proximoIdClientes = clientes.reduce((max, r) => Math.max(max, r.id), 0) + 1;
