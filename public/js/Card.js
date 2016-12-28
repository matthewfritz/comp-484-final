/**
 * Generates the image coordinates for a card with the matching value and suit.
 * Returns a JSON object describing the X-Y coordinates of the image in the
 * sprite sheet.
 *
 * @param int value The value of the card
 * @param string suit The suit of the card
 *
 * @return JSON describing the coordinates of the image in the sprite sheet
 */
function generateCardImageCoords(value, suit) {
	let col = (value - 2);
	let row = 0;
	let offset = 0;

	// figure out what the row should be
	if(suit == "h") {
		row = 0;
	}
	else if(suit == "d") {
		row = 1;
		offset = 2;
	}
	else if(suit == "c") {
		row = 2;
		offset = 4;
	}
	else if(suit == "s") {
		row = 3;
		offset = 5;
	}
	else if(value == 0 && suit == "back") {
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