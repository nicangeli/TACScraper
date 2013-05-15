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

			// now lets just get the flights as that's all i care about
			transactionNames.forEach(function(element, index) {
				if(element === "InFlight" || element === "OutFlight") {
					// these are the ones we want, hotels. lets save them. 
					var transaction = new Object();
					transaction.flight = element;
					transaction.day = parseInt(transactionDay[index]);
					transaction.buyer = transactionBuyer[index];
					transaction.quantity = parseFloat(transactionQuantity[index]);
					transaction.price = parseFloat(transactionPrice[index]);
					transactions.push(transaction);
				}
			});

			// work out the average hotel buying price overall
			var inFlight1 = 0,
				inFlight1Quantity = 0,
				inFlight2 = 0,
				inFlight2Quantity = 0,
				inFlight3 = 0, 
				inFlight3Quantity = 0,
				inFlight4 = 0,
				inFlight4Quantity = 0,
				outFlight2 = 0,
				outFlight2Quantity = 0,
				outFlight3 = 0,
				outFlight3Quantity = 0,
				outFlight4 = 0,
				outFlight4Quantity = 0,
				outFlight5 = 0,
				outFlight5Quantity = 0;

			var ourAgentDetails = [[0, 0], [0,0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]; //[total, quantity]

			transactions.forEach(function(transaction, i) {
				if(transaction.flight === "InFlight" && transaction.day == 1) {
					inFlight1 += transaction.quantity * transaction.price;
					inFlight1Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[0][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[0][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "InFlight" && transaction.day == 2) {
					inFlight2 += transaction.quantity * transaction.price;
					inFlight2Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[1][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[1][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "InFlight" && transaction.day == 3) {
					inFlight3 += transaction.quantity * transaction.price;
					inFlight3Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[2][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[2][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "InFlight" && transaction.day == 4) {
					inFlight4 += transaction.quantity * transaction.price;
					inFlight4Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[3][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[3][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "OutFlight" && transaction.day == 2) {
					outFlight2 += transaction.quantity * transaction.price;
					outFlight2Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[4][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[4][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "OutFlight" && transaction.day == 3) {
					outFlight3 += transaction.quantity * transaction.price;
					outFlight3Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[5][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[5][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "OutFlight" && transaction.day == 4) {
					outFlight4 += transaction.quantity * transaction.price;
					outFlight4Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[6][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[6][1] += transaction.quantity; // increate the quantity
					}
				}
				if(transaction.flight === "OutFlight" && transaction.day == 5) {
					outFlight5 += transaction.quantity * transaction.price;
					outFlight5Quantity += transaction.quantity;
					if(transaction.buyer === agent_name) {
						ourAgentDetails[7][0] += transaction.quantity * transaction.price; // update inflight1 total for our agent
						ourAgentDetails[7][1] += transaction.quantity; // increate the quantity
					}
				}

			});
			console.log('GAME: ' + game_number)
				
				console.log('InFlight1 Overall Average: ' + inFlight1/inFlight1Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[0][0]/ourAgentDetails[0][1])
				console.log('InFlight2 Average: ' + inFlight2/inFlight2Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[1][0]/ourAgentDetails[1][1])
				console.log('InFlight3 Average: ' + inFlight3/inFlight3Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[2][0]/ourAgentDetails[2][1])
				console.log('InFlight4 Average: ' + inFlight4/inFlight4Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[3][0]/ourAgentDetails[3][1])
				console.log('OutFlight2 Average: ' + outFlight2/outFlight2Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[4][0]/ourAgentDetails[4][1])
				console.log('OutFlight3 Average: ' + outFlight3/outFlight3Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[5][0]/ourAgentDetails[5][1])
				console.log('OutFlight4 Average: ' + outFlight4/outFlight4Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[6][0]/ourAgentDetails[6][1])
				console.log('OutFlight5 Average: ' + outFlight5/outFlight5Quantity);
				console.log(agent_name + ' Average: ' + ourAgentDetails[7][0]/ourAgentDetails[7][1])


//			callback(total/totalQuantity, myTotal/myQuantity);
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