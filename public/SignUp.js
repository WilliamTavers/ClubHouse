// SignUp Page

var Cancel_Button = document.getElementById("SignUp_Cancel");
Cancel_Button.addEventListener("click", function(){
    window.location.href = '/Login.html';
});

function signUp() {

    // SignUp data object
    var signUpData = {
        Fname: document.getElementById("SignUp_Fname").value,
        Lname: document.getElementById("SignUp_Lname").value,
        Uid: document.getElementById("SignUp_ID").value,
        Email: document.getElementById("SignUp_Email").value,
        Uname: document.getElementById("SignUp_Uname").value,
        Pwrd: document.getElementById("SignUp_Pwrd").value,
        CPwrd: document.getElementById("SignUp_CPwrd").value,
    };

    // Check if all fields are not empty (All fields required)
    for (var i in signUpData) {
        if (signUpData[i] === "") {
            document.getElementById("Error_Text").innerHTML = "All fields required";
            return;
        }
    }

    // If UserID is not a valid INT
    if (!Number.isInteger(Number(signUpData.Uid))) {
        document.getElementById("Error_Text").innerHTML = "Student ID must be an integer";
        return;
    }

    // If Password and Confirm Password match
    if (signUpData.Pwrd === signUpData.CPwrd) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/signup");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                var res = JSON.parse(xhttp.responseText);
                if (res.UserIDExists) {
                    document.getElementById("Error_Text").innerHTML = "That Student ID is already in use";
                } else {
                    console.log('Response Text:', xhttp.responseText);
                    document.getElementById("Error_Text").innerHTML = "Success";
                    window.location.href = '/';
                }
            }
        };
    // Send the data
    xhttp.send(JSON.stringify(signUpData));
    } else {
        document.getElementById("Error_Text").innerHTML = "Passwords do not match";
    }
}

// Add event to submit button
document.getElementById("SignUp_Form").addEventListener("submit", function(event){
    event.preventDefault();
    signUp();
});