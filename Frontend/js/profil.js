

$(document).ready(function(){

    $("#anmelden").click(function(){

        let logintext = $("#anmeldeinp").val();
        let passworttext = $("#passwortinp").val();
        let url = `http://127.0.0.1:5001/users/'${logintext}':'${passworttext}'`
        let ergebnis = false

        $.ajax({url: url, success: function(result){
            ergebnis = result === "True"
            if(logintext !== "" && passworttext !== "" && ergebnis){
                window.localStorage.setItem("name",  logintext);
                window.localStorage.setItem("passwort",  passworttext);
            } else{alert("Falscher Anmeldename oder Passwort")}
    
        }});

    
    })

    $("#registrieren").click(function(){

        let logintext = $("#anmeldeinp").val();
        let passworttext = $("#passwortinp").val();
        let url = `http://127.0.0.1:5001/users/'${logintext}':'${passworttext}'`


        $.ajax({url: url, success: function(result){
            let ergebnis = result === "True"
            console.log(url);
            console.log(result);
            if(ergebnis){
                alert("Account existiert bereits")
            } else{
                fetch(url, {
                    method: 'post'
                }).then((response) => {
                    return response.json()
                }).then((res) => {
                    if (res.status === 201) {
                        console.log("Post successfully created!")
                    }
                }).catch((error) => {
                    console.log(error)
                })
                
            }
        }});      
    })
})


