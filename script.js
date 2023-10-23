const gameContainer = document.querySelector('.game-container');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  switch (event.key) {
    case 'ArrowUp':
      if (dy !== 1) {
        dx = 0;
        dy = -1;
      }
      break;
    case 'ArrowDown':
      if (dy !== -1) {
        dx = 0;
        dy = 1;
      }
      break;
    case 'ArrowLeft':
      if (dx !== 1) {
        dx = -1;
        dy = 0;
      }
      break;
    case 'ArrowRight':
      if (dx !== -1) {
        dx = 1;
        dy = 0;
      }
      break;
  }
}

function updateSnake() {
  const newSnakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(newSnakeHead);
  if (newSnakeHead.x === food.x && newSnakeHead.y === food.y) {
    createFood();
  } else {
    snake.pop();
  }
}

function createFood() {
  food.x = Math.floor(Math.random() * 20);
  food.y = Math.floor(Math.random() * 20);
}

function drawSnake() {
  snakeElement.innerHTML = ''; // Limpa a cobra anterior
  snake.forEach(segment => {
    const segmentElement = document.createElement('div');
    segmentElement.style.left = segment.x * 20 + 'px';
    segmentElement.style.top = segment.y * 20 + 'px';
    segmentElement.classList.add('snake');
    snakeElement.appendChild(segmentElement);
  });
}

function drawFood() {
  foodElement.style.left = food.x * 20 + 'px';
  foodElement.style.top = food.y * 20 + 'px';
  foodElement.classList.add('food');
}

function main() {
  updateSnake();
  drawSnake();
  drawFood();

  if (isGameOver()) {
    alert('Game over!');
    location.reload(); // Reload the page to restart the game
  } else {
    setTimeout(main, 100);
  }
}

function isGameOver() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= 20 ||
    snake[0].y < 0 ||
    snake[0].y >= 20
  ) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

createFood();
main();
