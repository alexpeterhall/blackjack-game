(function() {
//Assigns functions to be called when UI buttons are clicked.
$(document).ready(function() {
	$('#rules').accordion({collapsible: true, active: false});
	player.printBank();
	$('#dealNewHand').click(function() {
		//player must be called first
		player.dealHand();
		dealer.dealHand();
	});
	$('#hit').click(function() {
		player.hit();
	});
	$('#stand').click(function() {
		gameLogic.stand();
	});
	$('#reset').click(function() {
		gameLogic.reset();
	});
});
var deck = {
	dealt: false,
	cards: ['aceClubs', 'twoClubs', 'threeClubs', 'fourClubs', 'fiveClubs', 'sixClubs', 'sevenClubs', 'eightClubs', 'nineClubs', 'tenClubs', 'jackClubs', 'queenClubs', 'kingClubs', 'aceSpades', 'twoSpades', 'threeSpades', 'fourSpades', 'fiveSpades', 'sixSpades', 'sevenSpades', 'eightSpades', 'nineSpades', 'tenSpades', 'jackSpades', 'queenSpades', 'kingSpades', 'aceHearts', 'twoHearts', 'threeHearts', 'fourHearts', 'fiveHearts', 'sixHearts', 'sevenHearts', 'eightHearts', 'nineHearts', 'tenHearts', 'jackHearts', 'queenHearts', 'kingHearts', 'aceDiamonds', 'twoDiamonds', 'threeDiamonds', 'fourDiamonds', 'fiveDiamonds', 'sixDiamonds', 'sevenDiamonds', 'eightDiamonds', 'nineDiamonds', 'tenDiamonds', 'jackDiamonds', 'queenDiamonds', 'kingDiamonds'],
	cardValues: {'aceClubs': 11, 'twoClubs': 2, 'threeClubs': 3, 'fourClubs': 4, 'fiveClubs': 5, 'sixClubs': 6, 'sevenClubs': 7, 'eightClubs': 8, 'nineClubs': 9, 'tenClubs': 10, 'jackClubs': 10, 'queenClubs': 10, 'kingClubs': 10, 'aceSpades': 11, 'twoSpades': 2, 'threeSpades': 3, 'fourSpades': 4, 'fiveSpades': 5, 'sixSpades': 6, 'sevenSpades': 7, 'eightSpades': 8, 'nineSpades': 9, 'tenSpades': 10, 'jackSpades': 10, 'queenSpades': 10, 'kingSpades': 10, 'aceHearts': 11, 'twoHearts': 2, 'threeHearts': 3, 'fourHearts': 4, 'fiveHearts': 5, 'sixHearts': 6, 'sevenHearts': 7, 'eightHearts': 8, 'nineHearts': 9, 'tenHearts': 10, 'jackHearts': 10, 'queenHearts': 10, 'kingHearts': 10, 'aceDiamonds': 11, 'twoDiamonds': 2, 'threeDiamonds': 3, 'fourDiamonds': 4, 'fiveDiamonds': 5, 'sixDiamonds': 6, 'sevenDiamonds': 7, 'eightDiamonds': 8, 'nineDiamonds': 9, 'tenDiamonds': 10, 'jackDiamonds': 10, 'queenDiamonds': 10, 'kingDiamonds': 10},
//Generates a random number between 0 and 51 and returns a card object from the cards array.
	randomCard: function() {
		var card = Math.floor((Math.random()*51)+1);
		return deck.cards[card];
	},
//Takes a card as an argument and returns the corresponding value.
	calcScore: function(card) {
		return deck.cardValues[card];
	}
};
var player = {
	bank: 500,
	score: 0,
	playerHand: [],
	playerAces: ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'],
	printBank: function() {
		return $("<h1>$ " + player.bank + "</h1>").appendTo('.bank');
	},
	dealHand: function() {
		if (deck.dealt === false) {
			player.playerHand = [deck.randomCard(), deck.randomCard()];
			player.score = deck.calcScore(player.playerHand[0]) + deck.calcScore(player.playerHand[1]);
			var aceCheckResult = gameLogic.aceCheck(player.playerHand, player.score, player.playerAces);
			player.score = aceCheckResult[0];
			player.playerAces = aceCheckResult[1];
			$("<h3>Your Hand: " + player.score + "</h3>").appendTo('#displayPlayerScore');
			$("<i class=card-" + player.playerHand[0] +"></i><i class=card-" + player.playerHand[1] +"></i>").appendTo('.playerHand');
		}
	},
/* Generates a random card, pushes that card onto the playerHand array, adds the card value to player's score,
re-generates and displays the entire player hand on screen, calculates if the hit resulted in a player bust.
*/
	hit: function() {
		if (deck.dealt === false) {
			return null;
		}
		else {
			var newCard = deck.randomCard();
			player.score += deck.calcScore(newCard);
			player.playerHand.push(newCard);
			var aceCheckResult = gameLogic.aceCheck(player.playerHand, player.score, player.playerAces);
			player.score = aceCheckResult[0];
			player.playerAces = aceCheckResult[1];
			$('#displayPlayerScore').empty();
			$("<h3>Your Hand: " + player.score + "</h3>").appendTo('#displayPlayerScore');
			$("<i class=card-" + newCard +"></i>").appendTo('.playerHand');
			return gameLogic.calcBust(player.score, dealer.score);
		}
	}
};
var dealer = {
	bank: 500,
	score: 0,
	dealerHand: [],
	dealerAces: ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'],
	dealHand: function() {
		if (deck.dealt === false) {
			deck.dealt = true;
			dealer.dealerHand = [deck.randomCard(), deck.randomCard()]
			dealer.score = deck.calcScore(dealer.dealerHand[0]) + deck.calcScore(dealer.dealerHand[1]);
			var aceCheckResult = gameLogic.aceCheck(dealer.dealerHand, dealer.score, dealer.dealerAces);
			dealer.score = aceCheckResult[0];
			dealer.dealerAces = aceCheckResult[1];
			$("<h3>Dealer Hand: ?</h3>").appendTo('#displayDealerScore');
			$("<i class=card-" + dealer.dealerHand[0] + "></i> <img src='img/cardBack.png'></img>").appendTo('.dealerHand');
		}
	},
/*Generates a random card, pushes that card onto the dealerHand array, adds the card value to dealer's score,
re-generates and displays the entire dealer hand on screen.
*/
	hit: function() {
		if (deck.dealt === true) {
			var newCard = deck.randomCard();
			dealer.score += deck.calcScore(newCard);
			dealer.dealerHand.push(newCard);
			var aceCheckResult = gameLogic.aceCheck(dealer.dealerHand, dealer.score, dealer.dealerAces);
			dealer.score = aceCheckResult[0];
			dealer.dealerAces = aceCheckResult[1];
		}
	},
	showHand: function() {
		$('.dealerHand, #displayDealerScore').empty();
		$("<h3>Dealer Hand: " + dealer.score + "</h3>").appendTo('#displayDealerScore');
		for (i=0; i<dealer.dealerHand.length; i++) {
			$("<i class=card-" + dealer.dealerHand[i] + ">").appendTo('.dealerHand');
		}
	}
};
var gameLogic = {
	aceCheck: function(hand, score, aces) {
		//For each card in the hand
		for (var y=0; y<hand.length; y++) {
			//Check to see if one is an Ace
			for (var i=0; i<aces.length; i++) {
			//If the hand has an ace and has just busted, subtracts 10 from hands's score to make the Ace count for 1 instead of 11 and removes that ace from subsequent ace checks.
				if ((hand[y] === aces[i]) && ((score) > 21)) {
					aces.splice(i,1);
					score -= 10;
				}
			}
		}
		return [score, aces];
	},
//Calculates if either player goes over 21 and busts. This function is called when each card is dealt.
	calcBust: function(playerScore, dealerScore) {
		if (playerScore > 21) {
			$("<div id='playerLose'>Player Lost!</div>").appendTo('#lPlayer');
			$("<div id='dealerWin'>Dealer Wins!</div>").appendTo('#wDealer');
			//WTF ACTUALLY why won't this call?
			dealer.showHand();
			alert("Bust! You lose.");
			gameLogic.reset();
		}
		else if (dealerScore > 21) {
			$("<div id='playerWin'>Player Wins!</div>").appendTo('#wPlayer');
			$("<div id='dealerLost'>Dealer Lost!</div>").appendTo('#lDealer');
			alert("Dealer Busts. You Win!");
			gameLogic.reset();
		}
		else {
			return null;
		}
	},
//Calculates who wins once the player decides to stand.
	calcWinner: function(playerScore, dealerScore) {
		if (playerScore > 21) {
			$("<div id='playerLose'>Player Lost!</div>").appendTo('#lPlayer');
			$("<div id='dealerWin'>Dealer Wins!</div>").appendTo('#wDealer');
			alert("Bust! You Lose!");
			gameLogic.reset();
		}
		else if (dealerScore > 21) {
			$("<div id='playerWin'>Player Wins!</div>").appendTo('#wPlayer');
			$("<div id='dealerLost'>Dealer Lost!</div>").appendTo('#lDealer');
			alert("Dealer Busts! You win!");
			gameLogic.reset();
		}
		else if (playerScore === dealerScore) {
			$("<div id='playerTied'>You Tied!</div>").appendTo('#pTied');
			$("<div id='dealerTied'>You Tied!</div>").appendTo('#dTied');
			alert("Tie!");
			gameLogic.reset();
		}
		else if (playerScore > dealerScore) {
			$("<div id='playerWin'>Player Wins!</div>").appendTo('#wPlayer');
			$("<div id='dealerLost'>Dealer Lost!</div>").appendTo('#lDealer');
			alert("You win!");
			gameLogic.reset();
		}
		else {
			$("<div id='playerLose'>Player Lost!</div>").appendTo('#lPlayer');
			$("<div id='dealerWin'>Dealer Wins!</div>").appendTo('#wDealer');
			alert("You lose!");
			gameLogic.reset();
		}
	},
//Once player stands, it is the dealer's turn to hit if dealer score is less than 17.
	stand: function() {
		if (deck.dealt === false) {
			return null;
		}
		else {
			while (dealer.score < 17) {
				dealer.hit();
			}
		dealer.showHand();
		}
		return gameLogic.calcWinner(player.score, dealer.score);
	},
//Resets all critical game components and UI elements to prepare for a fresh hand of blackjack.
	reset: function() {
		$('.playerHand, .dealerHand, #displayPlayerScore, #displayDealerScore, #wPlayer, #lPlayer, #wDealer, #lDealer, #pTied, #dTied').empty();
		deck.dealt = false;
		player.playerAces = ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'],
		dealer.dealerAces = ['aceClubs', 'aceSpades', 'aceHearts', 'aceDiamonds'],
		player.score = 0;
		dealer.score = 0;
	}
};
}());