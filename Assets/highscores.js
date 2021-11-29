var topScores = document.getElementById("topScores");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

function loadScores (){
    var savedScores = highScores;

    //iterates through savesScores array
    for(var i = 0; i < savedScores.length; i++){
        //creates list element
        var top5Scores = document.createElement("li");
        top5Scores.className="scoreLi";

        //populates list element with saved initials and scores of the top 5
        top5Scores.innerHTML ="<p>" + savedScores[i].initials + " - " + savedScores[i].score +" Points </p>";

        topScores.appendChild(top5Scores);
    }

}

loadScores();