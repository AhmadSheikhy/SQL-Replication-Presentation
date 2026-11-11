
const title=document.getElementById('navTitle');
const defaultTitle = title.textContent;
const sections = [...document.querySelectorAll('section[id]')];
const TOPZONE=20;
const OFFSET = 100;

let fadeTimer;
let pendingText = title.textContent;

function setTitle(text) {
  if (pendingText === text) return;   // already heading there — don't restart
  pendingText = text;
  title.classList.add('fading');
  clearTimeout(fadeTimer);            // new change arrived → restart the fade
  fadeTimer = setTimeout(() => {
    title.textContent = pendingText;
    title.classList.remove('fading');
  }, 250);                            // must match the CSS transition duration
}

function updateTitle() {
  let current = null;
  if (scrollY>TOPZONE) {
    for (const s of sections) {
    if (s.getBoundingClientRect().top <= OFFSET) current = s;
    else break;
  }
  }

  
  const text = current
    ? (current.dataset.title || current.querySelector('h2')?.textContent || defaultTitle)
    : defaultTitle;

  setTitle(text);
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

document.addEventListener('DOMContentLoaded', () => {
    const links = [...document.querySelectorAll('.link')];
    window.addEventListener('scroll', () => {
        let current = null;
    for (const s of sections)
    {
      if (s.getBoundingClientRect().top <= OFFSET) current = s;
      else break;
    }
      for (const link of links) {
      if (current.dataset.title==link.dataset.title)
      { 
           link.classList.add('scrolled');
      } else {
            link.classList.remove('scrolled');
      }
    }
    });
});
