const startButton = document.getElementById("startbtn");
const qButton = document.querySelectorAll(".questionbtn");
const questionContainer = document.getElementById("quizcontainer");
const question = document.getElementById("questionbox");
const questionTime =document.getElementById("timerbox");
const initalsInput = document.getElementById("initalssection");
const initalsLabel = document.getElementById("initalstxt");
const totalScore = document.getElementById("scorebox");
const submitButton =document.getElementById("submitButton");





let currentQuestion = 0;
let correctSelection =0;

let timeLeft;
let countdown;





//array for questions
const questions = [
   {
    question: "What is JavaScript used for in web development?",
    answers: [ {text: "Creating dynamic and interactive websites", correct: true },
        {text: "Designing the layout and style of a website", correct: false },
        {text: "Implementing server-side logic", correct: false },
        {text: "Storing data on a website", correct: false } ]
    },

   {
    question: "What is a variable in JavaScript?",
    answers: [ {text: "A set of instructions for a specific task", correct: false },
        {text: "A type of loop in JavaScript", correct: false },
        {text: "A value that can be changed", correct: false },
        {text: "A named container that holds data", correct: true }, ]
    }, 

   {
    question: "How do you declare a variable in JavaScript?",
    answers: [ {text: "function variableName;", correct: false },
        {text: "const variableName;", correct: false },
        {text: "var variableName;", correct: true },
        {text: "let variableName;", correct: false }, ]
    },

    {
    question: "What is the difference between let and var in JavaScript?",
    answers: [ {text: "var is only used for constants, while let can be changed", correct: false },
        {text: "let is only used for constants, while var can be changed", correct: false },
        {text: "A value that can be changed", correct: false },
        {text: "let is block-scoped, while var is function-scoped", correct: true }, ]
    },

    {
     question: "What is an array in JavaScript?",
     answers: [ {text: "A function used to perform a specific task", correct: false },
        {text: "A data structure that holds a collection of values", correct: true},
        {text: "A type of loop in JavaScript", correct: false },
        {text: "A conditional statement in JavaScript", correct: false }, ]
    },

    {
    question: "How do you add a property to an object in JavaScript?",
    answers: [ {text: "objectName{property} = value;", correct: true },
        {text: "objectName.property = value;", correct: true },
        {text: "objectName[property] = value;", correct: true },
        {text: "objectName(property) = value;", correct: false } ]
    },
    
    {
    question: "How do you access an element in an array in JavaScript?",
    answers: [ {text: "By its index number", correct: true },
        {text: "By its name", correct: false },
        {text: "By its type", correct: false },
        {text: "By its value", correct: false }, ]
    }, 
        
    {
    question: "What is an object in JavaScript?",
    answers: [ {text: "A set of instructions for a specific task", correct: false },
        {text: "A type of loop in JavaScript", correct: false },
        {text: "A collection of key-value pairs", correct: true },
        {text: "A data structure that holds a collection of values", correct: true }, ]
    },
    
   {
    question: "What is a function in JavaScript??",
    answers: [ {text: "A conditional statement in JavaScript", correct: false },
        {text: "A set of instructions for a specific task", correct: true },
        {text: "A data structure that holds a collection of values", correct: false },
        {text: "A type of loop in JavaScript", correct: false }, ]
    },
    
   {
     question: "How do you call a function in JavaScript?",
     answers: [ {text: "run functionName();", correct: false },
        {text: "functionName();", correct: true },
        {text: "functionName;", correct: false },
        {text: "call functionName();", correct: false }, ]
        }
]


//starts the quiz
startButton.addEventListener("click", startQuiz)

//Makes the Start btn disappear and the question btns to appear
function startQuiz() {
    startButton.style.display = "none";
    for (let i = 0; i < qButton.length; i++) {
        qButton[i].style.display = "inline-block";
        }
        
    displayQuestions();
    startTimer();

}


//countdown function
function startTimer() {
    timeLeft = 120; // time in seconds
    const countdown = setInterval(function() {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        questionTime.innerText = "Time:\n" + minutes + " :" + seconds;
        if (timeLeft <= 0 || currentQuestion >= questions.length) {
            clearInterval(countdown);
            resultsSection(timeLeft)
        }
    }, 1000) //time interval in miliseconds   
}



//this function should display the questions/answers
function displayQuestions () {
    question.innerText = questions[currentQuestion].question;
    qButton.forEach((button, index) => {
        button.innerText = questions[currentQuestion].answers[index].text;
        button.addEventListener("click", answerChosen);
       });
}

//This function registers an answer and takes the user to the next question


function answerChosen(e) {
    
    const selectedButton = e.target;
    const correct = selectedButton.innerText === questions[currentQuestion].answers.find(answer => answer.correct).text;


    //This portion of the function makes a correct answer get a point, and have an incorrect answer deduct time.
    if (!correct) {
        timeLeft -= 15;
        questionTime.innerText = "Time\n " + timeLeft;
    }
    else {
       correctSelection++
    }


    //tracks total score
    totalScore.innerText = "Score:\n" + correctSelection + "/" + questions.length;

    //tracks question number displaying the next question if there is one
    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestions();
    } else {
        resultsSection(timeLeft);
    }
}

//function to apply end of quiz effects
function resultsSection(timeLeft) {

    //removes question btns
   for (let i = 0; i < qButton.length; i++) {
       qButton[i].style.display = "none";
   }

   totalScore.innerText = "Score:\n" + correctSelection + "/10"


   question.innerText = "How did you do?";
   questionTime.innerText = "Time Remaining:\n " + (timeLeft);

    // shows hidden elements in the DOM  
   initalsInput.style.display = "inline-block";
   initalsLabel.style.display = "inline-block";
   submitButton.style.display = "inline-block";
}

