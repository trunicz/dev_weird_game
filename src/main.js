const c = document.getElementById('canva')
const ctx = c.getContext('2d')
let playerColor = 'rgba(10,10,100,0.5)'
const isCollapse = false

let x = 50
let directions = []
let y = 50
let enemies = []
// let playerObj = {}
const wallsArray = []
const playerWidth = 20
const playerHeight = 20

let start = 120
const maxY = 80
let positionY = 20

const positionPlayer = { x: 0, y: 0 }

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
  // ctx.fillStyle = 'rgb(100,150,100)'
  // ctx.fillRect(x, y, c.width, c.height)
  renderLevel(10)

  directions.forEach((direction) => {
    if (!isCollapse) {
      if (direction === 'w') y -= 2
      if (direction === 's') y += 2
      if (direction === 'a') x -= 2
      if (direction === 'd') x += 2
      if (direction === 'k') {
        if (directions[directions.length - 2] === 'w') y -= 10
        if (directions[directions.length - 2] === 's') y += 10
        if (directions[directions.length - 2] === 'a') x -= 10
        if (directions[directions.length - 2] === 'd') x += 10
      }
    }
  })
  // console.log(directions)

  if (x >= c.width - playerWidth - 20) x = c.width - playerWidth - 20
  if (x <= 20) x = 20
  if (y >= c.height - playerHeight - 20) y = c.height - playerHeight - 20
  if (y <= 20) y = 20

  player(x, y)

  collapse(positionPlayer.x, positionPlayer.y, playerWidth, {
    x: c.width / 2,
    y: c.height / 2,
    width: 40,
    collapsible: true
  })
  while (enemies.length <= 10) {
    const enemy = new Bloque(start, positionY, 20)
    start <= 400 ? (start += 55) : (start = 120)
    enemies.push(enemy)
  }
  positionY += 0.5
  if (maxY <= positionY) {
    positionY = 20
  }

  enemies.forEach((e) => {
    e.paint()
  })
  enemies = []
}

function player(x, y) {
  function paintPlayer(x, y) {
    ctx.fillStyle = playerColor
    ctx.fillRect(x, y, playerWidth, playerHeight)
    positionPlayer.x = x
    positionPlayer.y = y
  }

  paintPlayer(x, y)
}

function collapse(x, y, widthP, element) {
  const exw = element.x + element.width
  const eyh = element.y + element.width

  const xw = x + widthP
  const yw = y + widthP

  if (
    (element.x <= x && x <= exw && element.y <= y && y <= eyh) ||
    (element.x <= x && x <= exw && element.y <= yw && yw <= eyh) ||
    (element.x <= xw && xw <= exw && element.y <= y && y <= eyh) ||
    (element.x <= xw && xw <= exw && element.y <= yw && yw <= eyh)
  ) {
    // isCollapse = true
    playerColor = 'rgba(100,10,10,0.5)'
    return true
  } else {
    // isCollapse = false
    playerColor = 'rgba(10,10,100,0.5)'
    return false
  }
}

function paintWall(
  x,
  y,
  width = playerWidth * 2,
  height = playerHeight * 2,
  color = 'rgba(150,60,60,.5)',
  collapsible = true
) {
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)
  return ctx
}

function renderLevel(walls, lastX = 0, nextX = 0, lastY = 0, nextY = 0) {
  const width = 20
  const height = 20
  let enemy
  if (
    nextX === 0 ||
    lastY === 0 ||
    nextX === 480 ||
    nextY === 480 ||
    nextY === 150 ||
    (nextX <= 350 && nextY === 100) ||
    (nextX >= 120 && nextY === 200) ||
    (nextX <= 350 && nextY === 300) ||
    (nextX >= 120 && nextY === 400)
  ) {
    enemy = paintWall(nextX, nextY, width, height, 'rgba(55,79,100,0.5)')
    wallsArray.push({
      enemy,
      x: nextX,
      y: nextY,
      width,
      collapsible: true
    })
  } else {
    enemy = paintWall(nextX, nextY, width, height, 'rgb(100,150,100)')
    wallsArray.push({
      x: nextX,
      y: nextY,
      width,
      collapsible: false
    })
  }
  if (nextX < c.width) {
    lastX = nextX
    nextX = lastX + width
  } else {
    nextX = 0
    nextY = lastY + height
    lastY = nextY
  }
  if (nextX <= c.width && nextY <= c.height) {
    renderLevel(walls, nextX, nextX, lastY, lastY)
  }
}
function random(max) {
  return Math.floor(Math.random() * max) + 1
}

class Bloque {
  constructor(x, y, width) {
    this.x = x
    this.y = y
    this.width = width
  }

  paint() {
    ctx.fillStyle = 'rgba(55,79,100)'
    ctx.fillRect(this.x, this.y, this.width, this.width)
  }
}

init()
