@extends("layouts.master")

@section("title")
Test Generating Decks
@stop

@section("content")

<h1>Test Generating Decks</h1>

<p>Check the browser console.</p>

<p>A shoe of a single deck has been generated as well as a shoe of multiple decks.</p>

@stop

@section("page-scripts")
<script type="text/javascript">
	console.log("Generating a single deck...");
	var singleDeck = new Deck(1);
	console.log(singleDeck);

	console.log("Generating multiple decks...");
	var multipleDecks = new Deck(3);
	console.log(multipleDecks);
</script>
@stop