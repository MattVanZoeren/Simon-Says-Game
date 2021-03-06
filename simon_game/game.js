//these are initializing variables that set the game up
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = true;
var userChosenColor;


//this is the click event, which acts to both store the colors clicked as variables as well as
//playing a noise when the colors are clicked. it's the interacting element of the game
//it will also eventually show the button 'light up' but i haven't done that yet
$(".btn").click(function() {
  userChosenColor = event.currentTarget.classList[1];
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  makeSounds(userChosenColor);
  var pickedButton1 = $("." + userChosenColor).addClass("pressed");
  setTimeout(function() {
    pickedButton1.removeClass("pressed");
  }, 100);

  checkAnswer(userClickedPattern.length-1);
});


//this picks the random number that is used to generate the next color in the pattern, then
//it uses that number to pick a random color from the 4 in the array. when it does so,
//that chosen color flashes on screen, and plays a noise
var nextSequence = function() {
  //these two lines remove the listener so that the key press only initializes the game, as well
  //as resetting the user defined array of colors clicked
  document.body.removeEventListener("keydown", nextSequence)
  userClickedPattern = [];

  //this is the part that selects the next color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  //this is the part that makes it flash when the next color is picked
  var pickedButton = $("." + randomChosenColor).addClass("selected");
  setTimeout(function() {
    pickedButton.removeClass("selected");
  }, 100);

  //this is the part that plays a sound when the next color is picked
  makeSounds(randomChosenColor);

  //this increases the level each time the correct answer is given and shows the current level
  level = level + 1;
  $("#level-title").text("Now on level " + level + "!");
  console.log("level: " + level)

};
  

//this checks the clicked answer. if it is the right color, it will check to see if the stored arrays 
//are equal. if both of these are true, the it's correct. otherwise it's wrong.
var checkAnswer = function(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    } 

  } 
  else {
    wrongAnswer();
  }
  
}

//this function gets called to show a wrong answer, as well as to restart the game after the wrong answer
var wrongAnswer = function() {
  level = 0;  
  userClickedPattern = [];
  gamePattern = [];
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200)
  var wrongSound = new Audio("sounds/wrong.MP3");
  wrongSound.play();
  $("#level-title").text("Wrong! Press any key to restart");
  document.body.addEventListener("keydown", nextSequence);
}



//this is the function that gets called whenever the game needs to make a noise
var makeSounds = function(e) {
  switch (e) {
    case "green":
    var green1 = new Audio("sounds/green.MP3");
    green1.play();
    break;

    case "red":
    var red1 = new Audio("sounds/red.MP3");
    red1.play();
    break;

    case "yellow":
    var yellow1 = new Audio("sounds/yellow.MP3");
    yellow1.play();
    break;

    case "blue":
    var blue1 = new Audio("sounds/blue.MP3");
    blue1.play();
    break;

    default:
    console.log("what happened");
  }
};

document.body.addEventListener("keydown", nextSequence);
