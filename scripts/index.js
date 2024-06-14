const timer = document.querySelector('.time p');
const nave = document.querySelector('.nave');
const navePosition = nave.getBoundingClientRect();
const widthNave = nave.offsetWidth;
const heightNave = nave.offsetHeight;
const naveInimiga = document.querySelector('.nave-inimiga')
const naveInimigaPosition = naveInimiga.getBoundingClientRect()
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
let velocidadeTiro = 20;
let estaAtirando = false;

audioMusica = new Audio('sounds/missaoespaco.mp3');

//start game
const startGame = () =>{
    startGameButton.style.display = 'none';

    document.addEventListener('keydown', keyIsPressed);
    document.addEventListener('keyup', keyStopped);
    setInterval(refreshMove, 50);
    setInterval(atirar, 10);
    setInterval(moveTiros, 50);

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

//atirar
const criarTiros = (positionLeftTiro, positionTopTiro) =>{
    const tiro = document.createElement("div");
    tiro.style.position = 'absolute';
    tiro.style.width = '10px';
    tiro.style.height = '10px';
    tiro.style.borderRadius = '50%';
    tiro.style.background = 'red';
    tiro.style.left = positionLeftTiro + 'px';
    tiro.style.top = positionTopTiro + 'px';
    cenario.appendChild(tiro);
}

const atirar = () =>{
    if(estaAtirando){
        criarTiros(positionX + 45, positionY  - 10);
    }
}

const moveTiros = () =>{
    const tiros = document.querySelectorAll('.tiro');
    for(let i = 0; i < tiros.length; i++){
        if(tiros[1]){
            let positionTopTiro = tiros[i].offsetTop;
            positionTopTiro -= velocidadeTiro;
            tiros[i].style.top = positionTopTiro + 'px';
        }
    }
}

document.addEventListener("keydown", (event) =>{
    if(event.key === " "){
        atirar();
        estaAtirando = true;
    }
})
document.addEventListener("keyup", (event) =>{
    if(event.key === " "){
        estaAtirando = false;
    }
})

//colisão nave inimiga
const colisaoNave = setInterval(() =>{
    if(naveInimigaPosition.bottm > navePosition.top && navePosition.top < naveInimigaPosition.bottom){
        directionX = 0;
        directionY = 0;

        naveInimiga.style.animation = 'none';

        nave.style.background = url("images/explosao.gif");

        audioMusica.pause();

        clearInterval(timer, 10);
    }
},50);