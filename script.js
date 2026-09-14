import { animate, stagger, splitText, createDraggable } from 'https://esm.sh/animejs';

// Interactive Component Drag Configuration (Home Page)
const draggableItems = document.querySelectorAll('.layout-container .item');

if (draggableItems.length > 0) {
  createDraggable('.layout-container .item', {
    container: '.layout-container',
    snap: 15,
    x: { snap: [0, 310, 620] }
  });
}


// Safe, Global Dark Mode Toggle Logic (Works Across All Pages)
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn?.querySelector('i');

  // Load saved preference or default to system theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');

      // Switch icon between Sun and Moon
      if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
      }

      // Save state so it persists across page navigation
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});
