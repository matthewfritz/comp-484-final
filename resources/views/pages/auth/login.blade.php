@extends("layouts.master")

@section("title")
Networked Poker - Login
@stop

@section("content")
HELLO
@stop

@section("page-scripts")
<script type="text/javascript">
var socket = io(socket_host + '/' + socket_ns);
</script>
@stop