import { createLayout, utils, stagger, animate, splitText, createDraggable } from 'https://esm.sh/animejs';

// ==========================================================================
// 1. Text Splitting & Bouncy Character Loops for Profile Title
// ==========================================================================
const { chars } = splitText('.profile-name', { words: false, chars: true });

if (chars && chars.length > 0) {
  animate(chars, {
    y: [
      { to: '-2.5rem', ease: 'outExpo', duration: 600 },
      { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
    ],
    rotate: {
      from: '-1turn',
      delay: 0
    },
    delay: stagger(45),
    ease: 'inOutCirc',
    loopDelay: 1200,
    loop: true
  });
}

// ==========================================================================
// 2. Anime.js v4 Layout Morphing Control Architecture
// ==========================================================================
const [ $button ] = utils.$('.controls button');

// Cycle classes matching layout snapshots exactly
const displayClasses = [
  'flex-row', 
  'grid-1', 
  'flex-col', 
  'none', 
  'grid-2', 
  'flex-row-reverse'
];

// Initialize layout-morph engine tracking child .item blocks
const layout = createLayout('.layout-container', {
  leaveTo: {
    transform: 'scale(0)',
    delay: stagger(75),
  },
});

let index = 0;

function animateLayout() {
  layout.update(({ root }) => {
    // Drop past state class assignments
    root.classList.remove(displayClasses[index]);
    
    index++;
    if (index > displayClasses.length - 1) {
      index = 0;
    }
    
    // Append subsequent array class assignment state mappings
    root.classList.add(displayClasses[index]);
    $button.innerText = "Layout: " + displayClasses[index];
  });
}

if ($button) {
  $button.addEventListener('click', animateLayout);
}

// ==========================================================================
// 3. Interactive Component Drag Configuration Constraints
// ==========================================================================
createDraggable('.layout-container .item', {
  container: '.layout-container',
  snap: 15,
  x: { snap: [0, 310, 620] }
});