var hotel = require('./hotel_prices');





var h = new hotel();
/*h.average(457, function(overall, myagent) {
	console.log('Overall hotel price: ' + overall);
	console.log(process.argv[2] + ' hotel price: ' + myagent);
})
*/
h.getGames('TacOBell', function(myGames) {
	console.log(myGames);
});