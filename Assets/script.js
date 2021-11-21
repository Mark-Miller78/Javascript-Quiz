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
        Options:[
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
var landingEl = document.querySelector('.landingText')
var quiz = document.getElementById('quiz');

function countdown() {
    var timeLeft = 75;

    var timeInterval = setInterval(function(){
        if (timeLeft >= 0){
            timerEl.textContent="Time Remaining: " + timeLeft + "s";
            timeLeft--;
        }
        else{
            clearInterval(timeInterval);
        }
    },1000);
}
function askQuestions(){
    for(var i = 0; i < questions.length; i++){
        var questionEl = document.createElement('h1');
        questionEl.textContent =questions[i].question;

        quiz.appendChild(questionEl);
    }
};

startBtnEl.addEventListener("click", function(){
    landingEl.setAttribute("style", "display:none");
    countdown();
    askQuestions();
});

