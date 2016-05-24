$(document).ready(function(){
  var actions;

  var currentIndex = 0,
      voice = $("#voice")[0],
      playedTimestamps = [],
      paused = false;

  $.getJSON("actions.json", function(res){
    actions = res.reverse();
    getAudio(currentIndex);
  });

  var getAudio = function(){
    var action = actions[currentIndex];
    // HACKY, WE HAVE MULTIPLE TIMESTAMPS FOR SOME REASON.
    if(playedTimestamps.indexOf(action.timestamp) !== -1){
      currentIndex = currentIndex + 1;
      getAudio();
    }else{
      console.log("playing", action.timestamp);
      playedTimestamps.push(action.timestamp);
      $(".utterance").text(action.voice);
      $(".counter").text((currentIndex+1) + " of " + actions.length);
      $(voice).attr("src", "audio/" + action.timestamp + ".wav");
      voice.play();
    }
  };

  var pause = function(){
    voice.pause();
    paused = true;
  };

  var unpause = function(){
    paused = false;
  };

  var goto = function(){
    pause();
    var number = prompt("Go to which number?");
    if(number <= actions.length && number > 0) currentIndex = number - 1;
    unpause();
    getAudio();
  };

  $(".goto").click(goto);

  voice.onended = function(){
    if(!paused){
      currentIndex = currentIndex + 1;
      getAudio();
    }
  };
});


// WORK
