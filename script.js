document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > nav.offsetTop) {
      nav.classList.add('scrolled-nav');
    } else {
      nav.classList.remove('scrolled-nav');
    }
  });
});
