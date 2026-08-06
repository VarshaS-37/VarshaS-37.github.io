const letters = ["A","T","G","C"];

function buildDNA(){
    const cols = Math.ceil(window.innerWidth/20);
    const rows = Math.ceil(window.innerHeight/20);
    let text="";
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            text += letters[Math.floor(Math.random()*4)] + " ";
        }
        text += "\n";
    }
    dnaDim.textContent = text;
    dnaBright.textContent = text;
}

const dnaDim = document.getElementById("dna-dim");
const dnaBright = document.getElementById("dna-bright");
const orb = document.getElementById("orb");

buildDNA();

window.addEventListener("resize",buildDNA);

function animate() {
    const speed = window.innerWidth < 768 ? 0.0004 : 0.0002;
    const t = Date.now() * speed;
    const radius = Math.min(190, window.innerWidth * 0.25);
    const x =
    radius +
    ((Math.sin(t) + 1) / 2) *
    (window.innerWidth - radius * 2);
    const y =
    radius +
    ((Math.cos(t * 0.7) + 1) / 2) *
    (window.innerHeight - radius * 2);
    orb.style.left = x + "px";
    orb.style.top = y + "px";
    document.documentElement.style.setProperty("--x", x + "px");
    document.documentElement.style.setProperty("--y", y + "px");
    requestAnimationFrame(animate);
}

const dnaBg = document.getElementById("dna-bg");
window.addEventListener("scroll", () => {
    if(window.scrollY > window.innerHeight * 0.1){
        dnaBg.style.opacity = "0";
    }else{
        dnaBg.style.opacity = "1";
    }
    
});

animate();

const cards = document.querySelectorAll(".card");

// Small stagger between cards
cards.forEach((card, index) => {
    card.style.setProperty("--delay", `${index * 10}ms`);
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Stop observing after animation happens once
            observer.unobserve(entry.target);
        }
    });
},{
    threshold: 0,
    rootMargin: "0px 0px -3% 0px"
});

/********************************************************** */
let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let player = "";
let opponent = "";
let gameActive = false;
let playerTurn = true;
const nucleotides = ["A", "T", "G", "C"];
const cells = document.querySelectorAll(".board button");
const statusText = document.getElementById("game-status");
const endText = document.getElementById("end-status");

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function openGame() {
    document.querySelector(".game-card").style.display = "none";
    document.getElementById("dna-game-board").style.display = "block";
}

function startGame(choice){
    player = choice;
    let available = nucleotides.filter(
        n => n !== player
    );
    opponent =
    available[Math.floor(Math.random()*available.length)];
    document.getElementById("choice-box").style.display="none";
    document.getElementById("player-symbol").innerHTML =
    `You: ${player}`;
    document.getElementById("opponent-symbol").innerHTML =
    `DNA: ${opponent}`;
    resetBoard();
    gameActive=true;
    playerTurn=true;
    statusText.innerHTML = 'Click any box to place your nucleotide...';
}

function restartGame(){
    document.getElementById("choice-box").style.display="flex";
    document.getElementById("player-symbol").innerHTML="";
    document.getElementById("opponent-symbol").innerHTML="";
    statusText.innerHTML = '<i class="fa-solid fa-dna"></i> Choose your nucleotide';
    resetBoard();
    gameActive=false;
}

function playerMove(index){
    if(!gameActive)
        return;
    if(!playerTurn)
        return;
    if(board[index] !== "")
        return;
    board[index] = player;
    cells[index].innerHTML = player;
    if(checkWinner(player)){
        endGame(
            '<i class="fa-solid fa-trophy"></i> Congrats! You won'
        );
        return;
    }
    if(checkDraw()){ 
        endGame(
            'Oops! It\'s a Draw '
        );
        return;
    } 
    playerTurn=false;
    statusText.innerHTML ='DNA\'s Turn';
    setTimeout(opponentMove, 600);
}

function opponentMove(){
    let move = findBestMove(opponent);
    if(move === -1){  
        move=findBestMove(player); 
    }
    if(move === -1){
        let empty = [];
        board.forEach((value,index)=>{ 
            if(value==="")
                empty.push(index); 
        });
        move =
        empty[Math.floor(Math.random()*empty.length)];
    }
    board[move]=opponent;
    cells[move].innerHTML=opponent;
    if(checkWinner(opponent)){  
        endGame(
            '<i class="fa-solid fa-robot"></i> DNA won! Better luck next time'
        );  
        return;
    }
    if(checkDraw()){ 
        endGame(
            'Oops! It\'s a Draw'
        );
        return;
    }
    playerTurn=true;
    statusText.innerHTML ="Your turn!";
}

function findBestMove(symbol){
    for(let pattern of winningPatterns){    
        let values =
        pattern.map(index=>board[index]);  
        let count =
        values.filter(x=>x===symbol).length;  
        let empty =
        pattern.find(index=>board[index]===""); 
        if(count===2 && empty!==undefined){   
            return empty;   
        }
    }
    return -1;   
}

function checkWinner(symbol){
    return winningPatterns.some(pattern=>{ 
        return pattern.every(index=>{  
            return board[index]===symbol;   
        }); 
    }); 
}

function checkDraw(){ 
    return board.every(
        cell=>cell!==""
    );
}

function endGame(message){
    gameActive = false;
    statusText.innerHTML=message;
    setTimeout(()=>{ endText.innerHTML +="<br><br>Wanna play again? Click restart"; },300);
}

function resetBoard(){  
    board=[
        "","","",
        "","","",
        "","",""
    ];    
    cells.forEach(cell=>{
        
        cell.innerHTML="";
        
    });  
}

cards.forEach((card, index) => {
    if (index === cards.length - 1) {
        card.classList.add("visible");
    } else {
        observer.observe(card);
    }
});
