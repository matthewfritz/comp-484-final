<!DOCTYPE html>
<html>

<head>
	<title>
	@yield("title", "Networked Poker")
	</title>

	<!-- Application CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css" integrity="sha384-AysaV+vQoT3kOAXZkl02PThvDr8HYKPZhNT5h/CXfBThSRXQ6jW5DO2ekP5ViFdi" crossorigin="anonymous">
	@yield("page-styles", "")

	<!-- Application JavaScript -->
	<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js" integrity="sha384-BLiI7JTZm+JWlgKa0M0kGRpJbF2J8q+qreVrKBC47e3K6BW78kGLrCkeRX6I9RoK" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.2/socket.io.js"></script>

	<!-- Socket configuration -->
	<script type="text/javascript">
	var socket_host = '{{ env('SOCKET_HOST') }}';
	var socket_ns = '{{ env('SOCKET_NAMESPACE') }}';
	</script>

</head>

<body>

ASS

@yield("content", "")

@yield("page-scripts", "")

</body>

</html>