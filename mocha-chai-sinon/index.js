exports.sanitize = function(word) {
  return word.toLowerCase().replace(/-/g, ' ');
}

exports.findLength = function(arr) {
  return arr.length;
}