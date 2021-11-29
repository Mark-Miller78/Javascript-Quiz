//Questions, Answer Choices, and correct answer are held in an array
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

var landingTextEl = document.querySelector(".landingText");
var startBtnEl = document.querySelector('#start-btn');
var timerEl = document.querySelector('.timer');
var questionText= document.getElementById('questionText');
var startText = document.getElementById('startText');
var buttons = document.getElementById('btnBlock');
var timeLeft = 75
var currentQuestion = 0
// var choicesIdCounter = 0
var questionsAnswered=0
var correctQuestions = 0
var currentScore = 0
var savedScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MaxQuestions = 10;
const MaxHighScores = 5;

//function for timer
function countdown() {

    var timeInterval = setInterval(function(){      
        timerEl.textContent="Time Remaining: " + timeLeft + "s";
        timeLeft--;
        
        //Quiz ends if time runs out or all questions answered
        if(timeLeft < 0 || questionsAnswered >= MaxQuestions){
            clearInterval(timeInterval);
            endQuiz();
        }
    },1000);
};

function formQuestion(){
    //sets text to current question being asked
    startText.textContent = questions[currentQuestion].question;

    //creates answer choice buttons that goes with current question and displays them
    for( var i=0; i<questions[currentQuestion].options.length; i++){
        var btnOptions = document.createElement('button')
        btnOptions.textContent = questions[currentQuestion].options[i];
        btnOptions.className="answerChoices";
        // btnOptions.setAttribute('data-choices-Id', choicesIdCounter);

        btnBlock.appendChild(btnOptions);
    }

    // choicesIdCounter++;
    currentQuestion++;

}

function saveScore(){
    //captures the value of form input
    var initialValue = document.querySelector(".initialInput").value;

    //creates object to store initials and score
    var score= {
        score: currentScore,
        initials: initialValue,
    };

    //pushes score to savedScore array, sorts based off of value, saves top 5 scores
    savedScores.push(score);
    savedScores.sort((a, b) => b.score - a.score)
    savedScores.splice(5);

    console.log(savedScores);
    localStorage.setItem("highScores", JSON.stringify(savedScores));
};

function endQuiz(){
    //calculates final score
    currentScore = (correctQuestions*10)+(timeLeft+1);

    //removes answer choices
    while (buttons.firstChild){
        buttons.removeChild(buttons.firstChild);
    }
    landingTextEl.removeChild(landingTextEl.lastChild);

    var endBtn = document.createElement("button");

    //if points are scored..
    if(currentScore > 0){
        //...displays message...
        startText.textContent = "Congrats! you scored a total of " + currentScore + " Points! Enter your initials and click the button below to save your score!"
        
        //..creates form and adds initial input element and save button
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
            //alerts if no initials are entered
            if(!initialEl.value){
                window.alert("Please Enter your initials to save your score");
            }
            //if initials are entered, saves score and goes to highscore screen
            else{
                saveScore();
                location.href = "./highscores.html";
            };
        };

    } else{
        //If no points are scored displays message and sets button text
        startText.textContent= "Sorry! You did not score any points. Click the button below if you would like to try again!"
        endBtn.textContent = "Click here to restart the quiz"
        endBtn.className = "restartBtn"
        btnBlock.appendChild(endBtn);

        //when clicked, taken back to landing screen
        endBtn.onclick = function(){
            window.location.reload();
        };
    }
};

//listens for "bubbling" click event
buttons.addEventListener("click", event =>{
    var index= currentQuestion - 1;

    //creates p element for correct or incorrect answer
    var result= document.createElement("p");
    result.className = "result";
    
    //clears previous questions choices, increases questions answered, and calls function to load next question
    if(event.target.className === "answerChoices"){
        while (buttons.firstChild){
            buttons.removeChild(buttons.firstChild);
        }
        landingTextEl.removeChild(landingTextEl.lastChild);
        questionsAnswered++;
        formQuestion();
    };

    //starts quiz if start button is clicked
    if(event.target === startBtnEl){
        startBtnEl.setAttribute("style", "display: none");
        countdown();
        formQuestion();
    //if correct answer is clicked, increases score and displays correct message
    } else if(event.target.textContent === questions[index].answer){
        correctQuestions++;
        result.textContent = "Correct!"
        landingTextEl.appendChild(result);
        console.log(correctQuestions);
    //if incorrect button is clicked, displays incorrect message and deducts 10 seconds from time remaining
    } else{
        timeLeft = timeLeft - 10;
        result.textContent = "Incorrect"
        landingTextEl.appendChild(result);
    }; 
});


