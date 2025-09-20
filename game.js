const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

let keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Load images
const playerImg = new Image();
playerImg.src = 'assets/images/player.png';

const enemyImg = new Image();
enemyImg.src = 'assets/images/enemy.png';

const player = {
  x: 180,
  y: 500,
  width: 40,
  height: 80,
  lane: 1
};

const lanes = [60, 180, 300];
let traffic = [];
let score = 0;

function spawnCar() {
  const lane = lanes[Math.floor(Math.random() * lanes.length)];
  traffic.push({ x: lane - 20, y: -100, width: 40, height: 80, speed: 4 + Math.random() * 2 });
}

function update() {
  if (keys['ArrowLeft'] && player.lane > 0) {
    player.lane--;
    keys['ArrowLeft'] = false;
  }
  if (keys['ArrowRight'] && player.lane < lanes.length - 1) {
    player.lane++;
    keys['ArrowRight'] = false;
  }
  player.x = lanes[player.lane] - player.width / 2;

  traffic.forEach(car => car.y += car.speed);
  traffic = traffic.filter(car => car.y < canvas.height);

  for (let car of traffic) {
    if (
      player.x < car.x + car.width &&
      player.x + player.width > car.x &&
      player.y < car.y + car.height &&
      player.y + player.height > car.y
    ) {
      alert('💥 Crash! Final Score: ' + score);
      document.location.reload();
    }
  }

  score++;
  scoreDisplay.textContent = score;

  draw();
  requestAnimationFrame(update);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  traffic.forEach(car => {
    ctx.drawImage(enemyImg, car.x, car.y, car.width, car.height);
  });

  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

setInterval(spawnCar, 1500);
update();
