var $ 		= 	require('cheerio'),
	request =	require('request');

// Games start from id 457 and end at 492

var url = "http://tac.ecs.soton.ac.uk:8080/history/";

for(var i = 457; i < 493; i++) {
	console.log(url + i + '/');
}