@extends("layouts.master")

@section("title")
Test Generating Hands
@stop

@section("content")

<h1>Test Generating Hands</h1>

<p>Check the browser console.</p>

<p>A hand has been generated and a new hand has been sorted</p>

<p>The following hands have also been generated and scored:</p>
<ol>
	<li>Pair</li>
	<li>Two Pair</li>
	<li>Three of a Kind</li>
	<li>Straight</li>
	<li>Flush</li>
	<li>Full House</li>
	<li>Four of a Kind</li>
	<li>Straight Flush</li>
	<li>Royal Flush</li>
</ol>

@stop

@section("page-scripts")
<script type="text/javascript">
	var possibleHands = Hand.generatePossibleHands();

	var cards = [
		new Card(Card.TEN, Card.SPADE),
		new Card(Card.KING, Card.SPADE),
		new Card(Card.JACK, Card.SPADE),
		new Card(Card.QUEEN, Card.SPADE),
		new Card(Card.ACE, Card.SPADE)
	];

	console.log("Generating a hand...");
	var hand = new Hand(cards);
	console.log(hand);

	console.log("Sorting a hand...");
	var hand2 = new Hand(cards); // constructor duplicates the cards
	hand2.sortCards();
	console.log(hand2);

	// attempt to result in a Pair
	var cards3 = [
		new Card(Card.TEN, Card.SPADE),
		new Card(Card.KING, Card.SPADE),
		new Card(Card.JACK, Card.SPADE),
		new Card(Card.QUEEN, Card.SPADE),
		new Card(Card.JACK, Card.DIAMOND)
	];
	console.log("Scoring a hand (should be Pair)...");
	var hand3 = new Hand(cards3);
	var score3 = hand3.scoreHand();
	console.log("Score: " + score3 + "; Text: " + possibleHands[score3]);

	// attempt to result in Two Pair
	var cards4 = [
		new Card(Card.NINE, Card.SPADE),
		new Card(Card.NINE, Card.DIAMOND),
		new Card(Card.SEVEN, Card.SPADE),
		new Card(Card.SEVEN, Card.DIAMOND),
		new Card(Card.JACK, Card.DIAMOND)
	];
	console.log("Scoring a hand (should be Two Pair)...");
	var hand4 = new Hand(cards4);
	var score4 = hand4.scoreHand();
	console.log("Score: " + score4 + "; Text: " + possibleHands[score4]);

	// attempt to result in Three of a Kind
	var cards5 = [
		new Card(Card.NINE, Card.SPADE),
		new Card(Card.NINE, Card.DIAMOND),
		new Card(Card.NINE, Card.HEART),
		new Card(Card.SEVEN, Card.DIAMOND),
		new Card(Card.JACK, Card.DIAMOND)
	];
	console.log("Scoring a hand (should be Three of a Kind)...");
	var hand5 = new Hand(cards5);
	var score5 = hand5.scoreHand();
	console.log("Score: " + score5 + "; Text: " + possibleHands[score5]);

	// attempt to result in a Straight
	var cards6 = [
		new Card(Card.THREE, Card.SPADE),
		new Card(Card.FOUR, Card.DIAMOND),
		new Card(Card.FIVE, Card.HEART),
		new Card(Card.SIX, Card.DIAMOND),
		new Card(Card.SEVEN, Card.DIAMOND)
	];
	console.log("Scoring a hand (should be Straight)...");
	var hand6 = new Hand(cards6);
	var score6 = hand6.scoreHand();
	console.log("Score: " + score6 + "; Text: " + possibleHands[score6]);

	// attempt to result in a Flush
	var cards7 = [
		new Card(Card.THREE, Card.SPADE),
		new Card(Card.FOUR, Card.SPADE),
		new Card(Card.FOUR, Card.SPADE),
		new Card(Card.SIX, Card.SPADE),
		new Card(Card.SEVEN, Card.SPADE)
	];
	console.log("Scoring a hand (should be Flush)...");
	var hand7 = new Hand(cards7);
	var score7 = hand7.scoreHand();
	console.log("Score: " + score7 + "; Text: " + possibleHands[score7]);

	// attempt to result in a Full House
	var cards8 = [
		new Card(Card.FOUR, Card.SPADE),
		new Card(Card.FOUR, Card.DIAMOND),
		new Card(Card.FOUR, Card.HEART),
		new Card(Card.NINE, Card.SPADE),
		new Card(Card.NINE, Card.CLUB)
	];
	console.log("Scoring a hand (should be Full House)...");
	var hand8 = new Hand(cards8);
	var score8 = hand8.scoreHand();
	console.log("Score: " + score8 + "; Text: " + possibleHands[score8]);

	// attempt to result in a Four of a Kind
	var cards9 = [
		new Card(Card.ACE, Card.SPADE),
		new Card(Card.ACE, Card.DIAMOND),
		new Card(Card.ACE, Card.HEART),
		new Card(Card.ACE, Card.CLUB),
		new Card(Card.NINE, Card.CLUB)
	];
	console.log("Scoring a hand (should be Four of a Kind)...");
	var hand9 = new Hand(cards9);
	var score9 = hand9.scoreHand();
	console.log("Score: " + score9 + "; Text: " + possibleHands[score9]);

	// attempt to result in a Straight Flush
	var cards10 = [
		new Card(Card.THREE, Card.DIAMOND),
		new Card(Card.FOUR, Card.DIAMOND),
		new Card(Card.FIVE, Card.DIAMOND),
		new Card(Card.SIX, Card.DIAMOND),
		new Card(Card.SEVEN, Card.DIAMOND)
	];
	console.log("Scoring a hand (should be Straight Flush)...");
	var hand10 = new Hand(cards10);
	var score10 = hand10.scoreHand();
	console.log("Score: " + score10 + "; Text: " + possibleHands[score10]);

	// attempt to result in a Royal Flush
	var cards11 = [
		new Card(Card.TEN, Card.SPADE),
		new Card(Card.JACK, Card.SPADE),
		new Card(Card.QUEEN, Card.SPADE),
		new Card(Card.KING, Card.SPADE),
		new Card(Card.ACE, Card.SPADE)
	];
	console.log("Scoring a hand (should be Royal Flush)...");
	var hand11 = new Hand(cards11);
	var score11 = hand11.scoreHand();
	console.log("Score: " + score11 + "; Text: " + possibleHands[score11]);
</script>
@stop