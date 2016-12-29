@extends("layouts.master")

@section("title")
Test Displaying Cards
@stop

@section("content")

<h1>Test Displaying Cards</h1>

Should be 9 of hearts:
<div id="card-nine-hearts" style="width:81px;height:119px;">
</div>

Should be King of Diamonds:
<div id="card-king-diamonds" style="width:81px;height:119px;">
</div>

Should be 3 of Clubs:
<div id="card-three-clubs" style="width:81px;height:119px;">
</div>

Should be Ace of Spades:
<div id="card-ace-spades" style="width:81px;height:119px;">
</div>

Should be the back of the cards:
<div id="card-back" style="width:81px;height:119px;">
</div>

@stop

@section("page-scripts")
<script type="text/javascript">
	var nine_hearts = new Card(Card.NINE, Card.HEART);
	var king_diamonds = new Card(Card.KING, Card.DIAMOND);
	var three_clubs = new Card(Card.THREE, Card.CLUB);
	var ace_spades = new Card(Card.ACE, Card.SPADE);
	var card_back = new Card(Card.NO_VALUE, Card.CARD_BACK);

	var coords_nine_hearts = nine_hearts.generateCardImageCoords();
	var coords_king_diamonds = king_diamonds.generateCardImageCoords();
	var coords_three_clubs = three_clubs.generateCardImageCoords();
	var coords_ace_spades = ace_spades.generateCardImageCoords();
	var coords_card_back = card_back.generateCardImageCoords();

	$(document).ready(function() {
		$("#card-nine-hearts").css("background-image", "url('{{ asset('img/cards.gif') }}')");
		$("#card-nine-hearts").css("background-position", coords_nine_hearts.x + "px " + coords_nine_hearts.y + "px");

		$("#card-king-diamonds").css("background-image", "url('{{ asset('img/cards.gif') }}')");
		$("#card-king-diamonds").css("background-position", coords_king_diamonds.x + "px " + coords_king_diamonds.y + "px");

		$("#card-three-clubs").css("background-image", "url('{{ asset('img/cards.gif') }}')");
		$("#card-three-clubs").css("background-position", coords_three_clubs.x + "px " + coords_three_clubs.y + "px");

		$("#card-ace-spades").css("background-image", "url('{{ asset('img/cards.gif') }}')");
		$("#card-ace-spades").css("background-position", coords_ace_spades.x + "px " + coords_ace_spades.y + "px");

		$("#card-back").css("background-image", "url('{{ asset('img/cards.gif') }}')");
		$("#card-back").css("background-position", coords_card_back.x + "px " + coords_card_back.y + "px");
	});
</script>
@stop