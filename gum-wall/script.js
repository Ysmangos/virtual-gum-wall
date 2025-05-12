const wall = document.getElementById('wall');
const undoButton = document.getElementById('undoButton');
const clearButton = document.getElementById('clearButton');
const colors = ['#FF69B4', '#FFD700', '#00CED1', '#ADFF2F', '#FF4500', '#FFFFFF', '#FFB6C1', '#32CD32', '#1E90FF'];

const gumStack = []; // Keep track of added gums

wall.addEventListener('click', (event) => {
  // Only place gum if clicking on the wall, not on children
  if (event.target !== wall) return;

  const x = event.clientX;
  const y = event.clientY;

  const gum = document.createElement('div');
  gum.className = 'gum';

  const size = 30 + Math.random() * 20;
  gum.style.width = `${size}px`;
  gum.style.height = `${size}px`;

  gum.style.left = `${x}px`;
  gum.style.top = `${y}px`;
  gum.style.position = 'absolute';

  gum.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  gum.style.borderRadius = generateOrganicRadius();

  wall.appendChild(gum);
  gumStack.push(gum);
});

// Undo: remove the last gum
undoButton.addEventListener('click', () => {
  const lastGum = gumStack.pop();
  if (lastGum) {
    wall.removeChild(lastGum);
  }
});

// Clear All: remove all gums
clearButton.addEventListener('click', () => {
  gumStack.forEach(gum => wall.removeChild(gum));
  gumStack.length = 0;
});

// Generate a random organic shape with border-radius trick
function generateOrganicRadius() {
  const r1 = Math.floor(30 + Math.random() * 30);
  const r2 = Math.floor(40 + Math.random() * 30);
  const r3 = Math.floor(30 + Math.random() * 30);
  const r4 = Math.floor(40 + Math.random() * 30);

  const s1 = Math.floor(30 + Math.random() * 30);
  const s2 = Math.floor(40 + Math.random() * 30);
  const s3 = Math.floor(30 + Math.random() * 30);
  const s4 = Math.floor(40 + Math.random() * 30);

  return `${r1}% ${r2}% ${r3}% ${r4}% / ${s1}% ${s2}% ${s3}% ${s4}%`;
}