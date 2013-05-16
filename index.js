var hotel = require('./hotel_prices'),
	flights = require('./flight'),
	flight_prices = require('./flight_prices');

var h = new hotel();
h.getGames(process.argv[2], function(game_number) {
	h.average(game_number, process.argv[2], function(overall, myAverage) {
		console.log(game_number + ' Overall Average: ' + overall);
		console.log(game_number + ' ' + process.argv[2] + ' Average: ' + myAverage);
	});
});

var f = new flights();
h.getGames(process.argv[2], function(game_number) {
	h.average(game_number, process.argv[2], function(overall, myAverage) {
		console.log(game_number + ' Overall Average: ' + overall);
		console.log(game_number + ' ' + process.argv[2] + ' Average: ' + myAverage);
	});
});

var fp = new flight_prices();
h.getGames(process.argv[2], function(game_number) {
	h.average(game_number, process.argv[2], function(overall, myAverage) {
		console.log(game_number + ' Overall Average: ' + overall);
		console.log(game_number + ' ' + process.argv[2] + ' Average: ' + myAverage);
	});
});