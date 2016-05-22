// Initial a JS object
var result = {};

$(document).ready(function($) {

  // Add button
  $('.addbutton').click(function() {
    // Get input value
    var inputText = $('#inputpair').val().replace(/\s/g, '');
    // Validation
    if(isValidInput(inputText)) {
      $('#listpairs').append('<option>' + inputText + '</option>');
    } else {
      alert('Please enter a valid pair');
    }
  });

  // Sort by Name button
  $('.sortbyname').click(function() {
    // remove textarea contents
    $('#listpairs').find('option').remove();
    // sort contents by name(by default)
    for(var name in result) {
      $('#listpairs').append('<option>' + name + '=' + result[name] + '</option>');
    }
  });

  // Sort by Value button
  $('.sortbyvalue').click(function() {
    // remove textarea contents
    $('#listpairs').find('option').remove();
    // sort contents by value
    var sortedResult = sortObjectByValue(result);
    for(var r in sortedResult) {
      $('#listpairs').append('<option>' + sortedResult[r].key + '=' + sortedResult[r].value + '</option >');
    }
  });

  // Delete button
  $('.delete').click(function() {
    // remove selected items from object
    var selectedKeys = [];
    $('#listpairs option:selected').each(function() {
      selectedKeys.push($(this).val().split('=')[0]);
    });
    $.each(selectedKeys, function(index, value) {
      delete result[value];
    });
    // remove contents
    $('option:selected', '#listpairs').remove();
    //console.log(result);
  });

  // Show XML button
  $('.showxml').click(function() {
    // create a xml document
    var xml = $.parseXML('<?xml version="1.0" encoding="utf-8" ?><data />');
    // append pairs into xml
    for(var key in result) {
      $(xml).find('data').append('<pair></pair>');
      var newPair = $(xml).find('pair').last();
      newPair.append('<name>' + key + '</name>');
      newPair.append('<value>' + result[key] + '</value>');
    }
    // parse to xml
    alert((new XMLSerializer()).serializeToString(xml));
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
