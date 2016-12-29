<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('pages.auth.login');
});

// visual tests (beginning with /tests)
Route::group(['prefix' => 'tests'], function() {

	// /tests/display-cards
	Route::get('display-cards', function() {
		return view('pages.tests.test-display-cards');
	});

	// /tests/display-deck
	Route::get('display-deck', function() {
		return view('pages.tests.test-display-deck');
	});

	// /tests/display-hand
	Route::get('display-hand', function() {
		return view('pages.tests.test-display-hand');
	});

});