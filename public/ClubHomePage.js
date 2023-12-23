function ClubHomePage(){
    var urlString = window.location.href;
    var theurl = new URL(urlString);
    var name = theurl.searchParams.get("ClubName");
    var clubName = {
        ClubName: name
      };

    console.log("ran clubhomepage function for a club called " + name);

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/postInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                document.getElementById("ClubPage_Title").innerHTML = response[0].ClubName;
                for (let index = 0; index < response.length; index++) {
                    let datevar = response[0].PostDate.substr(0,16);
                    let nodash = datevar.replace("-"," ");
                    nodash = nodash.replace("-"," ");
                    nodash = nodash.replace("T"," ");
                    console.log("doing club " + encodeURIComponent(response[index].ClubName));
                    document.getElementById("postContent").innerHTML += '<div class="PostContent_Info"><div class="Post_Content"><div class="PostLeft"><div class="PostAboutInfo"><div class="Owner-Profile"><i class="fa-solid fa-user" href="/events/"></i></div><div class="NameandDate"><p id="posterName"></p><p id="postDate">' + nodash +'</p></div><p class="ClubNamedisplay" id="postClubName">'+ name +'</p></div><div class="PostImage"><img src="/images/icecreamImage.jpg" alt="No img Loaded" class="Post_img"></div></div><div class="PostRight"><div class="PostTitle"><h1 id="postTitle">'+response[0].PostTitle+'</h1></div><div class="PostText" id="postText"><p>'+response[0].PostText+'</p></div></div></div></div>';
                }
            } else {
                console.log("no posts found!");
                document.getElementById("postContent").innerHTML += '<p>No posts in this group!</p>';
            }
        }
    };
    console.log(JSON.stringify(clubName));
    xhttp.send(JSON.stringify(clubName));
}

function joinOrLeaveButton(){
    var urlString = window.location.href;
    var theurl = new URL(urlString);
    var name = theurl.searchParams.get("ClubName");
    var clubName = {
        ClubName: name
      };

    console.log("ran joinOrLeaveButton function for a club called " + name);

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/joinOrLeave");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                console.log("Is Already In Group!");
                document.getElementById("topContent").innerHTML = '<h1 id="ClubPage_Title">' + name + '</h1><div class="joinButton" id="leaveButton"><label><input type="checkbox" value="1" id="joinInput" onclick="leaveClubHomePage()"><span id="joinText">Leave Group</span></label></div><div class="manageButton" id="manageButton"><label><input type="checkbox" value="1" id="manageInput" onclick="location.href=`/Manage.html?ClubName=' + encodeURIComponent(name) + '`"><span id="manageText">Manage Club</span></label></div>';
            } else {
                console.log("Can Leave Group!");
                document.getElementById("topContent").innerHTML = '<h1 id="ClubPage_Title">' + name + '</h1><div class="joinButton" id="joinButton"><label><input type="checkbox" value="1" id="joinInput" onclick="joinClubHomePage()"><span id="joinText">Join Group</span></label></div><div class="manageButton" id="manageButton"><label><input type="checkbox" value="1" id="manageInput" onclick="location.href=`/Manage.html?ClubName=' + encodeURIComponent(name) + '`"><span id="manageText">Manage Club</span></label></div>';
            }
        }
    };
    xhttp.send(JSON.stringify(clubName));
}

function clubEvents(){
    var urlString = window.location.href;
    var theurl = new URL(urlString);
    var name = theurl.searchParams.get("ClubName");
    var clubName = {
        ClubName: name
      };

    console.log("ran clubEvents function for a club called " + name);

    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/clubEventInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    document.getElementById("EventTab-List").innerHTML += '<li class="UpcomingEvent"><div class="Event_Tab"><img src="/images/icecreamImage.jpg" alt="No img Loaded" class="EventTab_img"><div class="Tab_text">' + response[index].EventName + '</div></div></li>';
                }
            } else {
                console.log("no posts found!");
                document.getElementById("EventTab-List").innerHTML += '<li><p>No Events in clubs!</p></li>';
            }
        }
    };
    xhttp.send(JSON.stringify(clubName));
}