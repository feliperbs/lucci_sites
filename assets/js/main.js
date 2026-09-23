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

  const track = document.getElementById('modelosTrack');
  const carousel = document.getElementById('modelosCarousel');
  const dotsWrap = document.getElementById('modelosDots');
  const prevBtn = document.getElementById('modelosPrev');
  const nextBtn = document.getElementById('modelosNext');

  if (!track || !carousel || !dotsWrap || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let dots = [];
  let scrollTimer;

  const getVisibleCount = () => window.innerWidth >= 1024 ? 3 : window.innerWidth >= 576 ? 2 : 1;
  const getStep = () => slides.length > 1
    ? Math.max(1, slides[1].getBoundingClientRect().left - slides[0].getBoundingClientRect().left)
    : slides[0].getBoundingClientRect().width;
  const getPageCount = () => Math.max(1, Math.ceil(slides.length / getVisibleCount()));
  const getCurrentPage = () => Math.min(
    getPageCount() - 1,
    Math.max(0, Math.floor(Math.round(carousel.scrollLeft / getStep()) / getVisibleCount()))
  );

  const scrollToPage = (page) => {
    const targetIndex = Math.min(slides.length - 1, page * getVisibleCount());
    slides[targetIndex].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  const updateControls = () => {
    const page = getCurrentPage();
    const pageCount = getPageCount();
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === page);
      dot.setAttribute('aria-current', index === page ? 'true' : 'false');
    });
    prevBtn.disabled = page === 0;
    nextBtn.disabled = page === pageCount - 1;
    carousel.setAttribute('aria-label', `Modelos de sites, página ${page + 1} de ${pageCount}`);
  };

  const renderDots = () => {
    dotsWrap.innerHTML = '';
    for (let page = 0; page < getPageCount(); page += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'agency-carousel-dot';
      dot.setAttribute('aria-label', `Ir para página ${page + 1}`);
      dot.addEventListener('click', () => scrollToPage(page));
      dotsWrap.appendChild(dot);
    }
    dots = Array.from(dotsWrap.children);
    updateControls();
  };

  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(updateControls, 80);
  }, { passive: true });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') scrollToPage(Math.max(0, getCurrentPage() - 1));
    if (event.key === 'ArrowRight') scrollToPage(Math.min(getPageCount() - 1, getCurrentPage() + 1));
  });
  prevBtn.addEventListener('click', () => scrollToPage(Math.max(0, getCurrentPage() - 1)));
  nextBtn.addEventListener('click', () => scrollToPage(Math.min(getPageCount() - 1, getCurrentPage() + 1)));
  window.addEventListener('resize', renderDots);

  renderDots();
});
