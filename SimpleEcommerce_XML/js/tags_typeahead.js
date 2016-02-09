var tag_list = $('.tag_list');
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var tag_name_array = tags.map(function(tag) { return tag.tag_name;});

$('.typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'tag_name',
  source: substringMatcher(tag_name_array)
});



$('.typeahead').keypress(function(e) {
    if(e.keyCode === 13){
      tag_list.append('<li>'+ $(this).val() +'</li>');
      $('#tags').val('');
      $('#tags').focus();
    }
    console.log($(this).val());
});
