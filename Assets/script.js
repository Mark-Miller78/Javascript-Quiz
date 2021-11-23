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
// var landingEl = document.querySelector('.landingText')
var quiz = document.getElementById('quiz');
var questionBlock= document.getElementById('questionBlock');
var startText = document.getElementById('startText');
var buttons = document.getElementById('btnBlock')
// var choicesEl = document.getElementsByClassName('.answerChoices');
var timeLeft = 75
var currentQuestion = 0
var choicesIdCounter = 0
var correctQuestions = 0
var score = 0


function countdown() {

    var timeInterval = setInterval(function(){
        if (timeLeft >= 0){
            timerEl.textContent="Time Remaining: " + timeLeft + "s";
            timeLeft--;
        }
        else{
            clearInterval(timeInterval);
            endQuiz();
        }
    },1000);
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

function endQuiz(){
    score = correctQuestions*10;

    startText.textContent = "Time is up! lets see how you did!";

    while (buttons.firstChild){
        buttons.removeChild(buttons.firstChild);
    }

    var scoreResults = document.createElement("p");
    var endBtn = document.createElement("button");

    if(score > 0){
        scoreResults.textContent = "Congrats! you scored a total of " + score + " Points! Click the button below to save your score!"
        endBtn.textContent = "Click here to save your score!"
    } else{
        scoreResults.textContent= "Sorry! You did not score any points. Click the button below if you would like to try again!"
        endBtn.textContent = "Click here to restart the quiz"
    }

    btnBlock.appendChild(endBtn);
    questionBlock.appendChild(scoreResults);
    

    
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
        formQuestion();
    }
} );






