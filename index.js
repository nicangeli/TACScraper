var $ 		= 	require('cheerio'),
	request =	require('request');

// Games start from id 457 and end at 492

var url = "http://tac.ecs.soton.ac.uk:8080/history/457/",
	agentNames = [];

request(url, function(err, res, html) {
	if(err)
		throw err;

	var transactionNames = [],
		transactionDay = [],
		transactionBuyer = [],
		transactionQuantity = [],
		transactionPrice = [],
		transactions = [];

	var parsedHtml = $.load(html);
	parsedHtml('tr :nth-child(2)').each(function(i, row) {
		if(i > 9)
			transactionNames.push($(row).text());
	});

	parsedHtml('tr :nth-child(3)').each(function(i, row) {
		if(i > 9)
			transactionDay.push($(row).text());
	});

	parsedHtml('tr :nth-child(4)').each(function(i, row) {
		if(i > 9)
			transactionBuyer.push($(row).text());
	});

	parsedHtml('tr :nth-child(6)').each(function(i, row) {
		if(i > 0)
			transactionQuantity.push($(row).text());
	});

	parsedHtml('tr :nth-child(7)').each(function(i, row) {
		if (i > 0)
			transactionPrice.push($(row).text());
	});

	// got all of the details from the html page url now into arrays for name, day etc

	// now lets just get the hotels as that's all i care about
	transactionNames.forEach(function(element, index) {
		if(element === "TampaTowersHotel" || element === "ShorelineShantyHotel") {
			// these are the ones we want, hotels. lets save them. 
			var transaction = new Object();
			transaction.hotel_name = element;
			transaction.day = transactionDay[index];
			transaction.buyer = transactionBuyer[index];
			transaction.quantity = parseFloat(transactionQuantity[index]);
			transaction.price = parseFloat(transactionPrice[index]);
			transactions.push(transaction);
		} 
	});

	// work out the average hotel buying price overall
	var total = 0; 
	var quantity = 0; 
	transactions.forEach(function(transaction, i) {
		quantity += transaction.quantity;
		total += transaction.quantity * transaction.price;
	});
	console.log('Average Hotel Price: ' + total/quantity);

	// work out our average sellingprice only
	var total = 0; 
	var quantity = 0; 
	transactions.forEach(function(transaction, i) {
		//process.argv[2] will be the name of the agent passed in on the cli
		if(transaction.buyer == process.argv[2]) {
			quantity += transaction.quantity;
			total += transaction.quantity * transaction.price;
		}
	})
	console.log('Our Average Hotel Price: ' + total/quantity);
});