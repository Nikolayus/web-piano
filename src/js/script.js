// Función para reproducir el sonido de una tecla
function reproducirSonido(nota) {
    const audioElement = document.getElementById('audio' + nota);
    audioElement.currentTime = 0;
    audioElement.play();
  }
  
  // Evento para tocar una tecla al hacer clic
  document.querySelectorAll('#piano .key').forEach(function (tecla) {
          tecla.addEventListener('mousedown', function () {
                  const nota = tecla.dataset.note;
                  tecla.classList.add('pressed');
                  reproducirSonido(nota);
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
      teclaCorrespondiente.classList.add('pressed');
      reproducirSonido(nota);
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
      const audioElement = new Audio(nota + '_note.mp3');
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
  