fs = require('fs');

var actions = require('./actions.json');

var finalized = [];

var timestamps = [];

actions.forEach(function(action){
  if(timestamps.indexOf(action.timestamp) === -1){
    finalized.push(action);
    timestamps.push(action.timestamp);
  }
});

var final = finalized.sort(function(a, b){
    var keyA = new Date(a.timestamp),
        keyB = new Date(b.timestamp);
    // Compare the 2 dates
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0;
});

fs.writeFileSync(__dirname + "\\meme.json", JSON.stringify(final));
