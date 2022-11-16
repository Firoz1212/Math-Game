var playing = false;
var score;
var action;
var timereamining;
var correctAnswer;
//if  we click on the satrt /reset

document.getElementById("startreset").onclick = function () {
  //if we are playing
  if (playing == true) {
    location.reload(); //reload page
  } else {
    //if we are not playing

    //change mode to playing
    playing = true;

    //set score 0
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    //show countdown box
    show("timeremaining");
    timereamining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timereamining;

    //hide game over box
    hide("gameover");
    //change button to reset
    document.getElementById("startreset").innerHTML = "Reset Game";

    // start coundown

    startCountdown();

    //generate new Q&A
    generateQA();
  }
};
//if we are playing
//reload page
//if we are not playing
//set score to 0
//show countdown box
//reduce time by 1st sec in loops
// timeleft?
//yes-continue
//no->game over
//change button to reset
//generate new Q&A

//if we click on answer box
for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    // check if we are playing
    if (playing == true) {
      //yes
      if (this.innerHTML == correctAnswer) {
        //correct answer

        //increase score by 1
        score++;

        document.getElementById("scorevalue").innerHTML = score;

        // hide qrong box and show correct box
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);
        // generate new Q&A
        generateQA();
      } else {
        //wrong answer

        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}
//if we are playing
//correct
//yes
//increase score
//show corrected box for 1sec

//genearete new Q&A
//no
//show try again box for 1sec

//function

//start countdown
function startCountdown() {
  action = setInterval(function () {
    timereamining -= 1;

    document.getElementById("timeremainingvalue").innerHTML = timereamining;
    if (timereamining == 0) {
      //game over
      stopCountdown();
      show("gameover");

      document.getElementById("gameover").innerHTML =
        "<p> Game over! </p> <p>Your Score is " + score + "</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;

      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

//stop countdown
function stopCountdown() {
  clearInterval(action);
}

//hide
function hide(Id) {
  document.getElementById(Id).style.display = "none";
}

//show
function show(Id) {
  document.getElementById(Id).style.display = "block";
}

// generate Question and multiple answer

function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "x" + y;
  var correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill one box correct answer

  //fill other boxes with wrong answers
  var answers = [correctAnswer];
  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random())); //a wrong answer
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
