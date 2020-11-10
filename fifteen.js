let pieces;
let blankPiece= {left: "300px", top: "300px"};
let movableList =[]
count = 0;
let timer;
let timeElapsed=0;
let timeDiv;
window.addEventListener("load", function() {
	//Create a div that keeps track of the number of clicks 
	let counter = document.createElement("div");
	counter.innerHTML= "NUMBER OF CLICKS: " + count;
	document.body.appendChild(counter);
	counter.style.width= 100+"px";
	counter.style.right = 200+"px";
	counter.style.position = "fixed";
	counter.style.top = 200+"px";
	counter.style.fontSize= 40+"px";
	//create a time elapsed record
	timeDiv = document.createElement("div");
	document.body.append(timeDiv);
	timeDiv.innerHTML = timeElapsed + " seconds elapsed";
	timeDiv.style.position= "fixed";
	timeDiv.style.left = 100+"px";
	timeDiv.style.top = 200+"px";

	pieces = document.querySelectorAll("#puzzlearea > div");
    pieces.forEach((elem) => elem.classList.add("puzzlepiece"));
	for (let i=0; i<15;i++){
	pieces[i].style.left = (i%4)*100+"px";
	pieces[i].style.top = Math.floor((i/4))*100+"px";
	pieces[i].style.backgroundImage = "url(http://162.243.171.11/apahmer/hw4/shiraPic.jpg)";
	pieces[i].style.backgroundPosition = -(i%4)*100+"px -" + Math.floor(i/4)*100+"px";
	pieces[i].addEventListener("click", (evt)=>moveSpace(evt.target, counter));
	}
	movable(pieces);
	for (let i=0; i<movableList.length; i++){
		movableList[i].classList.add("movablepiece");
	}
	document.getElementById("shufflebutton").addEventListener("click", shuffle);
}
);

function moveSpace(tile,counter){
	if(canMove(tile)){
	count+=1;
	counter.innerHTML = "NUMBER OF CLICKS: " +count;
	
	whiteleft= blankPiece.left;
	whitetop= blankPiece.top;
	pieceleftlocation= tile.style.left;
	piecetoplocation = tile.style.top;
	
	tile.style.left = whiteleft;
	tile.style.top = whitetop;
	blankPiece.top= piecetoplocation;
	blankPiece.left=pieceleftlocation;
	}
	for (let i=0; i<movableList.length; i++){
		movableList[i].classList.remove("movablepiece");
	}
	movableList=[];
	movable(pieces);
	for (let i=0; i<movableList.length; i++){
		movableList[i].classList.add("movablepiece");
	}
	if(solved(pieces)){
		counter.innerHTML= "YOU WON IN "+ count+ " CLICKS!";
		counter.style.fontSize= 50+"px";
		counter.style.right = 200+"px";
		counter.style.color = "red";
	}
	
}
function movable(pieces, counter){
	for (let i=0; i<15;i++){
		if (canMove(pieces[i])){
			movableList.push(pieces[i]);
		}
	}
}
function solved(pieces){
	for (let i=0; i<15; i++){
		const left = (i%4)*100;
		const top = Math.floor((i/4))*100;
		if(parseInt(pieces[i].style.top) !=top){
			return false;
		}
		else if(parseInt(pieces[i].style.left) != left){
			return false;
		}
	}
	clearTimer(timer);
	return true;
}

function canMove(target){
	if (Math.abs(( parseInt(blankPiece.left) - parseInt(target.style.left))) + Math.abs((parseInt(blankPiece.top) - parseInt(target.style.top)) )==100){
		return true;
	}else{
	return false;
	}	
}

function shuffle(counter){
	clearTimer();
	timeElapsed = 0;
	for(let i=0; i<=200;i++){
		let moved=false;
		while(moved==false){
			let a = Math.floor(Math.random() * 15);
			if (canMove(pieces[a])){
				moveSpace(pieces[a], counter);
				moved=true;
			} 
		}
	}
	count = 0;
	timer = setInterval(setTimer, 1000);
}
function setTimer(){
	timeElapsed+=1;
	timeDiv.innerHTML = timeElapsed + " seconds elapsed";
}
function clearTimer() {
  clearInterval(timer);
}
