function leaveClubHomePage(){
    var urlString = window.location.href;
    var theurl = new URL(urlString);
    var name = theurl.searchParams.get("ClubName");
    var clubName = {
        ClubName: name
      };

    console.log("ran leaveClubHomePage function for a club called " + name);

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/leaveClubGroup");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("leaveButton").id = "joinButton";
            document.getElementById("joinInput").onclick = function() { joinClubHomePage(); };
            document.getElementById("joinText").innerHTML = "Join Group";
        } else {
            console.log("Could not leave club!");
        }
    };

    xhttp.send(JSON.stringify(clubName));
}

