const c = document.getElementById('canva')
const ctx = c.getContext('2d')
let playerColor = 'rgba(10,10,100,0.5)'
let isCollapse = false
let winblock

let win = false

let directions = []
let enemies = []
let enemies2 = []
let enemies3 = []
let enemies4 = []
let enemies5 = []
let enemies6 = []
// let playerObj = {}
const wallsArray = []
const playerWidth = 20
const playerHeight = 20

let start = 120
const maxY = 100
let positionY = 0

const maxY2 = 100
let positionY2 = 200

const maxY3 = 300
let positionY3 = 200

const maxY4 = 300
let positionY4 = 400

const maxY5 = 400
let positionY5 = 500

const maxY6 = 480
let positionY6 = 420

const positionPlayer = { x: 380, y: 450 }

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
  if (!win) {
    // ctx.fillStyle = 'rgb(100,150,100)'
    // ctx.fillRect(x, y, c.width, c.height)
    renderLevel(10)
    enemies = []
    enemies2 = []
    enemies3 = []
    enemies4 = []
    enemies5 = []
    enemies6 = []
    winblock = new Bloque(420, 420, 60, 'rgba(212, 175, 55,0.8)')
    winblock.paint()

    if (
      collapse(positionPlayer.x, positionPlayer.y, 20, winblock.getObject())
    ) {
      isCollapse = true
      win = true
    }

    directions.forEach((direction) => {
      if (!isCollapse) {
        if (direction === 'w') positionPlayer.y -= 2
        if (direction === 's') positionPlayer.y += 2
        if (direction === 'a') positionPlayer.x -= 2
        if (direction === 'd') positionPlayer.x += 2
        if (direction === 'k') {
          if (directions[directions.length - 2] === 'w') positionPlayer.y -= 10
          if (directions[directions.length - 2] === 's') positionPlayer.y += 10
          if (directions[directions.length - 2] === 'a') positionPlayer.x -= 10
          if (directions[directions.length - 2] === 'd') positionPlayer.x += 10
        }
      }
    })
    // console.log(directions)

    if (positionPlayer.x >= c.width - playerWidth - 20) {
      positionPlayer.x = c.width - playerWidth - 20
    }
    if (positionPlayer.x <= 20) positionPlayer.x = 20
    if (positionPlayer.y >= c.height - playerHeight - 20) {
      positionPlayer.y = c.height - playerHeight - 20
    }
    if (positionPlayer.y <= 20) positionPlayer.y = 20

    if (
      positionPlayer.y >= 80 &&
      positionPlayer.y <= 100 &&
      positionPlayer.x < 360
    ) {
      positionPlayer.y = 80
    }
    if (
      positionPlayer.y <= 120 &&
      positionPlayer.y >= 100 &&
      positionPlayer.x < 360
    ) {
      positionPlayer.y = 120
    }
    if (
      positionPlayer.y >= 80 &&
      positionPlayer.y <= 100 &&
      positionPlayer.x < 360
    ) {
      positionPlayer.y = 80
    }
    if (
      positionPlayer.y <= 120 &&
      positionPlayer.y >= 100 &&
      positionPlayer.x < 360
    ) {
      positionPlayer.y = 120
    }
    if (
      positionPlayer.y >= 180 &&
      positionPlayer.y <= 200 &&
      positionPlayer.x > 100
    ) {
      positionPlayer.y = 180
    }
    if (
      positionPlayer.y <= 220 &&
      positionPlayer.y >= 200 &&
      positionPlayer.x > 100
    ) {
      positionPlayer.y = 220
    }
    if (
      positionPlayer.y >= 280 &&
      positionPlayer.y <= 300 &&
      positionPlayer.x < 360
    ) {
      positionPlayer.y = 280
    }
    if (
      positionPlayer.y <= 320 &&
      positionPlayer.y >= 300 &&
      positionPlayer.x < 360
    ) {
      positionPlayer.y = 320
    }
    if (
      positionPlayer.y >= 380 &&
      positionPlayer.y <= 400 &&
      positionPlayer.x > 100
    ) {
      positionPlayer.y = 380
    }
    if (
      positionPlayer.y <= 420 &&
      positionPlayer.y >= 400 &&
      positionPlayer.x > 100
    ) {
      positionPlayer.y = 420
    }
    console.log(positionPlayer.x, positionPlayer.y)

    player(positionPlayer.x, positionPlayer.y)

    while (enemies.length <= 5) {
      const enemy = new Bloque(start, positionY, 20)
      enemy.paint()
      enemies.push(enemy)
      if (start < 300) {
        start += 55
      } else {
        start = 120
      }
      positionY += 0.1 + random(0.3)
      if (maxY <= positionY) {
        positionY = 0
      }
      if (collapse(positionPlayer.x, positionPlayer.y, 20, enemy.getObject())) {
        positionPlayer.x = 50
        positionPlayer.y = 50
      }
    }

    while (enemies2.length <= 5) {
      const enemy = new Bloque(start, positionY2, 20)
      enemy.paint()
      enemies2.push(enemy)
      if (start < 300) {
        start += 55
      } else {
        start = 120
      }
      positionY2 -= 0.2
      if (maxY2 >= positionY2) {
        positionY2 = 200
      }
      if (collapse(positionPlayer.x, positionPlayer.y, 20, enemy.getObject())) {
        positionPlayer.x = 50
        positionPlayer.y = 50
      }
    }

    while (enemies3.length <= 5) {
      const enemy = new Bloque(start, positionY3, 20)
      enemy.paint()
      enemies3.push(enemy)
      if (start < 300) {
        start += 55
      } else {
        start = 120
      }
      positionY3 += 0.1 + random(0.5)
      if (maxY3 <= positionY3) {
        positionY3 = 200
      }
      if (collapse(positionPlayer.x, positionPlayer.y, 20, enemy.getObject())) {
        positionPlayer.x = 50
        positionPlayer.y = 50
      }
    }
    while (enemies4.length <= 5) {
      const enemy = new Bloque(start, positionY4, 20)
      enemy.paint()
      enemies4.push(enemy)
      if (start < 300) {
        start += 55
      } else {
        start = 120
      }
      positionY4 -= 0.1
      if (maxY4 >= positionY4) {
        positionY4 = 400
      }
      if (collapse(positionPlayer.x, positionPlayer.y, 20, enemy.getObject())) {
        positionPlayer.x = 50
        positionPlayer.y = 50
      }
    }
    while (enemies5.length <= 5) {
      const enemy = new Bloque(start, positionY5, 20)
      enemy.paint()
      enemies5.push(enemy)
      if (start < 300) {
        start += 55
      } else {
        start = 120
      }
      positionY5 += 0.1
      if (maxY5 <= positionY5) {
        positionY5 = 300
      }
      if (collapse(positionPlayer.x, positionPlayer.y, 20, enemy.getObject())) {
        positionPlayer.x = 50
        positionPlayer.y = 50
      }
    }
    while (enemies6.length <= 5) {
      const enemy = new Bloque(start, positionY6, 20)
      enemy.paint()
      enemies6.push(enemy)
      if (start < 300) {
        start += 55
      } else {
        start = 120
      }
      positionY6 += 0.1 + random(0.3)
      if (maxY6 <= positionY6) {
        positionY6 = 400
      }
      if (collapse(positionPlayer.x, positionPlayer.y, 20, enemy.getObject())) {
        positionPlayer.x = 50
        positionPlayer.y = 50
      }
    }
  } else {
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, c.width, c.height)
    const texto = 'Ganaste!!!' // texto de prueba
    ctx.beginPath() // iniciar ruta
    ctx.strokeStyle = 'white' // color externo
    ctx.fillStyle = 'white' // color de relleno
    ctx.font = 'bold 30px Press Start2P Regular' // estilo de texto// texto con los dos métodos
    ctx.fillText(texto, c.width / 2 - 60, c.width / 2 - 30)
  }
}

function player(x, y) {
  function paintPlayer(x, y) {
    ctx.fillStyle = playerColor
    ctx.fillRect(positionPlayer.x, positionPlayer.y, playerWidth, playerHeight)
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
  return Math.random() * max
}

class Bloque {
  constructor(x, y, width, color = 'rgba(55,79,100)') {
    this.x = x
    this.y = y
    this.width = width
    this.color = color
  }

  getObject() {
    return { x: this.x, y: this.y, width: this.width }
  }

  paint() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.width)
  }
}

init()
