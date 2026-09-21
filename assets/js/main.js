document.addEventListener('DOMContentLoaded', () => {
  // Animação de reveal (Scroll Reveal Suave)
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  // Trigger na carga inicial e no scroll
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Fechar menu mobile ao clicar num link
  const navLinks = document.querySelectorAll('.nav-link');
  const navContainer = document.getElementById('navLinks');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth <= 768) {
        navContainer.classList.remove('active');
      }
    });
  });

  // Smooth scroll para links âncora já é lidado pelo CSS scroll-behavior: smooth
  // Apenas garantimos que offsets do header fixo sejam respeitados se necessário
});
