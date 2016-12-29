"use strict";

/**
 * Represents a deck containing cards. This must be included AFTER the
 * inclusion of the Card class.
 *
 * @author Matthew Fritz <mattf@burbankparanormal.com>
 */
class Deck {
	/**
	 * Constructs a new Deck containing the number of decks in the shoe.
	 *
	 * @param int numDecks The number of decks within the shoe
	 */
	constructor(numDecks) {
		var allSuits = Deck.generateAllSuits();
		var allValues = Deck.generateAllValues();

		this.cards = [];
		for(var deck = 0; deck < numDecks; deck++) {
			for(var suit = 0; suit < allSuits.length; suit++) {
				for(var value = 0; value < allValues.length; value++) {
					this.cards.push(new Card(allValues[value], allSuits[suit]));
				}
			}
		}
	}

	/**
	 * Generates and returns an array of all possible suits in a Deck. The values
	 * are single-character strings representing the suit.
	 *
	 * @return array
	 */
	static generateAllSuits() {
		return [
			Card.HEART,
			Card.DIAMOND,
			Card.CLUB,
			Card.SPADE
		];
	}

	/**
	 * Generates and returns an array of all possible values in a Deck. The values
	 * begin with a 2 and end with an Ace (14) to help with the numeric representation
	 * of the cards on the sprite sheet.
	 *
	 * NOTE: the array itself is zero-indexed.
	 *
	 * @return array
	 */
	static generateAllValues() {
		return [
			Card.TWO,
			Card.THREE,
			Card.FOUR,
			Card.FIVE,
			Card.SIX,
			Card.SEVEN,
			Card.EIGHT,
			Card.NINE,
			Card.TEN,
			Card.JACK,
			Card.QUEEN,
			Card.KING,
			Card.ACE
		];
	}
}