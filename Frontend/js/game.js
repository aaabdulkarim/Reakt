let performances = [];
let neuesSpiel = true;

function game(anzahl) {

    /* anzahl - wie oft schon das timing getestet wurde*/

    // Spielfeld angaben ändern
    $("#game").removeClass();
    $("#game").addClass("uk-tile-primary");
    $("#game").addClass("uk-tile");
    $("#game").addClass("uk-text-center");
    $("#angabe").text("Klicken!");
    $("#angabe1").text("");

    $(document).ready(function(){
        const startTime = performance.now();

        $("#game").click(function(){
            const endTime = performance.now();

            const timing = Math.round(endTime - startTime);


            if(anzahl == 3){

                console.log("Anzahl übertroffen")
                neuesSpiel = false;
                
                $("#angabe").text(timing + " ms");
                $("#angabe1").text("Für neues Spiel klicken");
                
                anzahl = 0;
                // make api call
                
            }

            else if(neuesSpiel){
                
                console.log("ladet neues Spiel")
                // Spielfeld angaben ändern
                $("#angabe").text(timing + " ms");
                $("#angabe1").text("Für nächsten Versuch klicken");
                // Timing wird zum Array zum späteren Berechnen des Durchschnitts berechnen
                performances.push(timing)


                
                neuesSpiel = false;

            } 
            
            // Auf erneutes klicken neue Runde laden
            else {

                console.log("Ladet neue Runde")
                neuesSpiel = true;

                anzahl++;
                // Event listener muss entfernt werden, 
                // sonst existieren nach dem letzem klick mehrere mit der selben funktion
                $("#game").off("click")

                load(anzahl);

            } 
        });
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function load(anzahl) {
    /* anzahl - wie oft schon das timing getestet wurde*/

    $("#game").removeClass();
    $("#game").addClass("uk-tile-secondary");
    $("#game").addClass("uk-tile");
    $("#game").addClass("uk-text-center");
    started = true;

    $("#angabe").text("Sobald sich die Farbe auf blau ändert, klicken");
    $("#angabe1").text("");

    console.log($("#game").hasClass("uk-tile-secondary"))
    $(document).ready(function(){

        $("#game").click(function(){
            
            if($("#game").hasClass("uk-tile-secondary")){
                $("#game").addClass("lose-tile");
                $("#game").removeClass("uk-tile-secondary");

                $("#game").off("click");
            }
        });
    });
    setTimeout(function() {
        game(anzahl)
    }, getRandomInt(1600, 6000))
}

let started = false;

$(document).ready(function(){
    $("#game").click(function(){
        if(!started) load(0)
    });
});
  