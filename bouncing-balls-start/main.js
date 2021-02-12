// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

function Ball(x, y, velX, velY, color, radius) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.radius = radius;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if (this.x + this.radius >= width || this.x - this.radius < 0) {
    this.velX = -this.velX;
  }
  if (this.y + this.radius >= height || this.y - this.radius < 0) {
    this.velY = -this.velY;
  }
  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (let i = 0; i < balls.length; ++i) {
    if (this !== balls[i]) {
      const dx = this.x - balls[i].x;
      const dy = this.y - balls[i].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < this.radius + balls[i].radius) {
        this.color = balls[i].color = randomColor();
      }
    }
  }
}

let balls = []
while (balls.length < 50) {
  let radius = random(10, 20);
  let ball = new Ball(
    random(0 + radius, width - radius),
    random(0 + radius, height - radius),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    radius
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  for(let i = 0; i < balls.length; ++i) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}

loop()