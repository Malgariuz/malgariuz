AOS.init({
  duration: 1000,
  offset: 200,
  once: false
});

document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  const scrollArrow = document.querySelector('.scroll-arrow');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  function updateHeaderVisibility() {
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollPosition >= heroHeight) {
      header.classList.add('visible');
    } else {
      header.classList.remove('visible');
    }

    if (scrollPosition > 100) {
      scrollArrow.style.opacity = '0';
      scrollArrow.style.pointerEvents = 'none';
    } else {
      scrollArrow.style.opacity = '1';
      scrollArrow.style.pointerEvents = 'auto';
    }
  }

  //scrollspy
  function updateActiveSection() {
    const sections = ['inicio', 'about-me', 'skills', 'services', 'projects', 'contact'];
    const navLinks = document.querySelectorAll('.nav-links a');

    let currentSection = '';

    sections.forEach(section => {
      const element = document.getElementById(section);
      const rect = element.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateHeaderVisibility();
    updateActiveSection();
    AOS.refresh();
  });
  
  window.addEventListener('resize', updateHeaderVisibility);
  updateHeaderVisibility();

  scrollArrow.addEventListener('click', function() {
    document.querySelector('#about-me').scrollIntoView({
      behavior: 'smooth'
    });
  });

  const projectItems = document.querySelectorAll('.project-item');
  const projectDetailsPopup = document.querySelector('.project-details-popup');
  const projectDetailsContent = projectDetailsPopup.querySelector('.project-details-content');
  const closePopupBtn = projectDetailsPopup.querySelector('.close-popup-btn');

  projectItems.forEach(item => {
    item.addEventListener('click', function() {
      const projectDetails = this.querySelector('.project-details');
      const title = projectDetails.querySelector('h4').textContent;
      const description = projectDetails.querySelector('p').textContent;
      const listItems = projectDetails.querySelectorAll('li');

      projectDetailsContent.querySelector('h4').textContent = title;
      projectDetailsContent.querySelector('p').textContent = description;
      const ul = projectDetailsContent.querySelector('ul');
      ul.innerHTML = '';
      listItems.forEach(li => {
        ul.appendChild(li.cloneNode(true));
      });

      projectDetailsPopup.classList.add('show');
    });
  });

  closePopupBtn.addEventListener('click', function() {
    projectDetailsPopup.classList.remove('show');
  });

  projectDetailsPopup.addEventListener('click', function(e) {
    if (e.target === projectDetailsPopup) {
      projectDetailsPopup.classList.remove('show');
    }
  });

  themeToggle.addEventListener('click', function() {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkills() {
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      const skill = bar.getAttribute('data-skill');
      bar.style.width = percentage + '%';
      bar.querySelector('.skill-percentage').textContent = percentage + '%';
    });
  }

  const skillsSection = document.getElementById('skills');
  const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateSkills();
      skillsObserver.unobserve(skillsSection);
    }
  }, { threshold: 0.5 });

  skillsObserver.observe(skillsSection);

  const serviceItems = document.querySelectorAll('.service-item');
  const contactSection = document.getElementById('contact');

  serviceItems.forEach(item => {
    const requestBtn = item.querySelector('.service-request-btn');
    requestBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
});