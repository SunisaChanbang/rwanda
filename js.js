const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//ANIMATIONS VARABLES
let shift = 0;
let frameWidth = 87;
let frameHeight = 98;
let totalFrames = 12;
let currentFrame = 0;

let shiftBlood = 0;
let bloodWith = 124.4;
let bloodHeight = 100;
let bloodFrames = 17;
let bloodCurrent = 0;
let playBlood = false;

//VARABLES
let crosshairX = canvas.width / 2;
let crosshairY = 200;
let crosshairR = 10;
let crosshairSpeed = 10;

let duckX = canvas.width + frameWidth;
let duckY = (Math.floor(Math.random() * (250)));
let duckSpeed = (Math.floor(Math.random() * (10 - 7) + 7));

let gunX = crosshairX - 100;
let gunY = crosshairY + 10;
let gunSpeed = 20;

let bulletX;
let bulletY;
let bulletCount = 20;
let bullets = [];

let targetR = 20;
let afstandX;
let afstandY;
let hit;

let score = 0;

let currX;
let currY;
let lastX;
let lastY;

let ammo = true;
let muzzelFlash = false;
let space = false;
let enter = false;

//TIMER
let start = true;
let stop = false;
let stopIni = 31000;
let tijdTotStop = 1;

//IMAGES VARABLES
let fence = new Image();
fence.onload = drawFence;
fence.src = "https://github.com/M-McFLy/DuckHunt/blob/master/fence.png?raw=true"; <!-- อันนี้รั้วไม้ -->

let flash = new Image();
flash.onload = drawFlash;
flash.src = "https://github.com/M-McFLy/DuckHunt/blob/master/flash.png?raw=true"; <!-- แสงแฟลชปืน -->

let gun = new Image();
gun.onload = drawGun;
gun.src = "https://github.com/M-McFLy/DuckHunt/blob/master/gun.png?raw=true";
<!-- ปืน -->

let light = new Image();
light.onload = drawLight;
light.src = "https://github.com/M-McFLy/DuckHunt/blob/master/light.png?raw=true";

let bullet = new Image();
bullet.onload = drawBullets;
bullet.src = "https://github.com/M-McFLy/DuckHunt/blob/master/bullet.png?raw=true"; <!--กระสุน -->

let icon = new Image();
icon.onload = drawIcon;
icon.src = "https://github.com/M-McFLy/DuckHunt/blob/master/duckIcon.png?raw=true"; <!--ตัวไอค่อนดำข้างบนซ้าย -->

let duck = new Image();
duck.src = "https://github.com/ppllelp/ITF-Lab/blob/master/rr.png?raw=true"; <!--อีนี่ตัวเป็ด -->

let blood = new Image();
blood.src = "https://github.com/M-McFLy/DuckHunt/blob/master/blood.png?raw=true";  <!--เลือด -->






