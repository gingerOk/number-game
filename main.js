const mainBody = document.querySelector('.main-body');
const td = document.querySelectorAll('.td');
const tbl = document.querySelector('table');
const btns = document.querySelectorAll('.btn');
const p = document.createElement('p');
const menu = document.querySelector('.main-menu');
const gameBlock = document.querySelector('.game-block');
let rows;
let columns;
let t;
let clicked;
let myVal;
let result;
let numVal;
let gameMode;
let resBtn;
let quitBtn;
let modWrap;

tbl.style.display = 'none';

btns.forEach(btn => {
    btn.addEventListener('click', setTimer)
})
function easyMode() {
    t = 75;
    rows = 5;
    columns = 5;
}

function hardMode() {
    t = 55;
    rows = 6;
    columns = 6;
}

function setTimer(event) {
    try{
            if(event.target.classList.contains('easy-btn')) {
                gameMode = 'easyMode';
                easyMode()
            } else {
                gameMode = 'hardMode'
                hardMode()
            }
        } catch(e) {}
    numVal = columns*rows;
    startGame(rows, columns);
    clicked = 1;
    tbl.addEventListener('click', checkClickedNum);
}

function startGame() {
    gameBlock.style.display = 'grid'
    tbl.style.display = 'table';
    menu.style.display = 'none';
    gameBlock.insertBefore(p, gameBlock.childNodes[0]);
    let numbers = getNumbers();
    for(let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
            for(let j = 0; j < columns; j++) {
                let td = document.createElement('td');
                td.classList.add('td');
                td.style = getRandomStyle();
                td.innerHTML = randomNumber();
                tr.appendChild(td);
            }
        tbl.appendChild(tr);
    }
    resBtn = document.createElement('button');
    resBtn.innerHTML = 'Start Over';
    resBtn.classList.add('resBtn');
    gameBlock.appendChild(resBtn);
    resBtn.addEventListener('click', restart);

        quitBtn = document.createElement('button');
        quitBtn.innerHTML = "Quit";
        quitBtn.classList.add('quitBtn');
        gameBlock.appendChild(quitBtn);
        quitBtn.addEventListener("click", quitGame)

    function randomNumber() {
        let n = randomInterval(0, numbers.length - 1);
        let res = numbers[n];
        numbers.splice(n, 1);
        return res;
    }

        function randomInterval(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    } 


    function pickNumbers() {
        let random = Math.floor(Math.random() * numbers.length);
        return numbers[random];
    }

    function getNumbers() {
        let numbs = [];
        for(let j=0; j < numVal; j++) {
            numbs[j] = j + 1;
        }
        return numbs;
    }

    function getRandomStyle() {
        return 'font-size: ' + randomInterval(18, 46) + 'px;' + 
                'color: ' + getRandomColor();
    }

    function getRandomColor(){
            return "rgb(" + randomInterval(0, 255) + ", " 
                    + randomInterval(0, 255) + ", " + randomInterval(0, 255) + ")";
    }

    myTimer();
}


function myTimer() {
    p.innerHTML = 'Time left: ' + t;
    t--
    p.style.margin = '15px auto'
    if(t > 0) {
    myVal = window.setTimeout(myTimer, 1000);
    } else if(t == 0) {
        p.innerHTML = t;
        result = "You lost"
        resultOfGame(result)
    }
}

function checkClickedNum(event) {
    console.log(clicked)
        if(event.target.innerHTML == clicked) {
            clicked++;
            event.target.style.cssText += 'background-color: grey; color: white; transition: background-color .5s ease' 
        }
        if(clicked == numVal + 1) {
           result = 'You won';
            window.clearTimeout(myVal);
            resultOfGame(result);
        }
}
        

    function resultOfGame(result) {
        modWrap = document.createElement('div');
        modWrap.classList.add('modal-wrap');
        const modal = document.createElement('div')
        modal.classList.add('modal');

        const modalText = document.createElement('h1');
        modalText.innerHTML = result;

        const restartBtn = document.createElement('button');
        restartBtn.innerHTML = "Restart";
        restartBtn.classList.add('restartBtn');
        restartBtn.addEventListener('click', restart);
        
        modal.appendChild(modalText);
        modal.appendChild(restartBtn);
        modWrap.appendChild(modal);
        document.body.appendChild(modWrap);
    }

    function restart() {
        if(modWrap) {
            modWrap.remove();
        } 
            removeGameBlock();
            if(gameMode === 'easyMode') {
                easyMode();
            } else {
                hardMode();
            }
        setTimer();
        }

    function quitGame() {
        removeGameBlock()
        gameBlock.style.display = 'none';
        menu.style.display = 'grid';
    }

    function removeGameBlock() {
        while(tbl.hasChildNodes()) {
                tbl.removeChild(tbl.firstChild);
            }
            window.clearTimeout(myVal)
            gameBlock.removeChild(resBtn);
            gameBlock.removeChild(quitBtn);
    }