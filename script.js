const canvas = document.getElementById('bubble');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];

class Bubble {
  constructor() {
    this.radius = Math.random() * 60 + 20;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, this.radius * 0.2,
      this.x, this.y, this.radius
    );
    gradient.addColorStop(0, 'rgb(2, 30, 102)');
    gradient.addColorStop(1, 'rgba(21, 5, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.radius > canvas.width || this.x - this.radius < 0)
      this.dx *= -1;
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0)
      this.dy *= -1;

    this.draw();
  }
}

for (let i = 0; i < 40; i++) {
  bubbles.push(new Bubble());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let bubble of bubbles) {
    bubble.update();
  }
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});