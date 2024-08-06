// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Obtén el botón de encendido/apagado
  const toggleButton = document.getElementById('toggle-theme');

  // Verifica si el tema guardado en localStorage es 'light-mode'
  if (localStorage.getItem('theme') === 'light-mode') {
    document.body.classList.add('light-mode');
    toggleButton.classList.add('light-mode');
  }

  // Agrega un evento de clic al botón
  toggleButton.addEventListener('click', function () {
    // Alterna la clase 'light-mode' en el body
    document.body.classList.toggle('light-mode');
    // Alterna la clase 'light-mode' en el botón
    toggleButton.classList.toggle('light-mode');
    // Alterna la clase 'clicked' para el movimiento vertical
    toggleButton.classList.toggle('clicked');

    // Guarda el estado del tema en localStorage
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light-mode');
    } else {
      localStorage.setItem('theme', 'dark-mode');
    }
  });
});
