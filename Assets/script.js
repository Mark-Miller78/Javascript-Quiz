let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answer: "<script>",
        options:[
            "<js>",
            "<script>",
            "<javascript>",
            "<scripture>",
        ]
    },
    {
        question: "Where is the correct place to insert a javascript?",
        answer: "End of <body> section.",
        options:[
            "Beginning of <header> section.",
            "End of <header> section.",
            "Beginning of <body> section.",
            "End of <body> section.",
        ]
    },
    {
        question: "Which box would you call to have someone insert a value?",
        answer: "Prompt",
        options: [
            "Alert",
            "Prompt",
            "Confirm",
            "Insert",
        ]
    },
    {
        question: "An Array is bracketed with curly brackets ({})",
        answer: "False",
        options:[
            "True",
            "False",
        ]
    },
    {
        question: "What is the syntax for creating a random number between 0 and 1?",
        answer: "Math.random()",
        options: [
            "Math.random()",
            "Math.rand()",
            "math.random()",
            "math.random[]",
        ]
    },
    {
        question:"JavaScript is not the same as Java.",
        answer: "True",
        options: [
            "True",
            "False",
        ]
    },
    {
        question:"What is the syntax for making a new HTML item in Javascript?",
        answer: ".createElement",
        options: [
            ".getAttribute",
            ".querySelector",
            ".getItem",
            ".createElement"
        ]
    },
    {
        question: "Which statement it best used to itereate through an array?",
        answer: "for",
        options: [
            "switch",
            "else if",
            "for",
            "while"
        ]
    },
    {
        question: "True or False: The first index in an array is given a value of 1.",
        answer: "False",
        options:[
            "True",
            "False",
        ]
    },
    {
        question: "What is the syntax that allows an object to be stored into the local storage?",
        answer: "JSON.stringify()",
        options:[
            "JSON.string()",
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.setItem()"
        ]
        
    }
];

var startBtnEl = document.querySelector('#start-btn');
var timerEl = document.querySelector('.timer');
var questionText= document.getElementById('questionText');
var startText = document.getElementById('startText');
var buttons = document.getElementById('btnBlock');
// var saveScoreBtn =document.querySelector(".saveBtn");
// var initialsEl = document.querySelector(".initialInput");
var timeLeft = 75
var currentQuestion = 0
var choicesIdCounter = 0
var questionsAnswered=0
var correctQuestions = 0
var currentScore = 0
var savedScores = JSON.parse(localStorage.getItem("highscores")) || [];

const MaxQuestions = 10;
const MaxHighScores = 5;


function countdown() {

    var timeInterval = setInterval(function(){      
        timerEl.textContent="Time Remaining: " + timeLeft + "s";
        timeLeft--;
        
        if(timeLeft < 0 || questionsAnswered >= MaxQuestions){
            clearInterval(timeInterval);
            endQuiz();
        }
    },100);
};

function formQuestion(){
    // var questionEl= document.createElement('p')



    startText.textContent = questions[currentQuestion].question;
    // questionBlock.appendChild(questionEl);

    for( var i=0; i<questions[currentQuestion].options.length; i++){
        var btnOptions = document.createElement('button')
        btnOptions.textContent = questions[currentQuestion].options[i];
        btnOptions.className="answerChoices";
        btnOptions.setAttribute('data-choices-Id', choicesIdCounter);

        btnBlock.appendChild(btnOptions);
    }

    choicesIdCounter++;
    currentQuestion++;

}

function saveScore(){
    var initialValue = document.querySelector(".initialInput").value;

    var score= {
        score: currentScore,
        initials: initialValue,
    };

    savedScores.push(score);
    savedScores.sort((a, b) => b.score - a.score)
    savedScores.splice(5);

    console.log(savedScores);
    localStorage.setItem("highScores", JSON.stringify(savedScores));
};

function endQuiz(){
    currentScore = (correctQuestions*10)+(timeLeft+1);

    // startText.textContent = "The quiz is over! lets see how you did!";

    while (buttons.firstChild){
        buttons.removeChild(buttons.firstChild);
    }

    var endBtn = document.createElement("button");

    if(currentScore > 0){
        startText.textContent = "Congrats! you scored a total of " + currentScore + " Points! Enter your initials and click the button below to save your score!"
        
        var formEl = document.createElement("form");

        var initialEl = document.createElement("input");
        initialEl.className = "initialInput";
        initialEl.setAttribute("type", "text");
        initialEl.placeholder= "Enter Initials Here";
        formEl.appendChild(initialEl);
        
        
        endBtn.textContent = "Click here to save your score!"
        endBtn.className = "saveBtn"
        endBtn.setAttribute("type", "button")
        formEl.appendChild(endBtn);

        questionText.appendChild(formEl);

        endBtn.onclick = function(){
            if(!initialEl.value){
                window.alert("Please Enter your initials to save your score");
            }
            else{
                saveScore();
            };
        };

    } else{
        startText.textContent= "Sorry! You did not score any points. Click the button below if you would like to try again!"
        endBtn.textContent = "Click here to restart the quiz"
        endBtn.className = "restartBtn"
        btnBlock.appendChild(endBtn);

        endBtn.onclick = function(){
            window.location.reload();
        };
    }
};


startBtnEl.addEventListener("click", function(){
    startBtnEl.setAttribute("style", "display: none");
    countdown();
    formQuestion();
});

buttons.addEventListener("click", event =>{
    var index= currentQuestion - 1;
    

    if(event.target.textContent === questions[index].answer){
        correctQuestions++;
        console.log(correctQuestions);
    };

   
    if(event.target.className === "answerChoices"){
        while (buttons.firstChild){
            buttons.removeChild(buttons.firstChild);
        }
        questionsAnswered++;
        formQuestion();
    };   
});


