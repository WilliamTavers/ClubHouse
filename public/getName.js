function getName(){
    console.log("ran getname");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                document.getElementById("usernameDisplay").innerText = response[0].username;
                document.getElementById("usernameDisplay").href = "/Profile.html";
            } else {
                document.getElementById("usernameDisplay").innerText = "Log in";
                document.getElementById("usernameDisplay").href = "/Login.html";
            }
        }
    };

    xhttp.send();
}
