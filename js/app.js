
// Initialize all the need variables
moves = 0;
starRating = 5;

let openCardArray = [];
let openCardCountArray = [];
const movesBox = document.getElementById("moves");
let card = document.getElementsByClassName("card");
const reset = document.getElementsByClassName("restart");
let stars = document.getElementsByClassName("fa fa-star");
console.log(stars)
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const span = document.getElementsByClassName("close")[0];
let h = 0;
let m = 0;
let s = 0;
console.log(stars)
let cardList = []
let stopTimer = false;
fillUpCardList();
shuffle(cardList);
resetGame();
buildUpGame();
/* Shuffle function from http://stackoverflow.com/a/2450976
 Shuffles the cardList
*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// fill all cards into an array for later use (shuffling)
function fillUpCardList() {
	for (let i=0; i < card.length; i++) {
      cardList.push(card[i].childNodes[1].className);
	}
}

/* show the card and add one move
   also check the star rating after every opening of a card
*/
function showCard(count) {
	
	if (card[count].className != "card match" && card[count].className != "card open show")
	{
		card[count].className = "card open show";
		addMoves();
		addOpenCard(count)
    checkStarRating();
	}
}



// if the cards match set the status
function matchCard(count) {
	card[count].className = "card match";
}

/*
this function adds every new opened card to two different arrays (was not able to fix it with one)
and then checks if there are 3 or 2 cards in it. When there are 3 cards in it the first two will be removed and hidden

if there are only two cards it will check if these two cards match
*/
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

//remove all necessary cards by count and refresh all the cards
function hideCardByName(openCardArray) {
	card[openCardArray[0]].className = "card";
	openCardArray.splice(0,1);
	card[openCardArray[0]].className = "card";
	openCardArray.splice(0,1);
}

// add one move to the moves section
function addMoves() {
	moves = moves + 1;
  movesBox.innerText = moves;
}

/* set the moves to 0 and hide all cards and shuffle and build new up
   also reset the timer and restart the timer
   and add the missing stars
*/
function resetGame() {
	moves = 0;
	movesBox.innerText = moves;
  s = 0;
  h = 0;
  m = 0;
  stopTimer = false;
  startTime();
  addMissingStars(stars.length);
	for (let i = 0; i < card.length; i++) { 
    hideCardByCount(i);
    }
    shuffle(cardList);
    buildUpGame();
}


/* build up the new game with the shuffled cards
   it takes all shuffled cards and adds them to the card HTML Collection
*/
function buildUpGame() {
	let counter = 0;
 	for (let i=0; i < cardList.length; i++) {
      card[i].childNodes[1].className = cardList[i];
      counter++;
	}
}

/* check if the game has finished and stop the timer + open the modal with the results
   the game is finished, when all cards in the cards HTML Collection have the class name card match
*/
function checkgameStatus()
{
	let endGame = true;
	for (let i=0; i < card.length; i++) {
       if (card[i].className != "card match") {
       	  endGame = false;
          break;
       }
	}
	if (endGame) {
    stopTimer = true;
    getModal();
	}
}

// removes the stars 
function checkStarRating()
{
  // remove one star after every 15 moves until 1 star is left
  if (stars.length > 1 && moves % 15 === 0) {
    stars[0].parentNode.removeChild(stars[0])
    starRating--;
  }
  
}

// after a restart if the star rating is lower than 5 we loop through this while loop until there are 5 stars back again
function addMissingStars(countOfStars) {
   if (starRating != 5) {
      while (starRating != 5) {
        const starsList = document.getElementsByTagName('ul')[0];
        newItem = document.createElement('li');
        newItem.className = "fa fa-star";
        starsList.appendChild(newItem);
        stars = starsList;
        starRating++;
      }
      stars = document.getElementsByClassName("fa fa-star");
   }  
}

// this function brings up the modal with the result
function getModal() {
    modalText.innerText = "Congratulations you have finished the game in " + h + " hours " + m + " minutes and " + s + " seconds with " + moves + " moves and a " + stars.length + " star rating" ;
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// this function is adding the time to the timer every second
function startTime() {
    if (stopTimer === false) {
    h = checkHours(s,m,h);
    m = checkMinutes(s,m);
    s = checkSeconds(s);
    document.getElementById("timer").innerHTML =
    h + ":" + m + ":" + s;
    let t = setTimeout(startTime, 1000);
  }
}

// this function is "calculating" the seconds for the timer
function checkSeconds(i) {
  if (i === 59) {
    return 0;
  } else {
    return i + 1;
  }

}

// this function is "calculating" the minutes for the timer
function checkMinutes(seconds,minutes) {
  if (seconds === 59) {
    return minutes + 1;
  } else {
    return minutes;
  }
}

// this function is "calculating" the hours for the timer
function checkHours(seconds,minutes,hours) {
    if (seconds === 59 && minutes === 59) {
    return hours + 1;
  } else {
    return hours;
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