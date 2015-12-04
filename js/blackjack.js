(function() {
//Assigns functions to be called when UI buttons are clicked.
$(document).ready(function() {
	$('#rules').accordion({collapsible: true, active: false});
	player.printBank();
	$('#dealNewHand').click(function() {
		gameLogic.dealHand();
	});
	$('#hit').click(function() {
		player.hit();
	});
	$('#stand').click(function() {
		gameLogic.stand();
	});
});
var deck = {
	dealt: false,
	cards: ['aceClubs', 'twoClubs', 'threeClubs', 'fourClubs', 'fiveClubs', 'sixClubs', 'sevenClubs', 'eightClubs', 'nineClubs', 'tenClubs', 'jackClubs', 'queenClubs', 'kingClubs', 'aceSpades', 'twoSpades', 'threeSpades', 'fourSpades', 'fiveSpades', 'sixSpades', 'sevenSpades', 'eightSpades', 'nineSpades', 'tenSpades', 'jackSpades', 'queenSpades', 'kingSpades', 'aceHearts', 'twoHearts', 'threeHearts', 'fourHearts', 'fiveHearts', 'sixHearts', 'sevenHearts', 'eightHearts', 'nineHearts', 'tenHearts', 'jackHearts', 'queenHearts', 'kingHearts', 'aceDiamonds', 'twoDiamonds', 'threeDiamonds', 'fourDiamonds', 'fiveDiamonds', 'sixDiamonds', 'sevenDiamonds', 'eightDiamonds', 'nineDiamonds', 'tenDiamonds', 'jackDiamonds', 'queenDiamonds', 'kingDiamonds', 'aceClubs', 'twoClubs', 'threeClubs', 'fourClubs', 'fiveClubs', 'sixClubs', 'sevenClubs', 'eightClubs', 'nineClubs', 'tenClubs', 'jackClubs', 'queenClubs', 'kingClubs', 'aceSpades', 'twoSpades', 'threeSpades', 'fourSpades', 'fiveSpades', 'sixSpades', 'sevenSpades', 'eightSpades', 'nineSpades', 'tenSpades', 'jackSpades', 'queenSpades', 'kingSpades', 'aceHearts', 'twoHearts', 'threeHearts', 'fourHearts', 'fiveHearts', 'sixHearts', 'sevenHearts', 'eightHearts', 'nineHearts', 'tenHearts', 'jackHearts', 'queenHearts', 'kingHearts', 'aceDiamonds', 'twoDiamonds', 'threeDiamonds', 'fourDiamonds', 'fiveDiamonds', 'sixDiamonds', 'sevenDiamonds', 'eightDiamonds', 'nineDiamonds', 'tenDiamonds', 'jackDiamonds', 'queenDiamonds', 'kingDiamonds'],
	cardValues: {'aceClubs': 11, 'twoClubs': 2, 'threeClubs': 3, 'fourClubs': 4, 'fiveClubs': 5, 'sixClubs': 6, 'sevenClubs': 7, 'eightClubs': 8, 'nineClubs': 9, 'tenClubs': 10, 'jackClubs': 10, 'queenClubs': 10, 'kingClubs': 10, 'aceSpades': 11, 'twoSpades': 2, 'threeSpades': 3, 'fourSpades': 4, 'fiveSpades': 5, 'sixSpades': 6, 'sevenSpades': 7, 'eightSpades': 8, 'nineSpades': 9, 'tenSpades': 10, 'jackSpades': 10, 'queenSpades': 10, 'kingSpades': 10, 'aceHearts': 11, 'twoHearts': 2, 'threeHearts': 3, 'fourHearts': 4, 'fiveHearts': 5, 'sixHearts': 6, 'sevenHearts': 7, 'eightHearts': 8, 'nineHearts': 9, 'tenHearts': 10, 'jackHearts': 10, 'queenHearts': 10, 'kingHearts': 10, 'aceDiamonds': 11, 'twoDiamonds': 2, 'threeDiamonds': 3, 'fourDiamonds': 4, 'fiveDiamonds': 5, 'sixDiamonds': 6, 'sevenDiamonds': 7, 'eightDiamonds': 8, 'nineDiamonds': 9, 'tenDiamonds': 10, 'jackDiamonds': 10, 'queenDiamonds': 10, 'kingDiamonds': 10},
	//Generates a random number between 0 and 51 and returns a card object from the cards array.
	randomCard: function() {
		var randomNumber = Math.floor(Math.random()*deck.cards.length);
		card = deck.cards[randomNumber];
		deck.cards.splice(randomNumber,1);
		return {card, cardValue: deck.cardValues[card]};
	}
};
var player = {
	type: "player",
	bank: 500,
	score: 0,
	hand: [],
	aces: ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'],
	aceCheckResult: undefined,
	hit: function () {
		gameLogic.hit(player);
	},
	printBank: function() {
		return $("<h1>$ " + player.bank + "</h1>").appendTo('.bank');
	}
};
var dealer = {
	type: "dealer",
	bank: 500,
	score: 0,
	hand: [],
	aces: ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'],
	aceCheckResult: undefined,
	showHand: function() {
		$('.dealerHand, #displayDealerScore').empty();
		$("<h3>Dealer Hand: " + dealer.score + "</h3>").appendTo('#displayDealerScore');
		for (i=0; i<dealer.hand.length; i++) {
			$("<i class=card-" + dealer.hand[i] + ">").appendTo('.dealerHand');
		}
	}
};
var gameLogic = {
	handOver: false,
	dealCounter: 0,
	//Deals player and dealer two cards each for a new hand
	dealHand: function() {
		gameLogic.reset();
		if (deck.dealt === false) {
			deck.dealt = true;
			gameLogic.hit(player), gameLogic.hit(player), gameLogic.hit(dealer), gameLogic.hit(dealer);
			$("<h3>Dealer Hand: ?</h3>").appendTo('#displayDealerScore');
			$("<i class=card-" + dealer.hand[0] + "></i> <img src='img/cardBack.png'></img>").appendTo('.dealerHand');
			gameLogic.dealCounter++;
		}
	},
	/* (Player or dealer) Generates a random card, pushes that card onto the hand array, adds the card value to the score, checks for aces and adjusts score accordingly, 
	updates score and cards on the screen, calculates if the hit resulted in a bust.
	*/
	hit: function(obj) {
		if (deck.dealt === false) {
			return null;
		}
		else if (gameLogic.handOver === true) {
			return null;
		}
		else {
			if (obj.type === "player") {
				var newCard = deck.randomCard();
				obj.hand.push(newCard.card);
				obj.score += newCard.cardValue;
				obj.aceCheckResult = gameLogic.aceCheck(obj.hand, obj.score, obj.aces);
				obj.score = obj.aceCheckResult[0];
				obj.aces = obj.aceCheckResult[1];
				$('#displayPlayerScore').empty();
				$("<h3>Your Hand: " + obj.score + "</h3>").appendTo('#displayPlayerScore');
				$("<i class=card-" + newCard.card +"></i>").appendTo('.playerHand');
				return gameLogic.calcBust(player.score, dealer.score);
			}
			else if (obj.type === "dealer") {
				var newCard = deck.randomCard();
				obj.hand.push(newCard.card);
				obj.score += newCard.cardValue;
				obj.aceCheckResult = gameLogic.aceCheck(obj.hand, obj.score, obj.aces);
				obj.score = obj.aceCheckResult[0];
				obj.aces = obj.aceCheckResult[1];
			}
		}
	},
	//Once player stands, it is the dealer's turn to hit if dealer score is less than 17.
	stand: function() {
		if (deck.dealt === false) {
			return null;
		}
		else if (gameLogic.handOver === true) {
			return null;
		}
		else {
			while (dealer.score < 17) {
				gameLogic.hit(dealer);
			}
		gameLogic.handOver = true;
		dealer.showHand();
		}
		return gameLogic.calcWinner(player.score, dealer.score);
	},
	aceCheck: function(hand, score, aces) {
		//For each card in the hand
		for (var y=0; y<hand.length; y++) {
			//Check to see if one is an ace
			for (var i=0; i<aces.length; i++) {
				//If the hand has an ace and has just busted, subtracts 10 from hands's score to make the Ace count for 1 instead of 11 and removes that ace from subsequent ace checks.
				if ((hand[y] === aces[i]) && ((score) > 21)) {
					score -= 10;
					aces.splice(i,1);
				}
			}
		}
		return [score, aces];
	},
	//Calculates if either player goes over 21 and busts. This function is called when each card is dealt.
	calcBust: function(playerScore, dealerScore) {
		if (playerScore > 21) {
			gameLogic.handOver = true;
			dealer.showHand();
			$("<div id='playerLose'>Bust! You lose!</div>").appendTo('#lPlayer');
			$("<div id='dealerWin'>Dealer Wins!</div>").appendTo('#wDealer');
		}
		else if (dealerScore > 21) {
			gameLogic.handOver = true;
			dealer.showHand();
			$("<div id='playerLose'>Dealer busts! You win!</div>").appendTo('#lPlayer');
			$("<div id='dealerLost'>Dealer Lost!</div>").appendTo('#lDealer');
		}
	},
	//Calculates who wins once the player decides to stand.
	calcWinner: function(playerScore, dealerScore) {
		if (playerScore > 21) {
			$("<div id='playerLose'>Bust! You Lose!</div>").appendTo('#lPlayer');
			$("<div id='dealerWin'>Dealer Wins!</div>").appendTo('#wDealer');
		}
		else if (dealerScore > 21) {
			$("<div id='playerWin'>Dealer busts! You win!</div>").appendTo('#wPlayer');
			$("<div id='dealerLost'>Dealer Lost!</div>").appendTo('#lDealer');
		}
		else if (playerScore === dealerScore) {
			$("<div id='playerTied'>You Tied!</div>").appendTo('#pTied');
			$("<div id='dealerTied'>You Tied!</div>").appendTo('#dTied');
		}
		else if (playerScore > dealerScore) {
			$("<div id='playerWin'>You Win!</div>").appendTo('#wPlayer');
			$("<div id='dealerLost'>Dealer Lost!</div>").appendTo('#lDealer');
		}
		else {
			$("<div id='playerLose'>You Lost!</div>").appendTo('#lPlayer');
			$("<div id='dealerWin'>Dealer Wins!</div>").appendTo('#wDealer');
		}
	},
	//Resets all critical game components and UI elements to prepare for a fresh hand of blackjack.
	reset: function() {
		$('.playerHand, .dealerHand, #displayPlayerScore, #displayDealerScore, #wPlayer, #lPlayer, #wDealer, #lDealer, #pTied, #dTied').empty();
		deck.dealt = false;
		gameLogic.handOver = false;
		player.aces = ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'];
		dealer.aces = ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'];
		player.score = 0;
		dealer.score = 0;
		player.hand = [];
		dealer.hand = [];
		//Resets the deck to a full two decks after 10 hands have been dealt.
		if (gameLogic.dealCounter === 10) {
			deck.cards = ['aceClubs', 'twoClubs', 'threeClubs', 'fourClubs', 'fiveClubs', 'sixClubs', 'sevenClubs', 'eightClubs', 'nineClubs', 'tenClubs', 'jackClubs', 'queenClubs', 'kingClubs', 'aceSpades', 'twoSpades', 'threeSpades', 'fourSpades', 'fiveSpades', 'sixSpades', 'sevenSpades', 'eightSpades', 'nineSpades', 'tenSpades', 'jackSpades', 'queenSpades', 'kingSpades', 'aceHearts', 'twoHearts', 'threeHearts', 'fourHearts', 'fiveHearts', 'sixHearts', 'sevenHearts', 'eightHearts', 'nineHearts', 'tenHearts', 'jackHearts', 'queenHearts', 'kingHearts', 'aceDiamonds', 'twoDiamonds', 'threeDiamonds', 'fourDiamonds', 'fiveDiamonds', 'sixDiamonds', 'sevenDiamonds', 'eightDiamonds', 'nineDiamonds', 'tenDiamonds', 'jackDiamonds', 'queenDiamonds', 'kingDiamonds', 'aceClubs', 'twoClubs', 'threeClubs', 'fourClubs', 'fiveClubs', 'sixClubs', 'sevenClubs', 'eightClubs', 'nineClubs', 'tenClubs', 'jackClubs', 'queenClubs', 'kingClubs', 'aceSpades', 'twoSpades', 'threeSpades', 'fourSpades', 'fiveSpades', 'sixSpades', 'sevenSpades', 'eightSpades', 'nineSpades', 'tenSpades', 'jackSpades', 'queenSpades', 'kingSpades', 'aceHearts', 'twoHearts', 'threeHearts', 'fourHearts', 'fiveHearts', 'sixHearts', 'sevenHearts', 'eightHearts', 'nineHearts', 'tenHearts', 'jackHearts', 'queenHearts', 'kingHearts', 'aceDiamonds', 'twoDiamonds', 'threeDiamonds', 'fourDiamonds', 'fiveDiamonds', 'sixDiamonds', 'sevenDiamonds', 'eightDiamonds', 'nineDiamonds', 'tenDiamonds', 'jackDiamonds', 'queenDiamonds', 'kingDiamonds'];
			gameLogic.dealCounter = 0;
		}
	}
};
}());