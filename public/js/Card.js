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
		if(this.suit == "h") {
			row = 0;
		}
		else if(this.suit == "d") {
			row = 1;
			offset = 2;
		}
		else if(this.suit == "c") {
			row = 2;
			offset = 4;
		}
		else if(this.suit == "s") {
			row = 3;
			offset = 5;
		}
		else if(this.value == 0 && this.suit == "back") {
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
}