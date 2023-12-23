function goGetAllPosts(clubs){
    console.log("ran get all posts function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/homePostInfo");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function (req, res, next) {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                for (let index = 0; index < response.length; index++) {
                    let datevar = response[index].PostDate.substr(0,16);
                    let nodash = datevar.replace("-"," ");
                    nodash = nodash.replace("-"," ");
                    nodash = nodash.replace("T"," ");
                    console.log("doing club " + response[index].PostTitle);
                    document.getElementById("Feed_List").innerHTML += '<div class="Feed_Info"><div class="Profile_Details"><div class="Profile_Top"><img src="/path_to_profile_picture.jpg" alt="Profile Picture" class="Profile_Pic"><h2 class="Profile_Name">' + response[index].ClubName + '</h2></div><p class="Published_Date">' + nodash + '</p></div><div class="Feed_Content"><img src="/images/icecreamImage.jpg" alt="No img Loaded" class="Feed_img"><div class="Feed_Text"><h1 class="FeedTitle">' + response[index].PostTitle + '</h1><p class="FeedDescription"> '+ response[index].PostText + '</p></div></div></div>';
                }
            } else {
                console.log("no posts found!");
                document.getElementById("Feed_List").innerHTML += '<p>No posts in clubs!</p>';
            }
        }
    };
    var Clubs = {
        ClubNames: clubs
    };
    console.log(JSON.stringify(Clubs));
    xhttp.send(JSON.stringify(Clubs));
}

function HomePage(){
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
                goGetAllPosts(clubnamelist);
            } else {
                console.log("no posts found!");
                goGetAllPosts("")
            }
        }
    };

    xhttp.send();
}

