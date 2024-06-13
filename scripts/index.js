const timer = document.querySelector('.time p');
const nave = document.querySelector('.nave');
const widthNave = nave.offsetWidth;
const heightNave = nave.offsetHeight;
const naveInimiga = document.querySelector('.nave-inimiga')
const cenario = document.querySelector('.nave-game');
const widthCenario = cenario.offsetWidth;
const heightCenario = cenario.offsetHeight;
const startGameButton = document.querySelector('.start');

let currentTime = 400;
let positionX = 0;
let positionY = 0
let directionX = 0;
let directionY = 0;
let velocidade = 15;

audioMusica = new Audio('sounds/missaoespaco.mp3');

//start game
const startGame = () =>{
    startGameButton.style.display = 'none';

    document.addEventListener('keydown', keyIsPressed);
    document.addEventListener('keyup', keyStopped);
    setInterval(refreshMove, 50);

    audioMusica.play()
    setTimeout(() =>{
        naveInimiga.style.display = 'block';
    },3000)
}

//timer
const clock = setInterval(() =>{
    currentTime--
    timer.innerHTML = currentTime;
},1000)

//movimento
function keyIsPressed(event){
    if(event.key === 'ArrowRight'){
        directionX = 1;
        audioMusica.play()
    }
    else if(event.key === 'ArrowLeft'){
        directionX = -1;
    }

    if(event.key === 'ArrowUp'){
        directionY = 1;
    }
    else if(event.key === 'ArrowDown'){
        directionY = -1;
    }
}

function keyStopped(event){
    if(event.key === 'ArrowRight'){
        directionX = 0;
    }
    else if(event.key === 'ArrowLeft'){
        directionX = 0;
    }

    if(event.key === 'ArrowUp'){
        directionY = 0;
    }
    else if(event.key === 'ArrowDown'){
        directionY = 0;
    }
}

function refreshMove(){
    positionX += directionX * velocidade;
    positionY += directionY * velocidade;

    nave.style.left = positionX + 'px';
    nave.style.bottom = positionY + 'px';

    if(positionX < 0){
        positionX = -1;
    } else if(positionX + widthNave > widthCenario){
        positionX = widthCenario - widthNave;
    }

    if(positionY < 0){
        positionY = 0;
    } else if(positionY + heightNave > heightCenario){
        positionY = heightCenario - heightNave;
    }
}