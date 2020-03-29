var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

// Starting the Game
$(document).keypress(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  };
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) { //Checks that the player's most recent answer is the same as the gamePattern

    if (userClickedPattern.length === gamePattern.length) { //Checks that the player has made their answer

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {

      $("body").removeClass("game-over");

    }, 100);

    $("h1").text("Game Over, Press Any Key To Restart");
    startOver();
  }

}


//Computer's Turn
function nextSequence() {

  userClickedPattern = [];
  level++;

  //Updates the h1 level
  $("#level-title").text("Level " + level);

  //Choosing Random Colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Button Flash
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Button Sound
  playSound(randomChosenColour);
}


// When button is pressed by user
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); //identifies clicked button

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});


//Audio Function
function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


//Animation Function
function animatePress(currentColour) {

  $("." + currentColour).addClass("pressed");

  setTimeout(function() {

    $("." + currentColour).removeClass("pressed");

  }, 100);

}


function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
