import {useEffect} from 'react';

// Keep animation work outside React renders and stop it when it is off screen.
export function usePortfolioMotion(paused) {
 useEffect(() => {
  const root = document.documentElement;
  root.dataset.motion = paused ? 'paused' : 'running';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const progress = document.querySelector('.reading-progress');
  const sections = [...document.querySelectorAll('main > section[id]')];
  let frame = 0;
  const update = () => {
   frame = 0;
   const height = root.scrollHeight - innerHeight;
   progress.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, scrollY / height)) : 0})`;
   let active = 'home';
   for (const section of sections) if (section.getBoundingClientRect().top <= 180) active = section.id;
   document.querySelectorAll('.nav nav a').forEach(link => {
    if (link.hash === '#' + active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
   });
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  update();
  const observer = new IntersectionObserver(entries => entries.forEach(({target, isIntersecting}) => {
   target.classList.toggle('motion-in-view', isIntersecting);
  }), {threshold: 0});
  document.querySelectorAll('.hero-art,.marquee,.project-card').forEach(el => observer.observe(el));
  const cleanups = [...document.querySelectorAll('.project-visual')].map(el => {
   let pointerFrame = 0;
   const reset = () => {
    cancelAnimationFrame(pointerFrame);
    el.style.removeProperty('--tilt-x');
    el.style.removeProperty('--tilt-y');
   };
   const move = event => {
    if (paused || reduced.matches || !finePointer.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(pointerFrame);
    pointerFrame = requestAnimationFrame(() => {
     const box = el.getBoundingClientRect();
     el.style.setProperty('--tilt-x', `${(0.5 - (event.clientY - box.top) / box.height) * 7}deg`);
     el.style.setProperty('--tilt-y', `${((event.clientX - box.left) / box.width - 0.5) * 7}deg`);
    });
   };
   el.addEventListener('pointermove', move);
   el.addEventListener('pointerleave', reset);
   return () => { reset(); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', reset); };
  });
  return () => {
   cancelAnimationFrame(frame);
   observer.disconnect();
   window.removeEventListener('scroll', schedule);
   window.removeEventListener('resize', schedule);
   cleanups.forEach(cleanup => cleanup());
  };
 }, [paused]);
}
