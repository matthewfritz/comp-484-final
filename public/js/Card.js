"use strict";

/**
 * Represents a card within a deck.
 *
 * @author Matthew Fritz <mattf@burbankparanormal.com>
 */
class Card {
	/**
	 * Constructs a new Card object with the given value and suit.
	 *
	 * @param int value The value of the card
	 * @param string suit The suit of the card
	 */
	constructor(value, suit) {
		this.value = value;
		this.suit = suit;
	}

	/**
	 * Compares this Card to another Card. Returns 1 if the value of this Card
	 * is greater than the parameter card. Returns -1 if the value of this Card
	 * is less than the parameter Card. Returns 0 if the values match.
	 *
	 * @param Card card The Card object to compare against
	 * @return int
	 */
	compareTo(card) {
		if(this.value > card.value) return 1;
		if(this.value < card.value) return -1;
		return 0;
	}

	/**
	 * Generates the image coordinates for this card on the sprite sheet.
	 * Returns a JSON object describing the X-Y coordinates of the image in the
	 * sprite sheet.
	 *
	 * @return JSON describing the coordinates of the image in the sprite sheet
	 */
	generateCardImageCoords() {
		let col = (this.value - 2);
		let row = 0;
		let offset = 0;

		// figure out what the row should be
		if(this.suit == Card.HEART) {
			row = 0;
		}
		else if(this.suit == Card.DIAMOND) {
			row = 1;
			offset = 2;
		}
		else if(this.suit == Card.CLUB) {
			row = 2;
			offset = 4;
		}
		else if(this.suit == Card.SPADE) {
			row = 3;
			offset = 5;
		}
		else if(this.value == Card.NO_VALUE && this.suit == Card.CARD_BACK) {
			// image of the back of the cards
			col = 0;
			row = 4;
			offset = 7;
		}

		// figure out the X and Y pixel coordinates of the image to retrieve;
		// calculated by the pixel position of the column and row plus an offset
		let x = (col * 81 * -1);
		let y = ((row * 119) * -1) + offset;

		return {"x": x, "y": y};
	}

	/**
	 * Returns an invalid card value. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get NO_VALUE() {
		return 0;
	}

	/**
	 * Returns the value of a Two. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get TWO() {
		return 2;
	}

	/**
	 * Returns the value of a Three. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get THREE() {
		return 3;
	}

	/**
	 * Returns the value of a Four. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get FOUR() {
		return 4;
	}

	/**
	 * Returns the value of a Five. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get FIVE() {
		return 5;
	}

	/**
	 * Returns the value of a Six. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get SIX() {
		return 6;
	}

	/**
	 * Returns the value of a Seven. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get SEVEN() {
		return 7;
	}

	/**
	 * Returns the value of an Eight. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get EIGHT() {
		return 8;
	}

	/**
	 * Returns the value of a Nine. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get NINE() {
		return 9;
	}

	/**
	 * Returns the value of a Ten. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get TEN() {
		return 10;
	}

	/**
	 * Returns the value of a Jack. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get JACK() {
		return 11;
	}

	/**
	 * Returns the value of a Queen. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get QUEEN() {
		return 12;
	}

	/**
	 * Returns the value of a King. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get KING() {
		return 13;
	}

	/**
	 * Returns the value of an Ace. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get ACE() {
		return 14;
	}

	/**
	 * Returns the value of a Heart suit. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get HEART() {
		return 'h';
	}

	/**
	 * Returns the value of a Diamond suit. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get DIAMOND() {
		return 'd';
	}

	/**
	 * Returns the value of a Club suit. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get CLUB() {
		return 'c';
	}

	/**
	 * Returns the value of a Spade suit. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get SPADE() {
		return 's';
	}

	/**
	 * Returns the value of a card back suit. This is defined as a static getter to mimic
	 * the functionality of class constants from other languages.
	 *
	 * @return int
	 */
	static get CARD_BACK() {
		return 'back';
	}
}