
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const backGround = document.createElement("img");
backGround.src = "https://t3.ftcdn.net/jpg/00/88/98/18/360_F_88981880_YjJManMJ6hJmKr5CZteFJAkEzXIh8mxW.jpg";
const heroImg = document.createElement("img");
heroImg.src = "https://c.tenor.com/JkNeDPW3I4oAAAAi/ninja-bear-bam.gif";
/*const bulletsImg = document.createElement("img");
bulletsImg.src = "https://www.kissclipart.com/ninja-star-clipart-shuriken-clip-art-y2x7rk/";*/
const enemyImg = document.createElement("img");
enemyImg.src = "https://www.clipartmax.com/png/full/77-777818_enemy-esports.png"
const bulletsImg = new Image(100, 200);
bulletsImg.src = 'bulletsImg.png';

let data = {
    hero: {
        xDelta: 1,
        yDeltan: 1,
        x: 5,
        y: 65,
        width: 100,
        height: 100,
        jump: 0
    },
    bullets: [],
    enemies: []
}

function ConstructorEnemy() {
    this.xDelta = -3;
    this.yDelta = -3;
    this.x = canvas.width;
    this.y = 100;
    this.width = 50;
    this.height = 50;
    return this;
}

function ConstructorBullet() {
    this.xDelta = 10;
    this.yDelta = 10;
    this.x = data.hero.x + data.hero.width;
    this.y = data.hero.y + data.hero.height / 2;
    this.width = 30;
    this.height = 30;
    return this;
}

function update() {
    if (data.hero.x > 0 && data.hero.x < canvas.width - data.hero.width) {
        data.hero.x += data.hero.xDelta;
    }
    if (data.hero.jump === 1) {
        data.hero.y += data.hero.yDelta;
    } else if (data.hero.jump === 0 && data.hero.y < 65) {
        data.hero.y += data.hero.yDelta;
    }

    //Collision enemy and bullet
    data.bullets.forEach(function (objBullet) {
        data.enemies.forEach(function (objEnemy) {
            let xMidBullet = objBullet.x + objBullet.width / 2;
            let yMidBullet = objBullet.y + objBullet.height / 2;
            if (xMidBullet < objEnemy.x || yMidBullet < objEnemy.y) {
                //continue;
            } else if ((yMidBullet - objEnemy.y) >= 0 ||
                (yMidBullet - objEnemy.y) <= objEnemy.height) {
                objBullet.deleteMe = true;
                objEnemy.deleteMe = true;
            }
        });
    });

    //delete enemy and bullet
    data.bullets = data.bullets.filter(function (objBullet) {
        return objBullet.deleteMe !== true;
    });
    data.enemies = data.enemies.filter(function (objEnemy) {
        return objEnemy.deleteMe !== true;
    });

    data.bullets.forEach(function (objBullet) {
        return objBullet.x += objBullet.xDelta;
    });
    data.bullets.filter(function (objBullet) {
        if (objBullet.x > canvas.width || objBullet.x < 0) {
            return false;
        } else if (objBullet.y > 165 || objBullet.y < 0) {
            return false;
        }
    });
    data.enemies.forEach(function (objEnemy) {
        return objEnemy.x += objEnemy.xDelta;
    })
    data.enemies.filter(function (objEnemy) {
        if (objEnemy.x < 0 || objEnemy.x > canvas.width) {
            return false;
        }
    });
}

function draw() {
    context.drawImage(backGround, 0, 0, canvas.width, canvas.height);
    context.drawImage(heroImg, data.hero.x, data.hero.y, data.hero.width, data.hero.height);

    data.bullets.forEach(function (objBullet) {
        context.drawImage(bulletsImg, objBullet.x, objBullet.y, objBullet.width, objBullet.height)
    });
    data.enemies.forEach(function (objEnemy) {
        context.drawImage(enemyImg, objEnemy.x, objEnemy.y, objEnemy.width, objEnemy.height);
    });
}
setInterval(function () {
    let enemyNew = new ConstructorEnemy();
    data.enemies.push(enemyNew);
}, 1000);

function loop() {
    requestAnimationFrame(loop);
    update();
    draw();
}

loop();

document.addEventListener("keydown", function (evt) {
    if (evt.code === "ArrowRight") {
        data.hero.xDelta = 5;
        if (data.hero.x < canvas.width - data.hero.width) {
            data.hero.x += data.hero.xDelta;
        }
    } else if (evt.code === "ArrowLeft") {
        data.hero.xDelta = -5;
        if (data.hero.x > 0) {
            data.hero.x += data.hero.xDelta;
        }
    } else if (evt.code === "ArrowDown") {
        let bulletNew = new ConstructorBullet();
        data.bullets.push(bulletNew);
    }


});
document.addEventListener("keydown", function (evt) {
    if (evt.code === "ArrowUp") {
        data.hero.yDelta = -10;
        if (data.hero.y < canvas.height - data.hero.height) {
            data.hero.jump = 1;
            data.hero.y += data.hero.yDelta;
        }
    }
});
document.addEventListener("keyup", function (evt) {
    if (evt.code === "ArrowUp") {
        data.hero.yDelta = 5;
        if (data.hero.y < canvas.height - data.hero.height) {
            data.hero.jump = 0;
            data.hero.y += data.hero.yDelta;
        }
    }
});
