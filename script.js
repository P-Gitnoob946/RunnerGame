score=0;
cross=true;
let isGameOver = false;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function(e){
    console.log("Key code is: ",e.keyCode)
    if(e.keyCode==87){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
           dino.classList.remove('animateDino') 
        },700);
    }
    if(e.keyCode==65){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX - 110) + "px";
    }
    if(e.keyCode==68){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX + 110 + "px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    dx=parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
    dy=parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    offsetX=Math.abs(dx-ox);
    offsetY=Math.abs(dy-oy);
   //console.log(offsetX,offsetY)
    if (offsetX<70 && offsetY<60){
        gameOver.innerHTML = "Game Over - Please Reload to Start Again"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause()
            audio.pause()
        },1000);
        isGameOver = true;
    }
    else if(offsetX < 150 && cross){
        score+=1;
        updateScore(score);
        cross= false;
        setTimeout(()=>{
            cross=true;
        },1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            newDur = aniDur-0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }
}, 100);

function updateScore(score){
    scoreCont.innerHTML="Your Score:" +score
}