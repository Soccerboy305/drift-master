const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const speedDisplay = document.getElementById('speed');
const driftDisplay = document.getElementById('drift');
const lapDisplay = document.getElementById('lap');
const carSelect = document.getElementById('carSelect');

let keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

const garage = {
  driftster: { acceleration: 0.3, maxSpeed: 6, grip: 0.9, color: '#f00' },
  tank: { acceleration: 0.2, maxSpeed: 4, grip: 1.2, color: '#0f0' },
  rocket: { acceleration: 0.5, maxSpeed: 8, grip: 0.7, color: '#00f' }
};

let selectedCar = garage[carSelect.value];
carSelect.addEventListener('change', () => {
  selectedCar = garage[carSelect.value];
});

const car = {
  x: 500,
  y: 300,
  angle: 0,
  speed: 0,
  width: 40,
  height: 20,
  trail: []
};

let lapStart = performance.now();

function update() {
  if (keys['ArrowUp']) car.speed += selectedCar.acceleration;
  if (keys['ArrowDown']) car.speed -= selectedCar.acceleration;
  if (keys['ArrowLeft']) car.angle -= 0.05 * car.speed;
  if (keys['ArrowRight']) car.angle += 0.05 * car.speed;

  car.speed *= (1 - 0.05); // friction
  car.speed = Math.max(-selectedCar.maxSpeed, Math.min(selectedCar.maxSpeed, car.speed));

  car.x += Math.cos(car.angle) * car.speed;
  car.y += Math.sin(car.angle) * car.speed;

  if (Math.abs(car.speed) > 2) {
    car.trail.push({ x: car.x, y: car.y });
    if (car.trail.length > 100) car.trail.shift();
  }

  speedDisplay.textContent = car.speed.toFixed(2);
  driftDisplay.textContent = Math.abs((car.angle * 180 / Math.PI) % 360).toFixed(1);
  lapDisplay.textContent = ((performance.now() - lapStart) / 1000).toFixed(2);

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.beginPath();
  for (let i = 0; i < car.trail.length - 1; i++) {
    ctx.moveTo(car.trail[i].x, car.trail[i].y);
    ctx.lineTo(car.trail[i + 1].x, car.trail[i + 1].y);
  }
  ctx.stroke();

  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle);
  ctx.fillStyle = selectedCar.color;
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  ctx.restore();

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(100, 100, 800, 400);
}

update();
