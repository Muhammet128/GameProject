const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const platform_image = new Image();
platform_image.src = "../src/img/Grass_Platform.png"
const platform_flying_image = new Image();
platform_flying_image.src = "../src/img/Object_Grass_Platform.png"
const player_image = new Image();
player_image.src = "../src/img/Character_player_Red2.png"
const player_image_flip = new Image();
player_image_flip.src = "../src/img/Character_Player_Red2_Flip.png"
const background_image = new Image();
background_image.src = "../src/img/Background_Game.png"
const background_image_flip = new Image();
background_image_flip.src = "../src/img/Background_Game_flip.png"
const enemy_image = new Image();
enemy_image.src = "../src/img/Goomba.png"

canvas.width = 1624
canvas.height = 950

var Score = 0;


const gravity = 1.0

class Player {
  constructor() {
    this.position = {
      x: 150,
      y: 150,
    }
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.direction = false;
    this.width = 90
    this.height = 90
    this.isOnGround = false;
    // this.hitbox = {
    //   position: {
    //     x: this.position.x,
    //     y: this.position.y,
    //   },
    //   width:10,
    //   height:10
    // }
  }

  isWithin(x, y) {
    if (x >= this.position.x && x <= this.position.x + this.width) {
      if (y >= this.position.y && y <= this.position.y + this.height) {
        return true;
      }
    }
    return false; 
  }

  boxIsWidthin(box) {
    let p1 = this.isWithin(box.position.x, box.position.y);
    let p2 = this.isWithin(box.position.x + this.width, box.position.y);
    let p3 = this.isWithin(box.position.x, box.position.y + this.height);
    let p4 = this.isWithin(box.position.x + this.width, box.position.y + this.height);
    return p1 || p2 || p3 || p4;
  }

  draw() {
    if (this.direction) {
      c.drawImage(player_image_flip, this.position.x, this.position.y, this.width, this.height)
    } else {
      c.drawImage(player_image, this.position.x, this.position.y, this.width, this.height)
    }

  }

  update() {
    this.draw()
    // this.updateHitBox()

    // c.fillStyle = 'red';
    // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

    // c.fillStyle = 'blue'
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height,

    // )

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity

  }

  // updateHitBox(){
  //   this.hitbox = {
  //     position: {
  //       x: this.position.x + 35, 
  //       y: this.position.y + 30,
  //     },
  //     width:75,
  //     height:80
  //   }
  // }
}


class Enemy {
  constructor({
    x,
    y,
  }) {
    this.position = {
      x,
      y,
    }


    this.width = 100
    this.height = 100
    // this.hitbox = {
    //   position: {
    //     x: this.position.x,
    //     y: this.position.y,
    //   },
    //   width: 10,
    //   height:10
    // }
  
  }

  isWithin(x, y) {
    if (x >= this.position.x && x <= this.position.x + this.width) {
      if (y >= this.position.y && y <= this.position.y + this.height) {
        return true;
      }
    }
    return false;
  }

  boxIsWidthin(box) {
    let p1 = this.isWithin(box.position.x, box.position.y);
    let p2 = this.isWithin(box.position.x + box.width, box.position.y);
    let p3 = this.isWithin(box.position.x, box.position.y + box.height);
    let p4 = this.isWithin(box.position.x + box.width, box.position.y + box.height);
    return p1 || p2 || p3 || p4;
  }


  draw() {
    // c.fillStyle = 'red';
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    
    c.drawImage(enemy_image, this.position.x, this.position.y, this.width, this.height);
    enemy.position.x -= 3;

  }

  // update() {
  //   this.draw()
  //   this.updateHitBox()

  //   c.fillStyle = 'red';
  //   c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height);

  //   c.fillStyle = 'red';
  //   c.fillRect(
  //     this.hitbox.position.x,
  //     this.hitbox.position.y,
  //     this.hitbox.width,
  //     this.hitbox.height,
  //   )
  // } 

  // updateHitBox(){
  //   this.hitbox = {
  //     position: {
  //       x: this.position.x + 30, 
  //       y: this.position.y + 30,
  //     },
  //     width:35,
  //     height:10,
  //   }
  // }

}


class Platform {
  constructor({
    x,
    y
  }) {
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
    c.drawImage(platform_image, this.position.x - 20, this.position.y - 125, 420, 300)
  }
}

class GenericObject {
  constructor({
    x,
    y
  }) {
    this.position = {
      x,
      y
    }

    this.width = 350
    this.height = 50
  }
  draw() {
    // c.fillStyle = 'blue'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(platform_image, this.position.x - 20, this.position.y - 125, 420, 300)
  }
}

