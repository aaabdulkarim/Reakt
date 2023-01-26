
function anmelden(){

    let logintext = $("#anmeldeinp").val();
    let passworttext = $("#passwortinp").val();
    let url = `http://127.0.0.1:5001/users/'${logintext}':'${passworttext}'`
    let ergebnis = false

    $.ajax({url: url, success: function(result){
        ergebnis = result === "True"

        if(logintext !== "" && passworttext !== "" && ergebnis){
            localStorage.setItem("name",  logintext);
            localStorage.setItem("passwort",  passworttext);
            $.ajax({url: `http://127.0.0.1:5001/users/id/'${logintext}'`, success: function(id){

                localStorage.setItem("id", id[0][0]);
            }});
        }
        else{
            alert("Falscher Anmeldename oder Passwort")
        }

        
    }});


}
$(document).ready(function(){

    $("#anmelden").click(anmelden)

    $("#registrieren").click(function(){

        let logintext = $("#anmeldeinp").val();
        let passworttext = $("#passwortinp").val();
        let url = `http://127.0.0.1:5001/users/'${logintext}':'${passworttext}'`


        $.ajax({url: url, success: function(result){
            let ergebnis = result === "True"

            if(ergebnis){
                alert("Account existiert bereits")
            } else if(logintext != "" && passworttext != ""){
                // Call zum Schauen ob der Name schon existiert
                $.ajax({url: `http://127.0.0.1:5001/users/name/'${logintext}'`, success: function(result2){
    
                    // Account create
                    if(result2 === "False"){
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
                        // anmelden()
                    } else {alert("Name existiert bereits")}
                }});
            }
        }});      
    })
    
    $.ajax({url: "http://127.0.0.1:5001/friends/" + localStorage.getItem("id"), success: function(result){
        console.log(result);
        $.ajax({url: "http://127.0.0.1:5001/users/id/" + localStorage.getItem("id"), success: function(userdata){
            console.log(userdata);
        }});
    }});
    

})



