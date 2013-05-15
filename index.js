var hotel = require('./hotel_prices');





var h = new hotel();
h.getGames('TacOBell', function(game_number) {
	h.average(game_number, function(overall, myAverage) {
		console.log(game_number + ' Overall Average: ' + overall);
		console.log(game_number + ' ' + process.argv[2] + ' Average: ' + myAverage);
	});
});