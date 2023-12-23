function getIdsEvents(){

  console.log("ran getEmails function");
  let xhttp = new XMLHttpRequest();
  var Clubname = {
    ClubName: document.getElementById("Events_Title").innerText
  };
  console.log(document.getElementById("Events_Title").innerText);
  xhttp.open("POST", "/getEmailEvents");
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.onreadystatechange = function (req, res, next) {
    if (this.readyState === 4 && this.status === 200) {

      const response = JSON.parse(this.responseText);
        if (response.length > 0) {
            var emails= response[0].Email;
            for (let index = 1; index < response.length; index++) {
              emails += ", ";
              emails += response[index].Email;
            }

          var message = {
            from: "AdelaideUniClubs@email.com",
            to: emails,
            subject: document.getElementById("EventName").value,
            text: document.getElementById("EventDes").value
          };
          sendEmails(message);
        } else {
          console.log("getIdsEvents didnt work");
        }
    }
  };

  xhttp.send(JSON.stringify(Clubname));
}