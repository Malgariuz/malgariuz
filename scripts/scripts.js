// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  // Obtén el botón de encendido/apagado
  const toggleButton = document.getElementById('toggle-theme');
  
  // Obtén los botones de idioma
  const langButtons = document.querySelectorAll('#lang-toggle');
  
  // Obtén los elementos de idioma
  const langElements = document.querySelectorAll('.lang');
  
  // Verifica si el tema guardado en localStorage es 'light-mode'
  if (localStorage.getItem('theme') === 'light-mode') {
    document.body.classList.add('light-mode');
    toggleButton.classList.add('light-mode');
  }
  
  // Agrega un evento de clic al botón de tema
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
  
  // Función para cambiar el idioma
  function changeLanguage(lang) {
    langElements.forEach(element => {
      if (element.getAttribute('data-lang') === lang) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  }
  
  // Agrega un evento de clic a los botones de idioma
  langButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const selectedLang = button.getAttribute('data-lang');
      changeLanguage(selectedLang);
    });
  });
  
  // Establece el idioma por defecto
  changeLanguage('en');
});
