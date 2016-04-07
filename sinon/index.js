exports.sanitize = function(word) {
  return word.toLowerCase().replace(/-/g, ' ');
}

exports.findLength = function(arr) {
  return arr.length;
}

exports.tokenize = function(sentence) {
	return sentence.split(' ');
}

exports.info = function(callback) {
	var https = require('https');
	var options = {
		host: 'api.github.com',
		path: '/repos/vistajess/playgroundz',
		method: 'GET',
		headers: {
			'User-Agent': 'vistajess'
		}
	};
	var str = '';

	https.request(options, function(response) {
		response.on('data', function(data) {
			str += data;
		})

		response.on('end', function() {
			callback(JSON.parse(str));
		})

		response.on('error', function(error) {
			console.log(error);
			callback(error);
		})
		
	}).end();
}

exports.infoLang = function(infoFunc, callback) {
	infoFunc(function(reply) {
		callback('Language is ' + reply.language);
	})
}