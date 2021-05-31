// Declare variables
let playing = false;
let score;
let trialsLeft;
let step;
let action; //used for setInterval
let fruits = ['apple', 'banana' , 'fruit1' , 'grape' , 'guava' , 'pineapple' , 'tomato']
// var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
// logics goes here

$(function(){
    
//click on start reset button
    
$("#btn").click( () => {

    // if we are playing
    if(playing == true){
        //reload page
        location.reload();
    }else{

        //we are not playing
        playing = true; 

        //set score to 0
        score = 0; 
        $("#score").html(score);

        //show trials left 
        $("#lifebox").show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $("#over").hide();

        //change button text to reset game
        $("#btn").html("Reset Game");

        //start sending fruits
        startAction();
    }
});

    
//slice a fruit
    
$("#fruit").mouseover(function(){
    score++;
    $("#score").html(score); //update score
//    document.getElementById("slicesound").play();
    $("#slicesound")[0].play(); //play sound
    
    //stop fruit
    clearInterval(action);
    
    //hide fruit
    $("#fruit").hide(200); //slice fruit
    
    //send new fruit
    setTimeout(startAction, 500);
});
 
// Declare functions

//fill trialLeft box with hearts
    
function addHearts(){
    $("#lifebox").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#lifebox").append('<img src="images/heart.png" class="life">');
    }
}

//start sending fruits

function startAction(){
    
    //generate a fruit
    $("#fruit").show();
    chooseFruit(); //choose a random fruit
    $("#fruit").css({'left' : Math.round(700*Math.random()), 'top' : -50}); //random position
    
    //generate a random step
    step = 1+ Math.round(10*Math.random()); // change step
    
    // Move fruit down by one step every 10ms
    action = setInterval( () => {
        
        //move fruit by one step
        $("#fruit").css('top', $("#fruit").position().top + step);                              
    
        //check if the fruit is too low
        if($("#fruit").position().top > $("#fruitsContainer").height()){
            //check if we have trials left
            if(trialsLeft > 1 ){
                //generate a fruit
                $("#fruit").show();
                chooseFruit(); //choose a random fruit
                $("#fruit").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position

                //generate a random step
                step = 1+ Math.round(5*Math.random()); // change step
                
                //reduce trials by one
                trialsLeft --;
                
                //populate trialsLeft box
                addHearts();
                
            }else{ // game over
                playing = false; //we are not playing anymore
                $("#btn").html("Start Game"); // change button to Start Game
                $("#over").show();
                $("#scoreis").html(score);
                $("#trialsLeft").hide();
                stopAction();
            }
        }
    }, 10);
}

// generate a random fruit

function chooseFruit(){
    $("#fruit").attr('src' , 'images/' + fruits[Math.round(7*Math.random())] +'.png');   
}

//Stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit").hide();
}
});