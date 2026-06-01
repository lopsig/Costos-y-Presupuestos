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
    correcta: 'b',
    explicacion: 'Los costos fijos se mantienen constantes sin importar si la empresa produce mucho o poco, como el alquiler o los sueldos administrativos.'
  },
  p5: {
    correcta: 'c',
    explicacion: 'La materia prima es un costo directo porque se puede asignar fácilmente a un producto específico. El alquiler y los sueldos administrativos son costos indirectos.'
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
    resultado.innerHTML = `<span class="puntaje">${puntaje} / 5</span><span class="mensaje-resultado">¡Muy bien! Revisa las preguntas incorrectas.</span>`;
  } else {
    resultado.className = 'resultado-test resultado-revisar';
    resultado.innerHTML = `<span class="puntaje">${puntaje} / 5</span><span class="mensaje-resultado">Repasa los temas e inténtalo de nuevo. ¡Tú puedes!</span>`;
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

  document.querySelector('.btn-evaluar').style.display = 'inline-block';
  document.getElementById('btn-reintentar').style.display = 'none';


}