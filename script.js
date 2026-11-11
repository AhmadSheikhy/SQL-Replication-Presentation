
const title=document.getElementById('navTitle');
const defaultTitle = title.textContent;
const sections = [...document.querySelectorAll('section[id]')];
const OFFSET = 20;

function updateTitle() {
  let current = null;
  for (const s of sections) {
    if (s.getBoundingClientRect().top <= OFFSET) current = s;
    else break;
  }
  const text = current
    ? (current.dataset.title || current.querySelector('h2')?.textContent || defaultTitle)
    : defaultTitle;

  if (title.textContent !== text) title.textContent = text;
}

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { updateTitle(); ticking = false; });
}, { passive: true });

addEventListener('resize', updateTitle);
updateTitle();


document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});
