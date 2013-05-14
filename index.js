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
		transactionPrice = [];

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
	transactionNames.each(function(index, element) {
		console.log(element);
	})
});