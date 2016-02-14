
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
  minLength: 1,
},
{
  name: 'tag_name',
  source: substringMatcher(tag_name_array)
});


var picked_tag_array = [];
var $container = document.querySelector('.tag-container');
var $input = document.querySelector('#tag_input');
var $tags = document.querySelector('.tags');

$container.addEventListener('click', function() {
  $input.focus();
});

$input.addEventListener('keydown', function(evt) {
  var keyCode = evt.keyCode || evt.which; 
  if ( keyCode !== 9 ) {
    return;
  }
  var word = evt.target.value;

  if(tag_name_array.indexOf(word) === -1) {
    console.log(word +' not included create ajax');
    var dataObj = {
      "tag_name" : word
    };
       $.ajax({
          type: "POST",
          dataType: "json",
          url: '../admin/modules/addTag.php',
          data: dataObj,
          beforeSend: function() {
          },
          success: function(data) {
            console.log(data);
          },
          error: function(xhr, status, error) {
          }
      });
  }
  if(picked_tag_array.indexOf(word) === -1) {
    console.log(word +' not included in picked');
  }
  picked_tag_array.push(word);
  $input.value = '';
  $input.focus();
  render(picked_tag_array, $tags);
});

function render(tags, el) {
  jQuery.unique( tags );
  el.innerHTML = tags.map(function(tag) {
    return [
      '<span class="tag">' + tag + '</span>'
    ].join('');
  }).join('');
  var serialize_tags = JSON.stringify( tags );
  $('#tags_array').val(serialize_tags);
}