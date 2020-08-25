import React, { createRef } from 'react';
import './Race.css';

const width = 360;
const height = 640;
let isGameOver = false;
let speed = 2;
let minSpeed = 2;
let maxSpeed = 4;
let countObstacles = 7;

let circles = [
    {
        x: 30,
        y: 30,
        color: 'lightblue',
        radius: 12
    },
    {
        x: 0,
        y: 60,
        color: 'lightgreen',
        radius: 20
    },
    {
        x: 70,
        y: 160,
        color: 'lightgreen',
        radius: 70
    }
];

let bullets = [
  { x: 40, y: 220 },
  { x: 30, y: 230 },
  { x: 20, y: 240 },
  { x: 10, y: 250 },
]

let car = {
  x: width / 2,
  y: height - 140,
  width: 24,
  height: 32
}

let isLeftMoving = null;
let accelerationExists = null;
let carMoveInterval = null;
let carAccelerationInterval = null;
window.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 37) {
    moveLeft();
  }
  if (event.isComposing || event.keyCode === 39) {
    moveRight();
  }
  if (event.isComposing || event.keyCode === 38) {
    clearInterval(carMoveInterval);
    accelerationExists = false;
    carAccelerationInterval = setInterval(() => {
      if (speed <= maxSpeed)
        speed += 0.03;
    }, 10);
  }
  if (event.isComposing || event.keyCode === 40) {
    clearInterval(carAccelerationInterval);
    accelerationExists = false;
    carAccelerationInterval = setInterval(() => {
      if (speed >= minSpeed)
        speed -= 0.1;
    }, 10);
  }
});

window.addEventListener("mousedown", event => {
  if(event.clientX < car.x) {
    moveLeft();
  }
  else if (event.clientX > car.x) {
    moveRight();
  }
});

window.addEventListener("mouseup", event => {
      clearInterval(carMoveInterval);
});

function moveLeft() {
  clearInterval(carMoveInterval);
  isLeftMoving = true;
  carMoveInterval = setInterval(() => {
    car.x -= 2;
  }, 10);
}

function moveRight() {
  clearInterval(carMoveInterval);
  isLeftMoving = false;
  carMoveInterval = setInterval(() => {
    car.x += 2;
  }, 10);
}

window.addEventListener("keyup", event => {
  if (event.isComposing || event.keyCode === 37) {
    if (isLeftMoving === true)
      clearInterval(carMoveInterval);
  }
  if (event.isComposing || event.keyCode === 39) {
    if (isLeftMoving === false)
      clearInterval(carMoveInterval);
  }
  if (event.isComposing || event.keyCode === 38) {
    if (accelerationExists === false)
      clearInterval(carAccelerationInterval);
  }
  if (event.isComposing || event.keyCode === 40) {
    if (accelerationExists === false)
      clearInterval(carAccelerationInterval);
  }
  if (event.isComposing || event.keyCode === 32) {
    if (bullets.length <= 2) {
      bullets.push({
        x: car.x + 10,
        y: car.y - 10
      });
    }
  }
});

function drawCar(ctx, crashed) {
  ctx.fillStyle = crashed ? 'red' :'gray';
  ctx.fillRect(car.x, car.y, car.width, car.height);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(car.x + 2, car.y, 3, 3);
  ctx.fillRect(car.x + car.width - 5, car.y, 3, 3);
  ctx.fillStyle = 'red';
  ctx.fillRect(car.x + 2, car.y + car.height - 2, 2, 2);
  ctx.fillRect(car.x + car.width - 5, car.y + car.height - 2, 2, 2);
  ctx.fillStyle = 'black';
  ctx.fillRect(car.x - 1, car.y + 5, 1, 7);
  ctx.fillRect(car.x - 1, car.y + 22, 1, 7);
  ctx.fillRect(car.x + car.width, car.y + 5, 1, 7);
  ctx.fillRect(car.x + car.width, car.y + 22, 1, 7);
}

function drawBullets(ctx) {
  ctx.fillStyle = 'black';
  bullets.forEach(b => ctx.fillRect(b.x, b.y, 1, 10));
}

let gameInterval = null;
function main(c) {
  isGameOver = false;
  var ctx = c.current.getContext("2d");
  gameInterval = setInterval(function() {
    if (isGameOver) {
      clearInterval(gameInterval);
    }
    step(ctx);
  }, 10);
}

function step(ctx) {
  move();
  obstaclesRefresh();
  ctx.clearRect(0, 0, width, height);
  drawCircle(ctx, circles);
  drawCar(ctx);
  drawBullets(ctx);
  accidentCheck(ctx);
  shapeHitCheck();
}

function obstaclesRefresh() {
  const prevCount = circles.length;
  circles = circles.filter(c => (c.y - c.radius) < height);
  const countNewCircles = prevCount - circles.length;
  for (let i = 0; i < countNewCircles; i++) {
    addNewObstacle();
  }

  if (circles.length < countObstacles) {
    addNewObstacle();
  }

  bullets = bullets.filter(b => b.y > 0);
}

function addNewObstacle() {
  let newShape;
  while (true) {
    newShape = {
      x: Math.random() * width,
      y: -31,
      color: 'lightgreen',
      radius: 12 + Math.random() * 20
    };

    if (circles.every(c => !isShapeIntersected(c, newShape)))
      break;
  }

  circles.push(newShape);
}

function accidentCheck(ctx) {
  const carShape = {
    x: car.x + car.width / 2,
    y: car.y + car.height / 2,
    radius: car.width / 2
  }

  circles.forEach(c => {
    if (isShapeIntersected(carShape, c)) {
      drawCar(ctx, true);
      isGameOver = true;
    }
  });
}

function isShapeIntersected(shape1, shape2) {
  const distanceBetweenCenters = Math.sqrt(Math.pow(shape1.x - shape2.x, 2) + Math.pow(shape1.y - shape2.y, 2));
  return distanceBetweenCenters < shape1.radius + shape2.radius;
}

function shapeHitCheck() {
  circles = circles.filter(c => {
    bullets.forEach(b => {
      const distance = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
      if (distance < c.radius) {
        c.radius -= 10;
        if (c.radius < 5)
          c.toRemove = true;
      }
    });

    return !c.toRemove;
  });
}

function move() {
  circles.forEach(c => c.y += speed);
  bullets.forEach(b => b.y -= 5);
}

function drawCircle(ctx) {
  circles.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, 2 * Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#003300';
      ctx.stroke();
  });
}

export default class Race extends React.Component {
  componentWillMount() {
    this._canvas = createRef();
  }

  render() {
    return <canvas ref={this._canvas} id="canvas" width={width} height={height}></canvas>;
  }

  componentDidMount() {
    main(this._canvas);    
  }
}