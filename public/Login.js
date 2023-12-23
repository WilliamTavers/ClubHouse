function login() {

    // Login data object
    var loginData = {
      username: document.getElementById("Login_Username").value,
      password: document.getElementById("Login_Password").value
    };

    var req = new XMLHttpRequest();

    req.open("POST", "/login");
    req.setRequestHeader("Content-Type", "application/json");

    req.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        var res = JSON.parse(req.responseText);
        if (res.success) {
          document.getElementById("Error_Text").innerHTML = "LOGIN SUCCESSFUL";
          window.location.href = "/index.html";
        } else {
          document.getElementById("Error_Text").innerHTML = "LOGIN FAILED: Please check your Username and Password";
        }
      } else {
        document.getElementById("Error_Text").innerHTML = "ERROR CONNECTING";
      }
    };

    req.send(JSON.stringify(loginData));
  }

  document.getElementById("Login_Forms").addEventListener("submit", function(event) {
    event.preventDefault();
    login();
  });
