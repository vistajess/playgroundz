var chai = require('chai');

function reverseString(string) {
  return string.split('').reverse().join('');
}

function firstChar(string) {
  return string[0];
}

function lastChar(string) {
  return string[string.length - 1];
}

function shuffleChar(string) {
  var wordArr = [];
  var indexArr = [];
  var max = string.length - 1;
  var index;
  var letter;

  for(var i = string.length - 1; i >= 0; i--) {
  do {
    index = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    letter = string.split('')[index];
    indexArr.push(index);
    console.log(indexArr , index , indexArr.indexOf(index) === 0, wordArr.indexOf(letter) !== 0);
    console.log("WORD ARRAY",wordArr,letter);
  }
  // index exists in the indexArray and letter does not exist in Word Array
  while (indexArr.indexOf(index) === 0 && wordArr.indexOf(letter) !== 0);
    wordArr.push(string[index]);
  }
  console.log(wordArr,indexArr);
  return wordArr.join("");
}

describe('String Reverse',function() {
  it('should reverse the injected string', function() {
    var string = 'Hi there, Im pogi';
    chai.expect(reverseString(string)).to.equal('igop mI ,ereht iH');
  });

  it('should return the length', function() {
    var item = ['item1','item2','item3','item4'];
    chai.expect(item.length).to.equal(item.length);
  });
});