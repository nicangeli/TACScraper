var hotel = require('./hotel_prices');



// Games start from id 457 and end at 492

var h = new hotel();
h.average(457, function(overall, myagent) {
	console.log('Overall hotel price: ' + overall);
	console.log(process.argv[2] + ' hotel price: ' + myagent);
})