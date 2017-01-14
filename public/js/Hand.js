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
	 * Compares this Hand to another Hand. Returns 1 if the value of this Hand
	 * is greater than the parameter hand. Returns -1 if the value of this Hand
	 * is less than the parameter Hand. Returns 0 if the values match.
	 *
	 * @param Hand hand The Hand object to compare against
	 * @return int
	 */
	compareTo(hand) {
		// compare hands
		let thisScore = this.scoreHand();
		let otherScore = hand.scoreHand();

		// if there is a difference, return the difference
		if(thisScore > otherScore) return 1;
		if(thisScore < otherScore) return -1;

		// The hands are the same so we now need to compare hand combinations as
		// well as the kicker card sets; we need to sort the card totals from both
		// hands in order to get the sets and their matching card values.
		//
		// However, we are going to iterate over the arrays in reverse to perform
		// the comparisons in descending order.
		this.sortCardTotals();
		hand.sortCardTotals();

		// retrieve the cards and the matching totals
		let theseCards = this.getCards();
		let otherCards = hand.getCards();
		let theseTotals = this.getCardTotals();
		let otherTotals = hand.getCardTotals();

		// we care about card sets only in certain hands and then sequences in
		// all other hands; this will help us determine kicker cards
		if(thisScore == Hand.FOUR_OF_A_KIND || 
			thisScore == Hand.FULL_HOUSE || 
			thisScore == Hand.THREE_OF_A_KIND || 
			thisScore == Hand.TWO_PAIR || 
			thisScore == Hand.PAIR) {
			for(let i = theseTotals.length-1; i >= 0; i--) {
				let comparison = theseTotals[i].value - otherTotals[i].value;

				// if the card set from this hand is greater than the set in the
				// opposing hand, this hand beats the opposing hand
				if(comparison > 0) return 1;

				// if the card set from this hand is weaker than the set in the
				// opposing hand, the opposing hand beats this hand
				if(comparison < 0) return -1;
			}

			// we're in a tie, so fall through to determine the winning hand based
			// on the sequence rules (i.e. sort all cards by value in ascending order
			// and then iterate over them in reverse) since we now need to determine
			// the comparisons between kicker cards
		}

		// we're determining scores based on sequences
		for(let i = theseCards.length-1; i >= 0; i--) {
			let comparison = theseCards[i].compareTo(otherCards[i]);

			// if the card from this hand is greater than the matching card in the
			// opposing hand, this hand beats the opposing hand
			if(comparison > 0) return 1;

			// if the card from this hand is weaker than the matching card in the
			// opposing hand, the opposing hand beats this hand
			if(comparison < 0) return -1;
		}

		// all cards in both hands match in value so the hand is a solid tie
		return 0;
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
	 * Returns the array of cards in this hand.
	 *
	 * @return array
	 */
	getCards() {
		return this.cards;
	}

	/**
	 * Returns the array of card totals in this hand.
	 *
	 * @return array
	 */
	getCardTotals() {
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
			return Hand.ROYAL_FLUSH;
		}
		else if(this.isStraightFlush()) {
			return Hand.STRAIGHT_FLUSH;
		}
		else if(this.isFourOfAKind()) {
			return Hand.FOUR_OF_A_KIND;
		}
		else if(this.isFullHouse()) {
			return Hand.FULL_HOUSE;
		}
		else if(this.isFlush()) {
			return Hand.FLUSH;
		}
		else if(this.isStraight()) {
			return Hand.STRAIGHT;
		}
		else if(this.isThreeOfAKind()) {
			return Hand.THREE_OF_A_KIND;
		}
		else if(this.isTwoPair()) {
			return Hand.TWO_PAIR;
		}
		else if(this.isPair()) {
			return Hand.PAIR;
		}

		// no hand
		return Hand.NO_VALUE;
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
	 * Sorts the card totals in ascending order based on their totals. Card
	 * totals with a higher number of total cards per set appear last.
	 */
	sortCardTotals() {
		this.cardTotals.sort(function(total1, total2) {
			if(total1.total > total2.total) return 1;
			if(total1.total < total2.total) return -1;
			return 0;
		});
	}

	/**
	 * Returns an invalid Hand value. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get NO_VALUE() {
		return 0;
	}

	/**
	 * Returns the value of a Pair. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get PAIR() {
		return 1;
	}

	/**
	 * Returns the value of Two Pair. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get TWO_PAIR() {
		return 2;
	}

	/**
	 * Returns the value of Three of a Kind. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get THREE_OF_A_KIND() {
		return 3;
	}

	/**
	 * Returns the value of a Straight. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get STRAIGHT() {
		return 4;
	}

	/**
	 * Returns the value of a Flush. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get FLUSH() {
		return 5;
	}

	/**
	 * Returns the value of a Full House. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get FULL_HOUSE() {
		return 6;
	}

	/**
	 * Returns the value of Four of a Kind. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get FOUR_OF_A_KIND() {
		return 7;
	}

	/**
	 * Returns the value of a Straight Flush. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get STRAIGHT_FLUSH() {
		return 8;
	}

	/**
	 * Returns the value of a Royal Flush. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get ROYAL_FLUSH() {
		return 9;
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