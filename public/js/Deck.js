"use strict";

/**
 * Represents a deck containing cards.
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
		return ["h", "d", "c", "s"];
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
		var values = [];
		for(var value = 0; value < 13; value++) {
			values.push(value + 2);
		}
		return values;
	}
}