// ============================================
// test.js
// Funciones para el test de evaluación
// ============================================

// Respuestas correctas y explicaciones
const respuestas = {
  p1: {
    correcta: "b",
    explicacion:
      "La mano de obra representa el esfuerzo humano en la producción. No son las máquinas ni los materiales, sino las personas que trabajan para producir bienes o servicios.",
  },
  p2: {
    correcta: "b",
    explicacion:
      "El costeo de recetas calcula el costo total de los ingredientes. Es una herramienta muy usada en restaurantes y negocios de alimentos para fijar precios y controlar gastos.",
  },
  p3: {
    correcta: "b",
    explicacion:
      "El punto de equilibrio es el nivel de ventas donde los ingresos igualan a los costos. En ese punto no hay ganancias ni pérdidas; a partir de ahí comienza la utilidad.",
  },
  p4: {
    correcta: "c",
    explicacion:
      "La materia prima está formada por los materiales que se transforman o incorporan al producto final, siendo un componente fundamental del costo de producción.",
  },
  p5: {
    correcta: "b",
    explicacion:
      "Alquiler del local, debido a que es un gasto que siempre debe pagarse sin importar cuánto se produzca.",
  },
};

// evaluarTest: verifica respuestas y muestra resultado
const evaluarTest = (event) => {
  event.preventDefault();
  let todasRespondidas = true;
  let puntaje = 0;

  // Paso 1: verificar que todas estén respondidas
  for (let num = 1; num <= 5; num++) {
    const nombre = "p" + num;
    const seleccion = document.querySelector(`input[name="${nombre}"]:checked`);
    const feedback = document.getElementById("feedback-" + num);

    if (!seleccion) {
      feedback.textContent = "⚠ Por favor selecciona una respuesta.";
      feedback.className = "feedback advertencia";
      todasRespondidas = false;
    } else {
      feedback.textContent = "";
      feedback.className = "feedback";
    }
  }

  if (!todasRespondidas) return;

  // Paso 2: evaluar respuestas
  for (let num = 1; num <= 5; num++) {
    const pregunta = document.getElementById("pregunta-" + num);
    const nombre = "p" + num;
    const seleccion = document.querySelector(`input[name="${nombre}"]:checked`);
    const feedback = document.getElementById("feedback-" + num);

    // Bloquear opciones
    document
      .querySelectorAll(`input[name="${nombre}"]`)
      .forEach((i) => (i.disabled = true));

    if (seleccion.value === respuestas[nombre].correcta) {
      puntaje++;
      pregunta.classList.add("correcta");
      feedback.textContent = "✓ ¡Correcto!";
      feedback.className = "feedback correcto";
    } else {
      pregunta.classList.add("incorrecta");
      feedback.innerHTML = `✗ Incorrecto. <strong>Explicación:</strong> ${respuestas[nombre].explicacion}`;
      feedback.className = "feedback incorrecto";
    }
  }

  // Mostrar resultado final
  const resultado = document.getElementById("resultado-test");
  resultado.style.display = "flex";

  if (puntaje === 5) {
    resultado.className = "resultado-test resultado-excelente";
    resultado.innerHTML =
      '<span class="puntaje">5 / 5</span><span class="mensaje-resultado">¡Excelente! Dominas todos los conceptos.</span>';
  } else if (puntaje >= 3) {
    resultado.className = "resultado-test resultado-bien";
    resultado.innerHTML = `<span class="puntaje">${puntaje} / 5</span><span class="mensaje-resultado">¡Muy bien! Revisa las preguntas incorrectas.</span>`;
  } else {
    resultado.className = "resultado-test resultado-revisar";
    resultado.innerHTML = `<span class="puntaje">${puntaje} / 5</span><span class="mensaje-resultado">Repasa los temas e inténtalo de nuevo. ¡Tú puedes!</span>`;
  }

  document.querySelector(".btn-evaluar").style.display = "none";
  document.getElementById("btn-reintentar").style.display = "inline-block";
};

// reiniciarTest: limpia el test para volver a intentarlo
function reiniciarTest() {
  for (let num = 1; num <= 5; num++) {
    const nombre = "p" + num;

    document.querySelectorAll(`input[name="${nombre}"]`).forEach((i) => {
      i.checked = false;
      i.disabled = false;
    });

    document.getElementById("feedback-" + num).textContent = "";
    document.getElementById("feedback-" + num).className = "feedback";
    document.getElementById("pregunta-" + num).className = "pregunta";
  }

  const resultado = document.getElementById("resultado-test");
  resultado.style.display = "none";
  resultado.className = "resultado-test";

  document.querySelector(".btn-evaluar").style.display = "inline-block";
  document.getElementById("btn-reintentar").style.display = "none";
}
