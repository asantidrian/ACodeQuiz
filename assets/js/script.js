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
var choicesLength = 4;
var questionNumber = 0;
var score = 0;
var numberDatalength=5;
//dinamically create each question and possible answers
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
function setTimer() {
  // Sets timer
  console.log("QUESTION NUMBER IN SETTIMER " + questionNumber)
  console.log("second step")
    
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
      console.log(questionNumber)
      clearInterval(timerCount);
      timer.textContent=""
      quizFinish()
    }
  }, 1000);
}

function startQuiz() {
  console.log("first Step")
  var questionNumber = 0;
  console.log("QUESTION NUMBER BEFORE SETTIMER " + questionNumber)
  firstPage.setAttribute("style", "display:none")
  questionsPage.setAttribute("style", "display:block")
  //if (questionNumber>questions.length){
  //  var questionNumber = 0;
  //  console.log(questionNumber + "dentro del if start quiz")
  //}
  setTimer()
  console.log("QUESTION NUMBER AFTER SETTIMER " + questionNumber)
  setQuestion()
}
  

function quizFinish() {
  questionsPage.setAttribute("style", "display:none")
  finishPage.setAttribute("style", "display:block")
  finalScore.textContent = score * 100 / questions.length + "%"
  //timer.textContent=timeLeft + "s";
}

function renderLastRegistered() {
  var initials = localStorage.getItem("initials");
  var scoreList = document.createElement("ul")
  highscores.appendChild(scoreList)
  var initialsPerson = document.createElement("li")
  scoreList.appendChild(initialsPerson)
  initialsPerson.textContent = initials + "----------" + finalScore.textContent
  console.log(initialsPerson.textContent); 
}
function scoreRecord(event){
  event.preventDefault()
  event.stopPropagation()
  topPage.setAttribute("style","display:none")
  finishPage.setAttribute("style","display:none")
  scorePage.setAttribute("style","display:block")
  console.log(finalScore.textContent)
  var initials = document.getElementById("initials").value
  if (!initials) {
    alert("Enter your intials!");
  }
  
  localStorage.setItem("initials", initials);
    renderLastRegistered();
}

function setQuestion() {

    console.log("third Step")
    console.log("questionNumber " + questionNumber)
    question.textContent = questions[questionNumber].title;
    var listE1 = document.createElement("ul")
    question.appendChild(listE1);
    console.log(questions[questionNumber].title);

    for (let j = 0; j < 4; j++) {
      console.log("answer "+j)
      var li = document.createElement("li");
      listE1.appendChild(li);
      listE1.setAttribute("style", "list-style-type: none;");
      const liBtn = document.createElement("button")
      liBtn.setAttribute("class", "button");
      liBtn.setAttribute("value", questions[questionNumber].choices[j])
      liBtn.textContent = questions[questionNumber].choices[j]
      li.appendChild(liBtn);
      liBtn.addEventListener("click", checkAnswer)

      function checkAnswer() {
        if (liBtn.value === questions[questionNumber].answer) {
          questionsPage.appendChild(answerCheck)
          answerCheck.textContent=""
          answerCheck.textContent = "Correct Answer!"
          score = (score + 1)
          //localStorage.setItem("score", JSON.stringify(score));
        } else {
          questionsPage.appendChild(answerCheck)
          answerCheck.textContent=""
          answerCheck.textContent = "Incorrect Answer,lose 10 seconds!"
          timeLeft = timeLeft - 10
        }
        questionNumber = questionNumber + 1;
        console.log("questionNumber + 1: " + questionNumber);
        if (questionNumber<questions.length){
        setQuestion()
        }
      }
    }
  
}
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click",scoreRecord); 
viewScores.addEventListener("click",function end(){
  topPage.setAttribute("style","display:none")
  firstPage.setAttribute("style", "display:none")
  scorePage.setAttribute("style","display:block")

}
)
goBackBtn.addEventListener("click",function start(){
topPage.setAttribute("style","display:flex","flex-wrap: wrap","justify-content: space-between")
firstPage.setAttribute("style", "display:block")
scorePage.setAttribute("style","display:none")
//var timeLeft=75;
//timer.textContent=timeLeft + "s";
//var questionNumber = 0;

})
clearScore.addEventListener("click",function deleteScore(){
  topPage.setAttribute("style","display:none")
  firstPage.setAttribute("style", "display:none")
  scorePage.setAttribute("style","display:block")
  localStorage.clear(initials);
  })

  



/*function renderLastRegistered(){
  topPage.setAttribute("style","display:none")
  finishPage.setAttribute("style","display:none")
  scorePage.setAttribute("style","display:block")
  renderLastRegistered()
});*/
/*var lastScore = JSON.parse(localStorage.getItem("score"));
    if (lastScore !== null) {
      finalScore.textContent = lastScore* 100 / questions.length + "% of correct answer last time"
*/