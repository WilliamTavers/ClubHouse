function profileInfo(){
    console.log("ran getprofile");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                document.getElementById("First-Name").value = response[0].GivenName;
                document.getElementById("Username").value = response[0].username;
                document.getElementById("Email").value = response[0].Email;
                document.getElementById("Surname").value = response[0].Surname;
                document.getElementById("Password").value = response[0].password;
            } else {
                console.log("error retreiving user info");
            }
        }
    };

    xhttp.send();
}

function updateProfileInfo(){
    console.log("ran updateProfileInfo");
    var Profile = {
        FirstName: document.getElementById("First-Name").value,
        UserName: document.getElementById("Username").value,
        Email: document.getElementById("Email").value,
        Surname: document.getElementById("Surname").value,
        Password: document.getElementById("Password").value
    };
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/updateProfile");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("AcceptChanges").id = "EditProfile";
            document.getElementById("AcceptEditButton").onclick = function() { EditProfile(); };
            document.getElementById("EditText").innerHTML = "Edit Profile";
            document.getElementById("FormRightPassword").innerHTML = '<label for="PasswordButton" class="labels">Password</label><input type="button" id="PasswordButton" name="PasswordButton" value="Change Password" onclick="ChangePassword()"><br>';
            document.getElementById("First-Name").readOnly = true;
            document.getElementById("Username").readOnly = true;
            document.getElementById("Email").readOnly = true;
            document.getElementById("Surname").readOnly = true;
            document.getElementById("Password").readOnly = true;
            document.getElementById("PasswordButton").readOnly = false;
        }
    };

    xhttp.send(JSON.stringify(Profile));
}

function logout(){
    console.log("ran logout");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/logout");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            alert("Logged out");
            window.location.href = "/index.html";
            return;
        }
    };

    xhttp.send();
}
