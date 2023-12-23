function getIdsPosts(){

  console.log("ran getEmails function");
  let xhttp = new XMLHttpRequest();
  var Clubname = {
    ClubName: document.getElementById("Events_Title").innerText
  };
  console.log(document.getElementById("Events_Title").innerText);

  xhttp.open("POST", "/getEmailPosts");
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
        subject: document.getElementById("PostTitle").value,
        text: document.getElementById("PostDes").value
      };

      console.log(message);
      console.log("here");

      sendEmails(message);
      } else {
          console.log("getIdsPosts didnt work");
        }
    }
  };

  xhttp.send(JSON.stringify(Clubname));
}
