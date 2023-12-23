function sendEmails(message){
  console.log("ran exploreclubpage function");
  let xhttp = new XMLHttpRequest();

  xhttp.open("POST", "/sendMail");
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function (req, res, next) {
      if (this.readyState === 4 && this.status === 200) {
        console.log("emails sent");

      }
  };
    console.log(message);
    console.log("here");

  xhttp.send(JSON.stringify(message));
  }

