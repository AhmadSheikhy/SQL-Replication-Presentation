
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
  requestAnimationFrame(() => { updateTitle(); updateProgress(); ticking = false; });
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



const toggle = document.querySelector('.nav-toggle');
const toc    = document.getElementById('content-list');

function setOpen(open) {
  toc.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';  // stop background scroll
}

toggle.addEventListener('click', () => {
  setOpen(!toc.classList.contains('open'));
});

/* Close after tapping a link (the jump still happens) */
toc.addEventListener('click', (e) => {
  if (e.target.closest('.link')) setOpen(false);
});

/* Close on Escape — keyboard users need this */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setOpen(false);
});

/* If the window grows past the breakpoint while open, reset */
window.addEventListener('resize', () => {
  if (innerWidth > 700) setOpen(false);
});



const progress = document.getElementById('scrollProgress');

function updateProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;   // total scrollable distance
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = Math.min(pct, 100) + '%';
}
