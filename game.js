var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var start=false;
var level =0;

$(document).keypress(function () { 
    if(!start){
        start=true;
        $("#level-title").text("level "+level);
        nextSequence();
    }
});

$(document).on("touchstart",function () { 
    if(!start){
        start=true;
        $("#level-title").text("level "+level);
        nextSequence();
    }
});

$(".btn").on("click", function () {
    if(start){
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(buttonColours.indexOf(userChosenColour));
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1)
    }
    
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomChosenNumber=Math.floor(Math.random()*4);
    gamePattern.push(randomChosenNumber);
    $("#"+buttonColours[randomChosenNumber]).fadeOut(100).fadeIn(100);
    playSound(buttonColours[randomChosenNumber])
}

function playSound(name){
    var audio=new Audio();
    audio.src="sounds/"+name+".mp3";
    audio.play();
}

function animatePress(currentColour) { 
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }
    , 100);
}

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(userClickedPattern);
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    
    }
    else{
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }
        , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        gamePattern=[];
        userClickedPattern=[];
        start=false;
        level =0;
    }
}