// code
function crossHair(x, y, r) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.arc(x, y, r + 1.5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2.5;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(x, y - crosshairR);
    ctx.lineTo(x, y + crosshairR);
    ctx.moveTo(x - crosshairR, y);
    ctx.lineTo(x + crosshairR, y)
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x, y, r - 9, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function target(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
}

function drawText(text, x, y, c) {
    ctx.beginPath();
    ctx.font = "40px Impact";
    ctx.fillStyle = c;
    ctx.fillText(text, x, y);
    ctx.closePath();
}


//IMAGES
function drawFence() {
    ctx.drawImage(fence, 0, 0);
}

function drawGun(x, y) {
    ctx.drawImage(gun, x, y);
}

function drawFlash(x, y) {
    ctx.drawImage(flash, x, y);
}

function drawLight() {
    ctx.drawImage(light, 0, 0);
}

function drawIcon(x,y) {
    ctx.drawImage(icon, x, y);
}


//ANIMATIONS
duck.addEventListener("load", duckImage, false);
function duckImage(evt) {
    animate();
    duckBlood();
}

function animate(x, y) {
    ctx.drawImage(duck, shift, 0, frameWidth, frameHeight, x, y, frameWidth, frameHeight);

    shift += frameWidth + 1;

    if (currentFrame == totalFrames) {
        shift = 0;
        currentFrame = 0;
    }

    currentFrame++;
}
function duckBlood() {
    if (playBlood) {
        ctx.drawImage(blood, shiftBlood, 0, bloodWith, bloodHeight, lastX - 124, lastY - 100, bloodWith, bloodHeight);

        shiftBlood += bloodWith + 1;

        if (bloodCurrent == bloodFrames) {
            shiftBlood = 0;
            bloodCurrent = 0;
            playBlood = false;
        }
        
        bloodCurrent++;
    }
}


//CONTROLS
document.addEventListener("mousedown", muisClick, false);
document.addEventListener("mousemove", muisPositie, false);
document.addEventListener("keydown", toetsIn, false);
document.addEventListener("keyup", toetsUit, false);

function muisPositie(evt) {
    currX = evt.clientX - canvas.offsetLeft;
    currY = evt.clientY - canvas.offsetTop;
}
function muisClick(evt) {
    if (ammo) {
        muzzelFlash = true;
    }
        if (muzzelFlash && hit) {
        lastX = evt.clientX - canvas.offsetLeft;
        lastY = evt.clientY - canvas.offsetTop;
    }
}
function toetsIn(evt) {
    if (evt.keyCode == 32) {
        space = true;
    }
    if (evt.keyCode == 13){
        enter = true;
    }
}
function toetsUit(evt) {
    if (evt.keyCode == 32) {
        space = false;
    }
    if (evt.keyCode == 13){
        enter = false;
    }
}



//TARGET DISTANCE
function aftandD() {
    afstandX = crosshairX - (duckX + 50);
    afstandY = crosshairY - (duckY + 55);

    afstandX = Math.pow(afstandX, 2);
    afstandY = Math.pow(afstandY, 2);

    hit = Math.sqrt(afstandX + afstandY) <= targetR;
}




//BULLETS
for (let r = 0; r < bulletCount; r++) {
    bullets[r] = {
        x: 0,
        y: 0,
        status: 1
    };
}

function drawBullets() {
    for (r = 0; r < bulletCount; r++) {
        if (bullets[r].status == 1) {
            bulletX = (r * 19);
            bulletY = 330;

            bullets[r].x = bulletX;
            ctx.drawImage(bullet, bulletX, bulletY);

        }
    }
}



//TIMER
function klok(teller){
    drawText(Math.floor(tijdTotStop/1000).toFixed(0),560,50);
    
    if(start){
        start = false;
    }else if(teller >= stopIni){
        stop = true;
    }
    
    tijdTotStop = stopIni - teller;

    
    if(!stop){
    requestAnimationFrame(klok);
    }
}


//GAME
function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (tijdTotStop >= 0){
    aftandD();
    drawIcon(20,10);
    drawText(score, 80, 50, "black");

    target(duckX + 30, duckY + 52, targetR);
    animate(duckX, duckY);
    duckBlood();
    drawFence();
    crossHair(crosshairX, crosshairY, crosshairR);
    drawBullets();

    //SHOT
    if (muzzelFlash) {
        drawFlash(gunX + 9, gunY - 10);
        bulletCount -= 1;
    }

    drawGun(gunX, gunY);

    if (muzzelFlash) {
        drawLight();
    }
    
    
    //AMMO
    if (bulletCount == 0) {
        ammo = false;
        drawText("reload with space", 170, 200, "black");
    }

    if (bulletCount == 0 && space) {
        ammo = true;
        bulletCount = 20;
    }
    
    
    //HIT
    if (muzzelFlash && hit) {
        score += 1;
        duckX = canvas.width + frameWidth;
        duckY = (Math.floor(Math.random() * (200)));
        playBlood = true;
    }
    
    
    //AIM
    if (currX < crosshairX > 0 && crosshairX - crosshairR * 2 >= 0) {
        crosshairX -= crosshairSpeed;
        if (crosshairX < 400 && crosshairX > 0) {
            gunX = crosshairX - 120;
        }
    } else if (currX > crosshairX + +crosshairR && crosshairX + crosshairR < canvas.width) {
        crosshairX += crosshairSpeed;
        if (crosshairX < 400 && crosshairX > 0) {
            gunX = crosshairX - 120;
        }
    }
    if (currY < crosshairY > 0 && crosshairY - crosshairR * 2 >= 0) {
        crosshairY -= crosshairSpeed;
        if (crosshairY < 200 && crosshairY > 0) {
            gunY = crosshairY - 10;
        }
    } else if (currY > crosshairY + +crosshairR && crosshairY + crosshairR < 300) {
        crosshairY += crosshairSpeed;

        if (crosshairY < 200 && crosshairY > 0) {
            gunY = crosshairY - 10;
        }
    }

    
    //DUCK
    if (duckX > 0 - frameWidth) {
        duckX -= duckSpeed;
    } else {
        duckX = canvas.width + frameWidth;
        duckY = (Math.floor(Math.random() * (200)));
        duckSpeed = (Math.floor(Math.random() * (10 - 7) + 7));
    }
        

}else{
  
    drawFence();
    drawIcon(240,30);
    drawText(score, 300, 70, "black"); 
  // สีคะแนน
    drawText("Press Enter to play again ", 100, 120, "black");
            if (enter) {
            document.location.reload()
        }

}
    
    window.requestAnimationFrame(game);
    muzzelFlash = false;
}

game();
klok();