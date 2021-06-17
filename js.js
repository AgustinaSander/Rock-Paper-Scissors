/* ------------------------------------------------------------------------------ */
/*                                 GLOBAL VARIABLES                               */
/* ------------------------------------------------------------------------------ */

var playUntil = 5;
const options = {
    "0": "paper",
    "1": "rock",
    "2": "scissor"
};

/* ------------------------------------------------------------------------------ */
/*                                   START GAME                                   */
/* ------------------------------------------------------------------------------ */

$(document).ready(function(){
    startPlaying();
})

/* ------------------------------------------------------------------------------ */
/*                                  FUNCTIONS                                     */
/* ------------------------------------------------------------------------------ */

//EMPEZAR A JUGAR
function startPlaying(){
    //Seteo scores en 0
    setStartInterface();
    //Declaro variable de resultado
    let result;
    //Mostrar modal de cantidad de ptos
    showModalPoints();
    //Agrego event click a la modal de reglas
    let rulesBtn = $("#rulesBtn");
    rulesBtn.click(openRulesModal);
    //Agrego event click a todos los botones
    let gameContainer = $("#game-container");
    let btnOptions = $("#game-container .symbol1");
    btnOptions.click(function(){
        //Seleccion del usuario - Obtengo el nombre de la opcion que eligio
        let selection = $(this).attr("id");;
        console.log(selection)
        setTimeout(function(){
            gameContainer.css("display","none");
            result = play(selection);
            //Mostrar interfaz VS
            showVS();
            //Mostrar cartel resultado
            console.log("LLAMO A UPDATE");
            updateScore(result);
        },500);
    }) 
}

//SELECCIONAR CANTIDAD DE PUNTOS HASTA LA QUE SE JUEGA
function showModalPoints(){
    $("#modalPoints").css("display","flex");
    $("body").css("overflow","hidden");
    $("#container").css("position","absolute");
    $("#pointsBtn").click(function(){
        console.log("Luego de poner ptos")
        let aux = true;
        playUntil = $("#quantityPoints").val();
        //Chequeo que el numero ingresado sea entero positivo mayor a 1
        if(!(/^\d*$/).test(playUntil) || playUntil<1){
            $("#quantityPoints").css("borderColor","red");
        }
        else{
            $("#quantityPoints").css("borderColor","black");
            $("#modalPoints").css("display","none");
            $("#container").css("position","");
            $("body").css("overflow","visible");
            console.log("Se juega hasta:"+playUntil)
        }
    });
}

//COMENZAR EL JUEGO
function play(userSelection){
    //Maquina elige
    let computerSelection = getRandomArbitrary();
    //Realizar comparacion de elecciones
    let result = compare(userSelection, computerSelection);
    //Crear interfaz de resultado final VS
    createVS(userSelection, computerSelection, result);
    return result;
}

//OBTENER LA ELECCION DE LA COMPUTADORA DE FORMA ALEATORIA
function getRandomArbitrary() {
    let aux = Math.floor(Math.random()*10)%3;
    return options[aux];
}

//CARGAR DATOS EN INTERFAZ VS
function createVS(userSelection, computerSelection, result){
    let personContainer = $("#person-container .election");
    let computerContainer = $("#computer-container .election");

    personContainer.html(`<div id="${userSelection}" class="symbol1 ${userSelection}2"><div class="symbol2"><img class="symbol" src="images/icon-${userSelection}.svg"></div></div>`);

    //Transicion para mostrar eleccion de computadora
    computerContainer.html("");
    computerContainer.fadeIn(1000);

    computerContainer.html(`<div id="${computerSelection}" class="symbol1 ${computerSelection}2"><div class="symbol2"><img class="symbol" src="images/icon-${computerSelection}.svg"></div></div>`);
    
    $("#resultMsg").text(result);
}

//REALIZAR COMPARACION DE ELECCIONES Y DEVOLVER RESULTADO
function compare(userSelection, computerSelection){
    const result = {
        'paper': {'paper': "Tie!",'rock':"You win!",'scissor':"You lose :("},
        'rock': { 'rock': "Tie!",'scissor':"You win!",'paper':"You lose :("},
        'scissor':{'scissor': "Tie!",'paper':"You win!",'rock':"You lose :("}      
    }
    //Devuelvo el mensaje del resultado
    return result[userSelection][computerSelection];
}

//MOSTRAR INTERFAZ VS
function showVS(){
    $(".btn-container").first().css("marginTop","150px");
    let vsContainer = $("#vs");
    vsContainer.css("display","flex");
    let playAgain = $("#resultBtn");
    playAgain.click(function(e){
        showGame();
    })
}

//MOSTRAR INTERFAZ PRINCIPAL Y OCULTAR INTERFAZ VS
function showGame(){
    if(window.screen.width <= 500){
        $(".btn-container").first().css("marginTop","300px");
    }
    else{
        $(".btn-container").first().css("marginTop","400px");
    };
    $("#computer-container .election").css("display","none");
    $("#vs").css("display","none");
    $("#game-container").css("display","flex");
}

//ACTUALIZAR EL CUADRO DE SCORE
function updateScore(result){
    console.log("Resultado:"+result)
    if(result=="You win!"){
        let score = $("#score");
        console.log("SCORE YO:"+score.text())
        score.text(parseInt(score.text()) + 1);
        if(score.text()==playUntil)
            endGame(result);
    }
    else if(result=="You lose :("){
        let scoreMachine = $("#scoreMachine");
        console.log("SCORE MAQUINA:"+scoreMachine.text())
        scoreMachine.text(parseInt(scoreMachine.text()) + 1);
        if(scoreMachine.text()==playUntil)
            endGame(result);
    }
}

//FINAL DEL JUEGO
function endGame(result){
    $("#modalEndGame p").text(result);
    $("#container").css("position","absolute");
    $("#modalEndGame").css("display","flex");
    let closeRules = $("#modalEndGame img");
    closeRules.click(function(e){
        $("#modalEndGame").css("display","none");
        $("#container").css("position","");
        showGame($("#vs"));
        startPlaying();
    })
}

//PREPARAR INTERFAZ PARA VOLVER A JUGAR
function setStartInterface(){
    $("#score").text("0");
    $("#scoreMachine").text("0");
    $("#person-container .election").html("");
    $("#computer-container .election").html("")
    $("#resultMsg").text("");
}

//ABRIR MODAL DE REGLAS
function openRulesModal(){
    $("#modal").css("display","flex");
    $("#container").css("position","absolute");
    let closeRules = $("#closeRules");
    closeRules.click(function(e){
        $("#modal").css("display","none");
        $("#container").css("position","");
    })
}

