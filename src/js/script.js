// Función para reproducir el sonido de una tecla
function reproducirSonido(nota) {
  const audioElement = document.getElementById('audio' + nota);
  audioElement.currentTime = 0;
  audioElement.play();
}

// Evento para tocar una tecla al hacer clic
document.querySelectorAll('#piano .key').forEach(function (tecla) {
  tecla.addEventListener('mousedown', function (event) {
    const nota = tecla.dataset.note;
    const esSostenida = event.shiftKey; // Verificar si se presionó "Shift"
    tecla.classList.add('pressed');
    reproducirSonido(nota + (esSostenida ? '#' : ''));
  });
  tecla.addEventListener('mouseup', function () {
    tecla.classList.remove('pressed');
  });
});

// Evento para tocar una tecla al presionar una tecla del teclado
document.addEventListener('keydown', (event) => {
  const teclaPulsada = event.key.toUpperCase();
  const teclaCorrespondiente = document.querySelector(`#piano .key[data-note="${teclaPulsada}"]`);
  if (teclaCorrespondiente) {
    const nota = teclaCorrespondiente.dataset.note;
    const esSostenida = event.shiftKey; // Verificar si se presionó "Shift"
    teclaCorrespondiente.classList.add('pressed');
    reproducirSonido(nota + (esSostenida ? '#' : ''));
  }
});

document.addEventListener('keyup', (event) => {
  const teclaPulsada = event.key.toUpperCase();
  const teclaCorrespondiente = document.querySelector(`#piano .key[data-note="${teclaPulsada}"]`);
  if (teclaCorrespondiente) {
    teclaCorrespondiente.classList.remove('pressed');
  }
});

// Cargar los sonidos al cargar la página
window.addEventListener('load', () => {
  const teclas = document.querySelectorAll('#piano .key');
  teclas.forEach(tecla => {
    const nota = tecla.dataset.note;
    const audioElement = new Audio('./notas_musicales/' + nota + '.wav');
    tecla.dataset.loaded = 'false';

    audioElement.addEventListener('canplaythrough', () => {
      tecla.dataset.loaded = 'true';
    });

    tecla.addEventListener('click', () => {
      if (tecla.dataset.loaded === 'true') {
        audioElement.currentTime = 0;
        audioElement.play();
      }
    });
  });
});

const teclasPiano = document.querySelectorAll('#piano .key');
const botonMostrarTeclas = document.getElementById('mostrarTeclas');

let teclasVisibles = false;

botonMostrarTeclas.addEventListener('click', function() {
  if (teclasVisibles) {
    teclasPiano.forEach(function(tecla) {
      tecla.querySelector('span').style.display = 'none';
    });
    teclasVisibles = false;
    botonMostrarTeclas.textContent = "Mostrar Teclas";
  } else {
    teclasPiano.forEach(function(tecla) {
      const nota = tecla.dataset.note;
      const teclaTexto = nota.charAt(0);
      tecla.querySelector('span').textContent = teclaTexto;
      tecla.querySelector('span').style.display = 'block';
    });
    teclasVisibles = true;
    botonMostrarTeclas.textContent = "Ocultar Teclas";
  }
});
