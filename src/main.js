const c = document.getElementById('canva')
const ctx = c.getContext('2d')

let x = 0
let directions = []
let y = 0
let playerObj = {}
const WallObj = {}

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
  ctx.fillStyle = '#fff'
  ctx.fillRect(x, y, playerWidth, playerHeight)
  playerObj = {
    x,
    y,
    width: playerWidth,
    height: playerHeight
  }
}
function paintWall(x, y, width = 0, height = 0) {
  x = x - playerHeight
  y = y - playerWidth
  width = playerWidth * 2
  height = playerHeight * 2

  ctx.fillStyle = '#c01150'
  ctx.fillRect(x, y, width, height)
  playerObj = {
    x,
    y,
    width,
    height
  }
}

init()
