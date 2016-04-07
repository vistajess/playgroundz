var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = require('chai').expect;
var word = require('../index');
var length = require('../index');

chai.use(sinonChai);

describe('Sanitize', function() {
	// Sample hooks are `before`,`beforeEach`,`after`,`afterEach`
	// beforeEach(function(){
	// 	console.log('before');
	// });
	/**
		`it.only()` = only runs this assertion
		`it.skip()` = skips this assertion
	**/
  it('returns a lower string', function() {
  	var inputWord = 'HELLO WORLD';
  	var outputWord = word.sanitize(inputWord);

  	expect(outputWord).to.equal('hello world');
  	expect(outputWord).to.not.equal('HELLO WORLD');
  	expect(outputWord).to.be.a('string');
  	expect(outputWord).to.not.be.a('number');
  	expect(outputWord).to.contain('hello');
  });
  it('remove any hyphen', function() {
  	var inputWord = 'HELLO-WORLD';
  	var outputWord = word.sanitize(inputWord);

  	expect(outputWord).to.equal('hello world');
  });
});



describe('FindLength', function() {
	it('should return the array length', function(){
		var arr1 = [1,2,3,4,5,6];
		var arrLength = length.findLength(arr1);

		expect(arrLength).to.be.equal(6);
	});

});

describe('Tokenize', function(){
  it('returns an array of a word', function(){
     var sentence = 'Hello world';
     var tokenizedSentence = word.tokenize(sentence);

     expect(tokenizedSentence).to.include.members(['Hello', 'world']);
  });
});

describe('Info Language', function() {
  it('returns language information', function(done) {
    var ghRepo = {
      'language': 'Assembly'
    };
    var stub = sinon.stub().callsArgWith(0, ghRepo);

    word.infoLang(stub, function(response) {
      console.log(response);
      expect(response).to.equal('Language is Assembly');
      done();
    })
  })
}) 