let player = new Player()
let enemy = new Enemy({
  x: 0,
  y: 730,
})
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
  x: 4400, y: 834
}), new Platform({
  x: 4600, y: 834
}), new Platform({
  x: 4800, y: 834
}), new Platform({
  x: 5000, y: 834
}), new Platform({
  x: 5200, y: 834
}), new Platform({
  x: 5400, y: 834
}), new Platform({
  x: 5600, y: 834
}), new Platform({
  x: 5800, y: 834
}), new Platform({
  x: 6000, y: 834
}), new Platform({
  x: 6200, y: 834
}), new Platform({
  x: 6400, y: 834
}), new Platform({
  x: 6600, y: 834
}), new Platform({
  x: 6800, y: 834
}), new Platform({
  x: 7000, y: 834
}), new Platform({
  x: 7200, y: 834
}), new Platform({
  x: 8000, y: 834
}), new Platform({
  x: 8200, y: 834
}), new Platform({
  x: 8400, y: 834
}), new Platform({
  x: 8600, y: 834
}), new Platform({
  x: 8800, y: 834
}), new Platform({
  x: 9000, y: 834
}), new Platform({
  x: 550, y: 634
}), new Platform({
  x: 950, y: 534
}), new Platform({
  x: 1250, y: 434
}), new Platform({
  x: 4950, y: 420
}), new Platform({
  x: 3600, y: 634
}), new Platform({
  x: 3800, y: 634
}), new Platform({
  x: 4000, y: 634
}), new Platform({
  x: 4200, y: 634
}), new Platform({
  x: 3800, y: 434
}), new Platform({
  x: 4000, y: 434
}), new Platform({
  x: 5000, y: 434
}), new Platform({
  x: 5200, y: 434
}), new Platform({
  x: 5600, y: 634
}), new Platform({
  x: 5800, y: 634
}), new Platform({
  x: 6000, y: 634
}), new Platform({
  x: 6400, y: 534
}), new Platform({
  x: 6600, y: 534
}), new Platform({
  x: 7200, y: 634
}), new Platform({
  x: 7400, y: 634
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
   x: 4400, y: 834
}), new Platform({
   x: 4600, y: 834
}), new Platform({
   x: 4800, y: 834
}), new Platform({
   x: 5000, y: 834
}), new Platform({
   x: 5200, y: 834
}), new Platform({
   x: 5400, y: 834
}), new Platform({
   x: 5600, y: 834
}), new Platform({
   x: 5800, y: 834
}), new Platform({
   x: 6000, y: 834
}), new Platform({
   x: 6200, y: 834
}), new Platform({
   x: 6400, y: 834
}), new Platform({
   x: 6600, y: 834
}), new Platform({
   x: 6800, y: 834
}), new Platform({
   x: 7000, y: 834
}), new Platform({
   x: 7200, y: 834
}), new Platform({
   x: 8000, y: 834
}), new Platform({
   x: 8200, y: 834
}), new Platform({
   x: 8400, y: 834
}), new Platform({
   x: 8600, y: 834
}), new Platform({
   x: 8800, y: 834
}), new Platform({
   x: 9000, y: 834
}), new Platform({
  x: 550, y: 634
}), new Platform({
  x: 950, y: 534
}), new Platform({
  x: 1250, y: 434
}), new Platform({
   x: 3600, y: 634
}), new Platform({
   x: 3800, y: 634
}), new Platform({
   x: 4000, y: 634
}), new Platform({
   x: 4200, y: 634
}), new Platform({
   x: 3800, y: 434
}), new Platform({
   x: 4000, y: 434
}), new Platform({
   x: 5000, y: 434
}), new Platform({
   x: 5200, y: 434
}), new Platform({
   x: 5600, y: 634
}), new Platform({
   x: 5800, y: 634
}), new Platform({
   x: 6000, y: 634
}), new Platform({
   x: 6400, y: 534
}), new Platform({
   x: 6600, y: 534
}), new Platform({
   x: 7200, y: 634
}), new Platform({
   x: 7400, y: 634
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


  if (enemy.position.x < 0) {
    enemy.position.x = canvas.width;
  }
  enemy.draw()

    if (keys.right.pressed) {
    enemy.position.x -= 3
  } else {
    enemy.position.x += 3
  }




  player.update()
  platforms.forEach(platform => {
    platform.draw()
  })

  Score = Score + 1;
  document.getElementById("Score").innerHTML = Score;
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      player_image
    }

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
    if (player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x +
      platform.width) {
      player.velocity.y = 0
      player.isOnGround = true;
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

  
  if(player.boxIsWidthin(enemy) || enemy.boxIsWidthin(player)){
    init()
  }

  

}

animate()

addEventListener('keydown', ({
  keyCode
}) => {
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = true;
      player.direction = true
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = true;
      player.direction = false
      break

    case 87:
      console.log('up')
      if (player.isOnGround) {
        player.isOnGround = false;
        player.velocity.y -= 25
      }
      break
  }
})

addEventListener('keyup', ({
  keyCode
}) => {
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

document.addEventListener('keydown', (event) => {}, false);