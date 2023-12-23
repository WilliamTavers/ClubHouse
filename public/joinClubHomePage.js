function joinClubHomePage(){
    var urlString = window.location.href;
    var theurl = new URL(urlString);
    var name = theurl.searchParams.get("ClubName");
    var clubName = {
        ClubName: name
      };

    console.log("ran joinClubHomePage function for a club called " + name);

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/joinClubGroup");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("joinButton").id = "leaveButton";
            document.getElementById("joinInput").onclick = function() { leaveClubHomePage(); };
            document.getElementById("joinText").innerHTML = "Leave Group";
        } else {
            console.log("Could not join club!");
        }
    };

    xhttp.send(JSON.stringify(clubName));
}

