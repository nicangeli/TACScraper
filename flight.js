var $ 		= 	require('cheerio'),
	request =	require('request'),
	_ 		= 	require('underscore');

module.exports = function() {

	this.average = function(game_number, agent_name, callback) {
		var baseUrl = "http://tac.ecs.soton.ac.uk:8080/history/";
		
		request(baseUrl + game_number + '/', function(err, res, html) {
			if(err)
				throw err;

			var transactionNames = [],
				transactionDay = [],
				transactionBuyer = [],
				transactionQuantity = [],
				transactionPrice = [],
				transactions = [];


			var parsedHtml = $.load(html); // put html into cheerio

			parsedHtml('tr :nth-child(2)').each(function(i, row) { // the auction name 
				if(i > 9)
					transactionNames.push($(row).text());
			});

			parsedHtml('tr :nth-child(3)').each(function(i, row) { // auction day
				if(i > 9)
					transactionDay.push($(row).text());
			});

			parsedHtml('tr :nth-child(4)').each(function(i, row) { // auction buyer
				if(i > 9)
					transactionBuyer.push($(row).text());
			});

			parsedHtml('tr :nth-child(6)').each(function(i, row) { // purchased quantity
				if(i > 0)
					transactionQuantity.push($(row).text());
			});

			parsedHtml('tr :nth-child(7)').each(function(i, row) { // single purchase price
				if (i > 0)
					transactionPrice.push($(row).text());
			});

			// got all of the details from the html page url now into arrays for name, day etc

			// now lets just get the hotels as that's all i care about
			transactionNames.forEach(function(element, index) {
				if(element === "InFlight" || element === "OutFlight") {
					// these are the ones we want, hotels. lets save them. 
					var transaction = new Object();
					transaction.flight = element;
					transaction.day = transactionDay[index];
					transaction.buyer = transactionBuyer[index];
					transaction.quantity = parseFloat(transactionQuantity[index]);
					transaction.price = parseFloat(transactionPrice[index]);
					transactions.push(transaction);
				} 
			});

			// work out the average hotel buying price overall
			var total = 0, // overall total price
				totalQuantity = 0, // overall total quantity
				myTotal = 0, // just agent process.argv[2]'s total price
				myQuantity = 0; // just agent process.argv[2] quantity

			transactions.forEach(function(transaction, i) {
				totalQuantity += transaction.quantity;
				total += transaction.quantity * transaction.price;
				if(transaction.buyer == agent_name) {
					myQuantity += transaction.quantity;
					myTotal += transaction.quantity * transaction.price;
				}
			});

			callback(total/totalQuantity, myTotal/myQuantity);
		});
	}

	this.getGames = function(agent_name, callback) {

		var baseUrl = "http://tac.ecs.soton.ac.uk:8080/history/";
		_.range(457, 493).forEach(function(game_number) {
			request(baseUrl + game_number + '/', function(err, res, html) {
				if (err)
					throw err;
				var parsedHtml = $.load(html);
				parsedHtml('td:nth-child(1)').each(function(index, element) {
					if(index < 8) {
						if($(element).text() === agent_name) {
							callback(game_number);
						}
					}
				})
			})
		});
	}

}