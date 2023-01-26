let performances = [];
let neuesSpiel = true;
let started = false;

function game(anzahl) {

    /* anzahl - wie oft schon das timing getestet wurde*/

    // Spielfeld angaben ändern
    $("#game").removeClass("uk-tile-secondary");
    $("#game").addClass("uk-tile-primary");
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
                
                
                $("#game").removeClass("uk-tile-primary");
                $("#game").addClass("win-tile");

                $("#angabe").text(timing + " ms");
                $("#angabe1").text("Für neues Spiel klicken");

                anzahl = 0;
                // make api call
                performances.forEach(element => {
                    postrequest(element)
                });

                performances = []
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

    // Muss versteckt werden da es nach einem Fehlschlag weitergeht mit vorherigen anzahl variable
    $("#restart").hide();

    $("#angabe").text("Sobald sich die Farbe auf blau ändert, klicken");
    $("#angabe1").text("");

    console.log($("#game").hasClass("uk-tile-secondary"))

    let timeout = setTimeout(function() {
        game(anzahl)
    }, getRandomInt(1600, 6000))

    $(document).ready(function(){

        $("#game").click(function(){
            
            if($("#game").hasClass("uk-tile-secondary")){
                $("#game").addClass("lose-tile");
                $("#game").removeClass("uk-tile-secondary");
                $("#angabe").text("Erst Klicken nachdem die Farbe blau wird");

                clearTimeout(timeout);

                $("#game").off("click");
                $("#restart").show();

                $("#restart").click(function() {
                    load(anzahl)

                    $("#restart").off("click")

                })
            
            }
        });
    });
}

$(document).ready(function(){
    $("#game").click(function(){
        if(!started) load(0)
    });
});
  

function postrequest(score) {
    let url = 'http://127.0.0.1:5001/scores/' + localStorage.getItem("id") + ":" + score
    console.log(url);
    if(localStorage.getItem("name") == "" || localStorage.getItem("passwort") == "" || isNaN(localStorage.getItem("id"))){
        alert("Um die Performances zu speichern musst du dich anmelden")
    }
    else{ 
        fetch(url, {
            method: 'post'
        }).then((response) => {
            return response
        }).then((res) => {
            if (res.status === 201) {
                console.log("Post successfully created!")
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}

