
moves = 0;

const movesBox = document.getElementById("moves");
var card = document.getElementsByClassName("card");
const reset = document.getElementsByClassName("restart");
var cardList = []
fillUpCardList();
shuffle(cardList);
resetGame();
buildUpGame();
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var openCardArray = [];
var openCardCountArray = [];

function fillUpCardList() {
	for (let i=0; i < card.length; i++) {
      cardList.push(card[i].childNodes[1].className);
	}
}

// show the card and add one move
function showCard(count) {
	
	if (card[count].className != "card match")
	{
		card[count].className = "card open show";
		addMoves();
		addOpenCard(count)
	}
}



// if the cards match set the status
function matchCard(count) {
	card[count].className = "card match";
}

function addOpenCard(count) {
    openCardCountArray.push(count);
    openCardArray.push(card[count]);

    
    // remove the first two added cards
    if (openCardCountArray.length === 3) {
    	if (card[openCardCountArray[0]].className != "card match") {
    		hideCardByName(openCardCountArray);
    	}
    }
    // check if there is a match
    if (openCardCountArray.length === 2) {
    	checkCards(openCardArray);
    }  
}

// check if cards are the same then set new status and refresh array and check gamestatus
function checkCards(array) {
	if(array[0].childNodes[1].className === array[1].childNodes[1].className) {
    card[openCardCountArray[0]].className = "card match";
    card[openCardCountArray[1]].className = "card match";
    openCardCountArray.splice(0,1);
	openCardCountArray.splice(0,1);
	checkgameStatus();
	}
	openCardArray = [];

}

//remove all necessary cards by count - only used for reset
function hideCardByCount(count) {
	card[count].className = "card";
}

//remove all necessary cards by count
function hideCardByName(openCardArray) {
	card[openCardArray[0]].className = "card";
	openCardArray.splice(0,1);
	card[openCardArray[0]].className = "card";
	openCardArray.splice(0,1);
	refreshCards();
}

function addMoves() {
	moves = moves + 1;
    movesBox.innerText = moves;
}

// set the moves to 0 and hide all cards and shuffle and build new up
function resetGame() {
	moves = 0;
	movesBox.innerText = moves;
	for (var i = 0; i < card.length; i++) { 
    hideCardByCount(i);
    }
    shuffle(cardList);
    buildUpGame();
}


// build up the new game with the shuffled cards
function buildUpGame() {
	var counter = 0;
 	for (let i=0; i < cardList.length; i++) {
      card[i].childNodes[1].className = cardList[i];
      counter++;
	}
}

function refreshCards() {
	card = document.getElementsByClassName("card");
}

// chech if the game has finished and ask if restart or not
function checkgameStatus()
{
	var endGame = true;
	for (let i=0; i < card.length; i++) {
       if (card[i].className != "card match") {
       	  endGame = false;
          break;
       }
	}
	if (endGame) {
		if (confirm("Game finished! Your final score is " + moves + ". Do you want to restart?")) {
          resetGame();
          buildUpGame();
        }
	}
}

reset[0].addEventListener("click", function() { resetGame() });
card[0].addEventListener("click", function() { showCard(0) });
card[1].addEventListener("click", function() { showCard(1) });
card[2].addEventListener("click", function() { showCard(2) });
card[3].addEventListener("click", function() { showCard(3) });
card[4].addEventListener("click", function() { showCard(4) });
card[5].addEventListener("click", function() { showCard(5) });
card[6].addEventListener("click", function() { showCard(6) });
card[7].addEventListener("click", function() { showCard(7) });
card[8].addEventListener("click", function() { showCard(8) });
card[9].addEventListener("click", function() { showCard(9) });
card[10].addEventListener("click", function() { showCard(10) });
card[11].addEventListener("click", function() { showCard(11) });
card[12].addEventListener("click", function() { showCard(12) });
card[13].addEventListener("click", function() { showCard(13) });
card[14].addEventListener("click", function() { showCard(14) });
card[15].addEventListener("click", function() { showCard(15) });