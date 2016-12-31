"use strict";

/**
 * Represents a deck shoe containing cards. This must be included AFTER the
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
		this.numDecks = numDecks;
		
		// build the shoe
		this.cards = this.buildShoe(numDecks);

		// shuffle the cards in the shoe
		this.shuffle();
	}

	/**
	 * Builds a shoe containing the number of necessary decks in the shoe.
	 *
	 * @param int numDecks The number of decks within the shoe
	 * @return array
	 */
	buildShoe(numDecks) {
		var allSuits = Deck.generateAllSuits();
		var allValues = Deck.generateAllValues();
		var cards = [];

		for(var deck = 0; deck < numDecks; deck++) {
			for(var suit = 0; suit < allSuits.length; suit++) {
				for(var value = 0; value < allValues.length; value++) {
					cards.push(new Card(allValues[value], allSuits[suit]));
				}
			}
		}

		return cards;
	}

	/**
	 * Returns how many cards are left in the shoe.
	 *
	 * @return int
	 */
	cardsLeft() {
		return this.cards.length;
	}

	/**
	 * Draws and returns a Card from the shoe. If there are no more cards left, the
	 * shoe is generated again, shuffled, and a card is drawn from it.
	 *
	 * @return Card
	 */
	draw() {
		if(this.cardsLeft() == 0) {
			// generate and shuffle a new shoe
			this.cards = this.buildShoe(this.numDecks);

			// shuffle the cards in the shoe
			this.shuffle();
		}

		// draw the next card from the top of the shoe
		return this.cards.shift();
	}

	/**
	 * Shuffles all the cards in the shoe.
	 */
	shuffle() {
		this.cards.sort(function(a, b) {
			return 0.5 - Math.random();
		});
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