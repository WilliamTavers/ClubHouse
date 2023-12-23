function getFullEvents(){
    console.log("ran events function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getAllEvents");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                console.log("found some events in the js ");
                for (let index = 0; index < response.length; index++) {
                    let datevar = response[index].EventDate.substr(0,16);
                    let nodash = datevar.replace("-"," ");
                    nodash = nodash.replace("-"," ");
                    nodash = nodash.replace("T"," ");
                    console.log("doing events " + response[index].EventName);
                    document.getElementById("EventsList").innerHTML +='<div class="Event_Info"><div class="Event_Content"><div class="Event_Text"><h1 class="EventTitle">'+response[index].EventName+'</h1><div class="EventDetails"><p>'+nodash+'</p><p>'+response[index].Location+'</p></div><p class="EventDescription">'+response[index].EventDescription+'</p></div><button class="attendButton" id="attendButton'+response[index].EventID+'" type="submit" onclick="AttendEvent('+response[index].EventID+');">Attend Event</button></div><img src="/images/icecreamImage.jpg" alt="No img Loaded" class="Event_img"></div>';
                }
            } else {
                console.log("no events found!");
                document.getElementById("EventTabList").innerHTML += '<p>Log in to see some events!</p>';
            }
        }
    };

    xhttp.send();
}

function attendEventRoute(EventID){
    console.log("ran attend event");
    var EventData = {
        EventID: EventID
    };
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/attendEvent");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("attendButton"+EventID).onclick = function() { leaveEvent(EventID); };
            document.getElementById("attendButton"+EventID).innerText = "Leave Event";
            document.getElementById("attendButton"+EventID).id = "leaveEventButton"+EventID;
        }
    };

    xhttp.send(JSON.stringify(EventData));
}

function leaveEventRoute(EventID){
    console.log("ran leave event");
    var EventData = {
        EventID: EventID
    };
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/leaveEvent");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("leaveEventButton"+EventID).onclick = function() { AttendEvent(EventID); };
            document.getElementById("leaveEventButton"+EventID).innerText = "Attend Event";
            document.getElementById("leaveEventButton"+EventID).id = "attendButton"+EventID;
        }
    };

    xhttp.send(JSON.stringify(EventData));
}

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

function yourEvents(clubs){
    console.log("ran get user events function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/homeEventInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    console.log("doing event " + response[index].EventName);
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

function eventsEvents(){
    console.log("ran events events function");
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
                yourEvents(clubnamelist);
            } else {
                console.log("no posts found!");
                document.getElementById("EventTab-List").innerHTML += '<p>Log in to see events!</p>';
            }
        }
    };

    xhttp.send();
}

function attendingOrNot(){
    var urlString = window.location.href;
    var theurl = new URL(urlString);
    var name = theurl.searchParams.get("ClubName");

    console.log("ran attendOrNot function for a club called " + name);

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getUserEvents");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    console.log(response[index].EventID);
                    var button = "attendButton"+response[index].EventID;
                    console.log(button);
                    document.getElementById("attendButton"+response[index].EventID).onclick = function() { leaveEvent(response[index].EventID); };
                    document.getElementById("attendButton"+response[index].EventID).innerText = "Leave Event";
                    document.getElementById("attendButton"+response[index].EventID).id = "leaveEventButton"+response[index].EventID;
                }
            } else {
                console.log("Not Attending any Events!");
            }
        }
    };
    xhttp.send();
}
