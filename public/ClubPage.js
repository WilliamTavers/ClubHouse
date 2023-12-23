function ClubPage(){
    console.log("ran clubpage function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getUserClubs");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                document.getElementById("ClubsDisplayList").innerHTML = "";
                console.log("found some clubs in the js ");
                for (let index = 0; index < response.length; index++) {
                    console.log("doing club " + encodeURIComponent(response[index].ClubName));
                    document.getElementById("ClubsDisplayList").innerHTML += '<div class="Club_Info"><img src="/images/Forest.jpg" alt="No img Loaded" class="Club_img"><div class="Club_Name"><a href="/ClubHomePage.html?ClubName=' + encodeURIComponent(response[index].ClubName) + '">'+ response[index].ClubName +'</a></div>';
                }
            } else {
                document.getElementById("ClubsDisplayList").innerHTML = "<p>Log in to see your clubs!</p>";
            }
            document.getElementById("My_Clubs").onclick = function(){ };
            document.getElementById("Explore_Clubs").onclick = function(){ exploreClubPage(); };
            document.getElementById("My_Clubs").classList.add("Activated");
            document.getElementById("Explore_Clubs").classList.remove("Activated");

        }
    };

    xhttp.send();
}

function exploreClubPage(){
    console.log("ran exploreclubpage function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getAllClubs");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                document.getElementById("ClubsDisplayList").innerHTML = "";
                console.log("found some clubs in the js ");
                for (let index = 0; index < response.length; index++) {
                    console.log("doing club " + encodeURIComponent(response[index].ClubName));
                    document.getElementById("ClubsDisplayList").innerHTML += '<div class="Club_Info"><img src="/images/Forest.jpg" alt="No img Loaded" class="Club_img"><div class="Club_Name"><a href="/ClubHomePage.html?ClubName=' + encodeURIComponent(response[index].ClubName) + '">'+ response[index].ClubName +'</a></div>';
                }
            } else {
                document.getElementById("ClubsDisplayList").innerHTML = "<p>Log in to see your clubs!</p>";
            }
            document.getElementById("My_Clubs").onclick = function(){ ClubPage(); };
            document.getElementById("Explore_Clubs").onclick = function(){};
            document.getElementById("My_Clubs").classList.remove("Activated");
            document.getElementById("Explore_Clubs").classList.add("Activated");

        }
    };

    xhttp.send();
}
