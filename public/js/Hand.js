"use strict";

/**
 * Represents a hand containing a set of cards.
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
	 * Returns a boolean matching whether this hand is at least a pair.
	 *
	 * @return boolean
	 */
	isPair() {
		for(let totalPair of this.cardTotals) {
			if(totalPair.total > 1) {
				return true;
			}
		}

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
		if(this.isPair()) {
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