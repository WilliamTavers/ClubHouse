function goGetAllEvents(clubs){
    console.log("ran get all posts function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/homeEventInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    console.log("doing club " + response[index].PostTitle);
                    document.getElementById("EventTab-List").innerHTML += '<li><div classs="Event_Tab"><img src="/images/icecreamImage.jpg" alt="No img Loaded" class="EventTab_img"><div class="Tab_text">' + response[index].EventName + '</div></div></li>';
                }
            } else {
                console.log("no posts found!");
                document.getElementById("EventTab-List").innerHTML += '<li><p>No Events in clubs!</p></li>';
            }
        }
    };
    var Clubs = {
        ClubNames: clubs
    };
    console.log(JSON.stringify(Clubs));
    xhttp.send(JSON.stringify(Clubs));
}

function HomePageEvents(){
    console.log("ran homepage function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getUserClubs");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                var clubnamelist = [];
                console.log("found some clubs in the js ");
                for (let index = 0; index < response.length; index++) {
                    console.log("doing club " + encodeURIComponent(response[index].ClubName));
                    clubnamelist[index] = response[index].ClubName;
                }
                goGetAllEvents(clubnamelist);
            } else {
                console.log("no posts found!");
                goGetAllEvents("");
            }
        }
    };

    xhttp.send();
}

