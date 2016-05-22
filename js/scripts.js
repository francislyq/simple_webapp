// Initial a JS object
var result = {};

$(document).ready(function($) {

  // Add button
  $('.addbutton').click(function() {
    // Get input value
    var inputText = $('#inputpair').val().replace(/\s/g, '');
    // Validation
    if(isValidInput(inputText)) {
      $('#listpairs').val($('#listpairs').val() + inputText + '\n');
    } else {
      alert("Please enter a valid pair");
    }
  });

  // Sort by Name button
  $('.sortbyname').click(function() {
    // remove textarea contents
    $('#listpairs').val('');
    // sort contents by name(by default)
    for(var name in result) {
      $('#listpairs').val($('#listpairs').val() + name + '=' + result[name] + '\n');
    }
  });

  // Sort by Value button
  $('.sortbyvalue').click(function() {
    // remove textarea contents
    $('#listpairs').val('');
    // sort contents by value
    var sortedResult = sortObjectByValue(result);
    for(var r in sortedResult){
      $('#listpairs').val($('#listpairs').val() + sortedResult[r].key + '=' + sortedResult[r].value + '\n');
    }
  });

  // Delete button
  $('.delete').click(function() {
    // remove contents
    $('#listpairs').val('');
    // clear object
    result = {};
  });

  // Show XML button
  $('.showxml').click(function() {
    //TODO
  });
});

// Sort object by value
function sortObjectByValue(obj) {
  var arr = [];
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      arr.push({
        'key': prop,
        'value': obj[prop]
      });
    }
  }
  arr.sort(function(a, b) { return a.value - b.value; });
  return arr;
}

// Input Validation
function isValidInput(inputText) {
  // check if it is right input format
  if(inputText.indexOf('=') != -1) {
    var name = inputText.split('=')[0];
    var value = inputText.split('=')[1];

    // check if input name & value is alpha-num & name is not exist in result object
    if(name.match(/^[a-z0-9]+$/i) && value.match(/^[a-z0-9]+$/i) && !(name in result)) {
      // append input into object
      appendToResult(name, value);
      return 1;
    } else {
      return 0
    }
  } else {
    return 0;
  }
}

// Append name & value into result object
function appendToResult(name, value) {
  result[name] = value;
  console.log(result);
}
