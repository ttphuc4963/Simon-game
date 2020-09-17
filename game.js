var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animationPress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);


});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    console.log("sucess");
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("#level-title").text("Game Over, Press Any Key to Restart ");
    starOver();
  }

  if(gamePattern.length===userClickedPattern.length)
    setTimeout(function (){nextSequence();}, 1000);
}

function starOver(){
  level=0;
  gamePattern=[];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animationPress(currentKey) {
  activeButton = $("#" + currentKey);
  activeButton.addClass("pressed");
  setTimeout(function() {
    activeButton.removeClass("pressed");
  }, 100);
}
