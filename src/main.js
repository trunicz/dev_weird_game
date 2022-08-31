const c = document.getElementById('canva')
const ctx = c.getContext('2d')
const playerColor = 'rgba(10,10,100,0.5)'

let x = 100
let directions = []
let y = 100
// let playerObj = {}
// const WallObj = {}
const wallsArray = []
const playerWidth = 20
const playerHeight = 20

function init(x, y, width, height) {
  run(ctx, c)
  window.requestAnimationFrame(init)
}

function run(ctx, c) {
  document.addEventListener('keyup', (e) => {
    directions = directions.filter((x) => {
      return x !== e.key
    })
  })
  document.addEventListener('keydown', (e) => {
    directions.push(e.key)
    directions = directions.filter((item, index) => {
      return directions.indexOf(item) === index
    })
  })
  draw(ctx, c, directions)
}

function draw(ctx, c, directions) {
  ctx.fillStyle = '#000'
  ctx.fillRect(x, y, c.width, c.height)
  renderLevel(10)

  directions.forEach((direction) => {
    if (direction === 'w') y -= 3
    if (direction === 's') y += 3
    if (direction === 'a') x -= 3
    if (direction === 'd') x += 3
  })

  if (x >= c.width - playerWidth) x = c.width - playerWidth
  if (x <= 0) x = 0
  if (y >= c.height - playerHeight) y = c.height - playerHeight
  if (y <= 0) y = 0
  paintPlayer(x, y)
  paintWall(c.width / 2, c.height / 2)
  // console.log(x + '||' + y)
}

function paintPlayer(x, y) {
  ctx.fillStyle = playerColor
  ctx.fillRect(x, y, playerWidth, playerHeight)
}

function paintWall(
  x,
  y,
  width = playerWidth * 2,
  height = playerHeight * 2,
  color = '#c01150'
) {
  x = x - playerHeight
  y = y - playerWidth
  ctx.fillStyle = color
  return ctx.fillRect(x, y, width, height)
}

function renderLevel(walls, lastX = 0, nextX = 0, lastY = 0, nextY = 0) {
  const width = c.width / walls
  const height = c.height / walls
  if (nextX === 0 || lastY === 0 || nextX === 500 || lastY === 500) {
    paintWall(nextX, nextY, width, height, 'rgb(100,150,100)')
  } else {
    paintWall(nextX, nextY, width, height, 'rgb(100,150,100)')
  }
  wallsArray.push({
    x: nextX,
    y: nextY,
    width,
    height
  })
  if (nextX < c.width) {
    lastX = nextX
    nextX = lastX + width
  } else {
    nextX = 0
    nextY = lastY + height
    lastY = nextY
  }
  console.log()
  if (nextX <= c.width && nextY <= c.height) {
    renderLevel(walls, nextX, nextX, lastY, lastY)
  }
}
// function random(max) {
//   return Math.floor(Math.random() * max) + 1
// }

init()
console.table(wallsArray)
