/* eslint-disable no-multi-spaces */
/* eslint-disable arrow-parens */
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

            const viewAllButton = document.querySelector('#view-all-button');
            viewAllButton.addEventListener('click', () => {
              displayAllMembers(memberNames);
            });

        })
        .catch(err => console.error('Error:', err));
}

function displayAttendees(eventID) {
    console.log("Running displayAttendees function");
    fetch(`/getEventAttendees?eventID=${eventID}`)
        .then(response => response.json())
        .then(userNames => {
              let popupDiv = document.createElement('div');

            // style
            popupDiv.style.position = 'fixed';
            popupDiv.style.left = '50%';
            popupDiv.style.top = '50%';
            popupDiv.style.transform = 'translate(-50%, -50%)';
            popupDiv.style.backgroundColor = '#7ba6b4';
            popupDiv.style.padding = '30px';
            popupDiv.style.border = '2px solid #white';
            popupDiv.style.borderRadius = '10px';
            popupDiv.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            popupDiv.style.zIndex = '1000';

              let popupTitle = document.createElement('h2');
              popupTitle.textContent = 'Attendees';
              popupDiv.appendChild(popupTitle);

              userNames.forEach(userName => {
                  let attendeeName = document.createElement('p');
                  attendeeName.textContent = userName.GivenName;
                  popupDiv.appendChild(attendeeName);
              });

              let closeButton = document.createElement('button');
              closeButton.textContent = 'Close';
              closeButton.addEventListener('click', function() {
                  document.body.removeChild(popupDiv);
              });
              popupDiv.appendChild(closeButton);

              document.body.appendChild(popupDiv);

            console.log(userIDs);
        })
        .catch(err => console.error('Error:', err));
}

function updateEventCards(clubName) {
    console.log("running updateEventCards function");
    fetch(`/getClubEvents?clubName=${clubName}`)
        .then(response => response.json())
        .then(events => {
            // Clearing existing event cards
            const eventCardsElement = document.querySelector('.ManageList');
            eventCardsElement.innerHTML = '';

            // Adding new event cards
            events.forEach(event => {
                let eventCardHTML = `
                <div class="Manage_Info" data-event-id="${event.EventID}">
                    <div class="button-container">
                        <button type = "button" class="delete-button" onclick="deleteEvent('${event.EventID}')">X</button>
                        <button type = "button" class="modify-button">E</button>
                    </div>

                    <h2 class="Event_Name">${event.EventName}</h2>

                    <div class="event-details">
                        <p>Date: <span class="Event_Date">${event.EventDate}</span></p>
                        <p>Location: <span class="Event_Location">${event.Location}</span></p>
                    </div>

                    <div class="Manage_Content">
                        <div class="ManageText">
                            <h1 class="ManageTitleEvent">About the Event</h1>
                            <p class="ManageDescription">${event.EventDescription}</p>
                        </div>
                        <img src="/images/icecreamImage.jpg" alt="No img Loaded" class="ManageImg">
                    </div>
                    <button type = "button" id="attendees-button" class="make-event-button">Attendees</button>
                </div>`;

                eventCardsElement.innerHTML += eventCardHTML;
            });
            // changes
            document.querySelectorAll('#attendees-button').forEach(button => {
                button.addEventListener('click', function() {
                    let eventID = this.closest('.Manage_Info').dataset.eventId;
                    displayAttendees(eventID);
                });
            });

            // changes end
        })
        .catch(err => console.error('Error:', err));
}

function addClubButtonListeners() {
    let buttons = document.querySelectorAll('.filterManaged-Button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button ' + this.value + ' clicked!');
            updateMemberCards(this.value);
            updateEventCards(this.value);
            document.getElementById('Events_Title').innerText = this.value;
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
                managedClubList.innerHTML = '';  // Clear current list

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
