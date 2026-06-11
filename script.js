const scene = document.getElementById('scene');
const card = document.getElementById('interactiveCard');
let sceneZ = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

window.addEventListener('mousemove', (event) => {
  const x = (event.clientX / window.innerWidth) * 2 - 1;
  const y = (event.clientY / window.innerHeight) * 2 - 1;
  const rotateY = x * 24;
  const rotateX = y * 18;

  scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${sceneZ}px)`;
  card.style.transform = `rotateX(${rotateX * 0.6}deg) rotateY(${rotateY * 0.8}deg)`;
});

window.addEventListener('scroll', () => {
  sceneZ = clamp(window.scrollY * 0.05, 0, 38);
  const current = scene.style.transform || '';
  const updated = current.replace(/translateZ\([^)]*\)/, '');
  scene.style.transform = `${updated.trim()} translateZ(${sceneZ}px)`;
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((cardElement) => {
  cardElement.addEventListener('mousemove', (event) => {
    const rect = cardElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    cardElement.style.transform = `perspective(1000px) rotateX(${y * 10}deg) rotateY(${x * 10}deg) translateY(-6px)`;
  });

  cardElement.addEventListener('mouseleave', () => {
    cardElement.style.transform = '';
  });
});

const sections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  },
  { threshold: 0.18 }
);
sections.forEach((section) => revealObserver.observe(section));

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
