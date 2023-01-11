const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const platform_image = new Image();
platform_image.src = "../src/img/Grass_Platform.png"
const platform_flying_image = new Image();
platform_flying_image.src = "../src/img/Object_Grass_Platform.png"
const player_image = new Image();
player_image.src = "../src/img/Character_player_Red2.png"
const background_image = new Image();
background_image.src = "../src/img/Background_Game.png"
const background_image_flip = new Image();
background_image_flip.src = "../src/img/Background_Game_flip.png"


canvas.width = 1624
canvas.height = 950

const gravity = 1.5

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }

    this.width = 150
    this.height = 150
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(player_image, this.position.x, this.position.y, 185, 185)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y +this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
  
  }
}


class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y
    }

    this.width = 350
    this.height = 50
  }
  draw() {
    //c.fillStyle = 'blue'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(platform_image, this.position.x-20, this.position.y-125, 420, 300)
  }
}

class GenericObject {
  constructor({ x, y }) {
    this.position = {
      x,
      y
    }

    this.width = 350
    this.height = 50
  }
  draw() {
    //c.fillStyle = 'blue'
    //c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(platform_image, this.position.x-20, this.position.y-125, 420, 300)
  }
}

let player = new Player()
let platforms = [new Platform({
  x: -20, y: 834
}), new Platform({
  x: 200, y: 834
}), new Platform({
  x: 400, y: 834
}), new Platform({
  x: 600, y: 834
}), new Platform({
  x: 800, y: 834
}), new Platform({
  x: 1000, y: 834
}), new Platform({
  x: 1200, y: 834
}), new Platform({
  x: 1400, y: 834
}), new Platform({
  x: 1600, y: 834
}), new Platform({
  x: 1800, y: 834
}), new Platform({
  x: 2000, y: 834
}), new Platform({
  x: 2200, y: 834
}), new Platform({
  x: 2800, y: 834
}), new Platform({
  x: 3000, y: 834
}), new Platform({
  x: 3200, y: 834
}), new Platform({
  x: 3400, y: 834
}), new Platform({
  x: 3700, y: 834
}), new Platform({
  x: 3800, y: 834
}), new Platform({
  x: 4400, y: 834
}), new Platform({
  x: 4950, y: 420
}), new Platform({
  x: 5700, y: 834
}), new Platform({
  x: 550, y: 550
}), new Platform({
  x: 950, y: 434
}), new Platform({
  x: 1250, y: 434
}), new Platform({
  x: 3200, y: 320
})
]

let GenericObjects = [
    new GenericObject({
      x: 0,
      y: 0
    })
]

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  },
}

let scrollOffset = 0

function init() {
 player = new Player()
 platforms = [new Platform({
  x: -20, y: 834
}), new Platform({
  x: 200, y: 834
}), new Platform({
  x: 400, y: 834
}), new Platform({
  x: 600, y: 834
}), new Platform({
  x: 800, y: 834
}), new Platform({
  x: 1000, y: 834
}), new Platform({
  x: 1200, y: 834
}), new Platform({
  x: 1400, y: 834
}), new Platform({
  x: 1600, y: 834
}), new Platform({
  x: 1800, y: 834
}), new Platform({
  x: 2000, y: 834
}), new Platform({
  x: 2200, y: 834
}), new Platform({
  x: 2800, y: 834
}), new Platform({
  x: 3000, y: 834
}), new Platform({
  x: 3200, y: 834
}), new Platform({
  x: 3400, y: 834
}), new Platform({
  x: 3700, y: 834
}), new Platform({
  x: 3800, y: 834
}), new Platform({
  x: 4400, y: 834
}), new Platform({
  x: 4500, y: 420
}), new Platform({
  x: 5000, y: 834
}), new Platform({
  x: 550, y: 550
}), new Platform({
  x: 950, y: 434
}), new Platform({
  x: 1250, y: 434
}), new Platform({
  x: 3200, y: 320
})
]


scrollOffset = 0

}




function animate() {
  requestAnimationFrame(animate)

  // c.fillStyle = 'white'
  // c.fillRect(0, 0, canvas.width, canvas.height)

  c.drawImage(background_image, 40, 0, 1000, 900)
  c.drawImage(background_image_flip, 1040, 0, 1000, 900)

  player.update()
  platforms.forEach(platform => {
    platform.draw()
  })


  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 6.5
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach(platform => {
        platform.position.x -= 5
      })
      GenericObjects.forEach(GenericObject => {
        GenericObject.position.x -= 3
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach(platform => {
        platform.position.x += 5
      })
    }
  }

  // platform collision detection //
  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y
        && player.position.y + player.height + player.velocity.y >= platform.position.y
        && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x
        + platform.width) {
      player.velocity.y = 0
    }
  })


  // win condition
  if (scrollOffset > 2000) {
    console.log('You win')
  }

  // lose condition
  if (player.position.y > canvas.height) {
    init()
  }
  
}

animate()

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = true
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = true
      break

    case 87:
      console.log('up')
      player.velocity.y -= 25
      break
  }
})

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = false
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = false
      break

    case 87:
      console.log('up')
      break
  }
})

