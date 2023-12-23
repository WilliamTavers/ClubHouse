/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-parens */

function deletePost(postID){
    var postCard = document.getElementById("card"+postID);
    console.log(postID);
    postCard.remove();

    var xhttp1 = new XMLHttpRequest();
    xhttp1.open('POST', '/managePosts/deletePost');
    xhttp1.setRequestHeader('Content-Type', 'application/json');
    xhttp1.send(JSON.stringify({ postID }));
}
function displayAllMembers(memberNames) {
    // Remove existing pop-up containers if any
    const existingPopups = document.querySelectorAll('.popup');
    existingPopups.forEach(popup => {
      popup.remove();
    });

    // Create the pop-up container
    const popupDiv = document.createElement('div');
    popupDiv.classList.add('popup');

    // Add member cards to the pop-up
    memberNames.forEach(memberName => {
      let memberCardHTML = `
        <li class="member-card">
          <img src="/path_to_profile_picture.jpg" alt="Profile Picture" class="member-pic">
          <div class="member-info">
            <h2 class="member-name">${memberName}</h2>
            <p class="member-role">Role</p>
          </div>
        </li>`;

      popupDiv.innerHTML += memberCardHTML;
    });

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
      document.body.removeChild(popupDiv);
    });
    popupDiv.appendChild(closeButton);

    // Append the pop-up container to the body
    document.body.appendChild(popupDiv);
  }

function updateMemberCards(clubName) {
    console.log("running UpdateMemberCards function");
    fetch(`/clubMembers?clubName=${clubName}`)
        .then(response => response.json())
        .then(memberNames => {
            // Clearing existing member cards
            const memberCardsElement = document.querySelector('#rightFilterList');
            memberCardsElement.innerHTML = '';

            // Adding new member cards
            memberNames.forEach(memberName => {
                let memberCardHTML = `
                <li class="member-card">
                    <img src="/path_to_profile_picture.jpg" alt="Profile Picture" class="member-pic">
                    <div class="member-info">
                        <h2 class="member-name">${memberName}</h2>
                        <p class="member-role">Role</p>
                    </div>
                </li>`;

                memberCardsElement.innerHTML += memberCardHTML;
            });
        })
        .catch(err => console.error('Error:', err));
}



function updatePostCards(clubName) {
    console.log("Running updatePostCards function");
    fetch(`/getClubPosts?clubName=${clubName}`)
        .then(response => response.json())
        .then(posts => {
            // Clearing existing post cards
            const postCardsElement = document.querySelector('.Manage_List');
            postCardsElement.innerHTML = '';

            // Adding new post cards
            posts.forEach(post => {
                let postCardHTML = `
                <div class="Manage_Info" id = "card${post.PostID}">
                    <div class="button-container">
                        <button class="delete-button" onclick="deletePost('${post.PostID}')">X</button>
                        <button class="modify-button">E</button>
                    </div>
                    <div class="Profile_Details">
                        <div class="Profile_Top">
                            <img src="/path_to_profile_picture.jpg" alt="Profile Picture" class="Profile_Pic">
                            <h2 class="Profile_Name">${post.Username}</h2>
                            <h2 class="ClubName"><a href="/ClubHomePage.html">${post.ClubName}</a></h2>
                        </div>
                        <p class="Published_Date">${post.PostDate}</p>
                    </div>
                    <div class="Manage_Content">
                        <img src="/images/icecreamImage.jpg" alt="No img Loaded" class="Manage_img">
                        <div class="Manage_Text">
                            <form class="ManageTitle" readonly>${post.PostTitle}</form>
                            <form class="ManageDescription" readonly>${post.PostText}</form>
                        </div>
                    </div>
                </div>`;
                postCardsElement.innerHTML += postCardHTML;
            });
        })
        .catch(err => console.error('Error:', err));
}

function addClubButtonListeners() {
    let buttons = document.querySelectorAll('.filterManaged-Button');
    var eventTitle = document.getElementById('Events_Title');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button ' + this.value + ' clicked!');
            updateMemberCards(this.value);
            updatePostCards(this.value);
            eventTitle.innerText = this.value;
        });
    });
}


function getManagedClubs(){
    console.log("Running getManagedClubs function");
    let xhttp = new XMLHttpRequest();

    xhttp.open("POST", "/getManagedClubs");
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            const response = JSON.parse(this.responseText);
            if (response.length > 0) {
                console.log("Found some clubs the user manages");

                let managedClubList = document.getElementById("managedClubList");
                managedClubList.innerHTML = '';// Clear current list

                response.forEach(club => {
                    let listItem = document.createElement("li");
                    let label = document.createElement("label");
                    let input = document.createElement("input");

                    input.type = "button";
                    input.className = "filterManaged-Button";
                    input.value = club.ClubName;

                    label.appendChild(input);
                    listItem.appendChild(label);
                    managedClubList.appendChild(listItem);
                });

                addClubButtonListeners();
            } else {
                console.log("User doesn't manage any clubs!");
            }
        }
    };

    xhttp.send();
}


window.onload = function() {
    getManagedClubs();
    const viewAllButton = document.querySelector('#view-all-button');
    viewAllButton.addEventListener('click', displayAllMembers);
};

