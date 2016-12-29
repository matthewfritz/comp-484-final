@extends("layouts.master")

@section("title")
Test Generating Hands
@stop

@section("content")

<h1>Test Generating Hands</h1>

<p>Check the browser console.</p>

<p>A hand has been generated and a new hand has been sorted</p>

@stop

@section("page-scripts")
<script type="text/javascript">
	var possibleHands = Hand.generatePossibleHands();

	var cards = [
		new Card(10, 's'),
		new Card(13, 's'),
		new Card(11, 's'),
		new Card(12, 's'),
		new Card(14, 's')
	];

	console.log("Generating a hand...");
	var hand = new Hand(cards);
	console.log(hand);

	console.log("Sorting a hand...");
	var hand2 = new Hand(cards); // constructor duplicates the cards
	hand2.sortCards();
	console.log(hand2);

	var cards3 = [
		new Card(10, 's'),
		new Card(13, 's'),
		new Card(11, 's'),
		new Card(12, 's'),
		new Card(11, 'd')
	];
	console.log("Scoring a hand...");
	var hand3 = new Hand(cards3);
	console.log(hand3);
	var score = hand3.scoreHand();
	console.log("Score: " + score + "; Text: " + possibleHands[score]);
</script>
@stop