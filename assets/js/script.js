//variables declaration in globla scope.
var timer = document.getElementById("timer");
var viewScores = document.getElementById("view-scores");
var startBtn = document.getElementById("start-quiz-button");
var topPage = document.querySelector(".top-first-page")
var firstPage = document.querySelector(".first-page");
var questionsPage = document.querySelector(".questions-page");
var question = document.querySelector(".question");
var finishPage = document.querySelector(".quiz-finish-page");
var finalScore = document.getElementById("final-score");
var goBackBtn = document.getElementById("go-back-button")
var submitBtn = document.getElementById("submitBtn")
var clearScore = document.getElementById("clear-score")
var initialsForm = document.getElementById("initials-form")
var scorePage = document.querySelector(".score-page")
var highscores = document.getElementById("Highscores")
var answerCheck = document.createElement("h5")
var scoreList = document.createElement("ul")
highscores.appendChild(scoreList)
var initials = "";
var scorePerinitials ="";
var choicesLength = 4;
var questionNumber = 0;
var score = 0;
var timerCount;
var timeLeft=75;

var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answer: "Parentheses"
  },
  {
    title: "A very useful tool during developmentand debugging for printing content to the debugger is: ",
    choices: ["JavaScript", "Terminal/Bash", "For Loops", "Console.log"],
    answer: "Console.log"
  },
  {
    title: "String values must be enclosed within _________ when being assigned to variables",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
    answer: "Quotes"

  },
  {
    title: "Arrays in JavaScript can be used to store __________",
    choices: ["Number and Strings", "Other arrays", "Booleans", "All of the above"],
    answer: "All of the above"
  }]
  //Funtions declarations
    // Sets timer
function setTimer() {
  
    var timerCount = setInterval(function () {
    timer.textContent = timeLeft + "s";
    timeLeft = timeLeft - 1;
    if (timeLeft === 0) {
      // Clears interval and stops timer
      clearInterval(timerCount);
      timer.textContent=""
      quizFinish()
    }
    if (questionNumber === questions.length){
      clearInterval(timerCount);
      timer.textContent=""
      quizFinish()
    }
  }, 1000);
}
// function that occures when Start quiz button is clicked
function startQuiz() {
  questionNumber = 0;
  score = 0 ;
  firstPage.setAttribute("style", "display:none")
  questionsPage.setAttribute("style", "display:block")
  setTimer()
  setQuestion()
}
//function that happens when either the time gets to 0 or when we asnwer all the questions
function quizFinish() {
  questionsPage.setAttribute("style", "display:none")
  finishPage.setAttribute("style", "display:block")
  localStorage.setItem("score",JSON.stringify(score)); 
  finalScore.textContent = score * 100 / questions.length + "%"

}
//function that shows the stored score
function renderLastRegistered() {
  initials = localStorage.getItem("initials");
  score = JSON.parse(localStorage.getItem("score"))
  finalScore.textContent = score * 100 / questions.length + "%"
  scorePerinitials = document.createElement("li")
  scoreList.appendChild(scorePerinitials)
  scorePerinitials.textContent = initials + "----------" + finalScore.textContent
}
//function that store the highscore in local storage.
function scoreRecord(event){
  event.preventDefault()
  event.stopPropagation()
  topPage.setAttribute("style","display:none")
  finishPage.setAttribute("style","display:none")
  scorePage.setAttribute("style","display:block")
  initials = document.getElementById("initials").value
  if (!initials) {
    alert("Enter your intials!");
    return quizFinish()
  }
  localStorage.setItem("initials", initials);
  renderLastRegistered();
}
//function that happens when the see scores button is click. It shows the scores.
function seeHighscores(){
  topPage.setAttribute("style","display:none")
  firstPage.setAttribute("style", "display:none")
  scorePage.setAttribute("style","display:block")
  if (localStorage.length != 0) {
    renderLastRegistered()
  }
}
//function that happens when the go back button is clicked.
function goBack(){
  topPage.setAttribute("style","display:flex","flex-wrap: wrap","justify-content: space-between")
  firstPage.setAttribute("style", "display:block")
  scorePage.setAttribute("style","display:none")
  }
// function that happens when the delete highscores is clicked.
function deleteScore(){
  localStorage.clear();
  topPage.setAttribute("style","display:none")
  firstPage.setAttribute("style", "display:none")
  scorePage.setAttribute("style","display:block")
  
    while (scoreList.hasChildNodes()) {
    scoreList.removeChild(scoreList.firstChild);
    }
  
}
//function that sets the question. it calls the function that sets and check the answers.  
function setQuestion() {
    question.textContent = questions[questionNumber].title;
    var listE1 = document.createElement("ul")
    question.appendChild(listE1);
    for (let j = 0; j < 4; j++) {
      var li = document.createElement("li");
      listE1.appendChild(li);
      listE1.setAttribute("style", "list-style-type: none;");
      let liBtn = document.createElement("button")
      liBtn.setAttribute("class", "button");
      liBtn.setAttribute("value", questions[questionNumber].choices[j])
      liBtn.textContent = questions[questionNumber].choices[j]
      li.appendChild(liBtn);
      liBtn.addEventListener("click", checkAnswer)
      //function that checks of the click anser is the correct one.
      function checkAnswer() {
          //If the correct anser is clicked a point is added to the score.
        if (liBtn.value === questions[questionNumber].answer) {
          questionsPage.appendChild(answerCheck)
          answerCheck.textContent=""
          answerCheck.textContent = "Correct Answer!"
          score = (score + 1)
          //if the incorrect answer is clicked the time get reduced by 10 seconds.
        } else {
          questionsPage.appendChild(answerCheck)
          answerCheck.textContent=""
          answerCheck.textContent = "Incorrect Answer,lose 10 seconds!"
          timeLeft = timeLeft - 10
        }
        questionNumber = questionNumber + 1;
        if (questionNumber<questions.length){
        setQuestion()
        }
      }
  
    }
}
//add event listerner to all buttons
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click",scoreRecord); 
viewScores.addEventListener("click",seeHighscores);
goBackBtn.addEventListener("click",goBack);
clearScore.addEventListener("click",deleteScore);

  



