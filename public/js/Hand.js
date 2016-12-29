"use strict";

/**
 * Represents a hand containing a set of cards. This must be included AFTER the
 * inclusion of the Card class.
 *
 * @author Matthew Fritz <mattf@burbankparanormal.com>
 */
class Hand {
	/**
	 * Constructs a new Hand with an array of Card objects.
	 *
	 * @param array cards The array of Card objects
	 */
	constructor(cards) {
		// duplicates the array of cards to prevent by-reference problems
		this.cards = cards.slice();
	}

	/**
	 * Generates and returns the totals of how often values occur in the cards.
	 *
	 * NOTE: This function also sets the member variable. It generates an array of
	 * objects with two properties each: "value" and "total".
	 *
	 * @return array
	 */
	generateCardTotals() {
		this.cardTotals = [];

		for(let card of this.cards) {
			var index = this.cardTotals.findIndex(function(element) {
				return element.value == card.value;
			});

			if(index == -1) {
				this.cardTotals.push({
					value: card.value,
					total: 1
				});
			}
			else
			{
				this.cardTotals[index].total++;
			}
		}

		return this.cardTotals;
	}

	/**
	 * Returns a boolean matching whether this hand is a pair.
	 *
	 * @return boolean
	 */
	isPair() {
		for(let totalPair of this.cardTotals) {
			if(totalPair.total == 2) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns a boolean matching whether this hand is two pairs.
	 *
	 * @return boolean
	 */
	isTwoPair() {
		let pairCount = 0;
		for(let totalPair of this.cardTotals) {
			if(totalPair.total == 2) {
				pairCount++;
			}
		}

		return (pairCount == 2);
	}

	/**
	 * Returns a boolean matching whether this hand is three of a kind.
	 *
	 * @return boolean
	 */
	isThreeOfAKind() {
		for(let totalThree of this.cardTotals) {
			if(totalThree.total == 3) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns a boolean matching whether this hand is a straight.
	 *
	 * @return boolean
	 */
	isStraight() {
		// take into account the special case of a 2-3-4-5-A sequence
		if(this.cards[0].value == Card.TWO &&
			this.cards[1].value == Card.THREE &&
			this.cards[2].value == Card.FOUR &&
			this.cards[3].value == Card.FIVE &&
			this.cards[4].value == Card.ACE) {
			return true;
		}

		// let's just work on a standard straight now
		let prevValue = 0;
		let difference = 0;
		for(let card of this.cards) {
			// depending on the previous card value, a straight would
			// mean a displacement of 1 every single iteration
			if(prevValue > 0) {
				difference = Math.abs(card.value - prevValue);
				if(difference != 1) {
					// ensure the displacement is equal to 1
					return false;
				}
			}

			// set the previous value for the next iteration of the loop
			prevValue = card.value;
		}

		// all displacements were equal to 1 so it's a straight
		return true;
	}

	/**
	 * Returns a boolean matching whether this hand is a flush.
	 *
	 * @return boolean
	 */
	isFlush() {
		// iterate over the cards to check for the same suit in all
		let currentSuit = "";
		for(let card of this.cards) {
			if(currentSuit == "") {
				// no suit yet, so set the running suit
				currentSuit = card.suit;
			}
			else
			{
				// if the suit for this card is not the same as the current
				// running suit, we do not have a flush
				if(currentSuit != card.suit) {
					return false;
				}
			}
		}

		// all suits are the same so it's a flush
		return true;
	}

	/**
	 * Returns a boolean matching whether this hand is a full house.
	 *
	 * @return boolean
	 */
	isFullHouse() {
		return (this.isThreeOfAKind() && this.isPair());
	}

	/**
	 * Returns a boolean matching whether this hand is four of a kind.
	 *
	 * @return boolean
	 */
	isFourOfAKind() {
		for(let totalFour of this.cardTotals) {
			if(totalFour.total == 4) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Returns a boolean matching whether this hand is a straight flush.
	 *
	 * @return boolean
	 */
	isStraightFlush() {
		return (this.isStraight() && this.isFlush());
	}

	/**
	 * Returns a boolean matching whether this hand is a royal flush.
	 *
	 * @return boolean
	 */
	isRoyalFlush() {
		let numCards = this.cards.length;

		// a royal flush is a special type of straight flush
		if(this.isStraight() && this.isFlush()) {
			// since the cards have already been sorted the check for
			// the card sequence is fairly simple now; the sequence
			// in our game goes 10-J-Q-K-A
			if(this.cards[0].value == Card.TEN &&
				this.cards[numCards-1].value == Card.ACE) {
				return true;
			}
		}

		// does not meet the initial requirements as a straight flush
		return false;
	}

	/**
	 * Scores and returns an integer matching the value of the hand.
	 *
	 * @return int
	 */
	scoreHand() {
		// sort the cards first
		this.sortCards();

		// generate the card totals
		this.generateCardTotals();

		// figure out the possible scores for the hands
		if(this.isRoyalFlush()) {
			return 9;
		}
		else if(this.isStraightFlush()) {
			return 8;
		}
		else if(this.isFourOfAKind()) {
			return 7;
		}
		else if(this.isFullHouse()) {
			return 6;
		}
		else if(this.isFlush()) {
			return 5;
		}
		else if(this.isStraight()) {
			return 4;
		}
		else if(this.isThreeOfAKind()) {
			return 3;
		}
		else if(this.isTwoPair()) {
			return 2;
		}
		else if(this.isPair()) {
			return 1;
		}

		// no hand
		return 0;
	}

	/**
	 * Sorts the cards in ascending order based on their value.
	 */
	sortCards() {
		this.cards.sort(function(card1, card2) {
			return card1.compareTo(card2);
		});
	}

	/**
	 * Generate and returns an array of all possible hands (including no hand).
	 *
	 * @return array
	 */
	static generatePossibleHands() {
		return [
			"Nothing",
			"Pair",
			"Two Pair",
			"Three of a Kind",
			"Straight",
			"Flush",
			"Full House",
			"Four of a Kind",
			"Straight Flush",
			"Royal Flush"
		];
	}
}