/* eslint-disable arrow-parens */
/* eslint-disable no-param-reassign */
const vueinst = new Vue({
    el: "#body",
    data: {
        ButtomOn: false
    },
});

window.onload=function(){
    const buttons = document.querySelectorAll('.Filter-Button, .filterManaged-Button');
    const h1 = document.getElementById('Events_Title');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
        buttons.forEach((buttonOn) => buttonOn.classList.remove('active'));
        button.classList.add('active');
        });
    });

    const modal = document.getElementById("modal");
    const btn = document.getElementById("view-all-button");
    const span = document.getElementsByClassName("close-button")[0];


    btn.onclick = function() {
        let memberCards = document.querySelectorAll('.member-card');
        let modalContent = document.querySelector('.modal-content');

        modalContent.innerHTML = ''; // Clear the modal content

        // Clone and append close button
        let clonedSpan = span.cloneNode(true);
        clonedSpan.onclick = function() {
            modal.style.display = "none";
            modalContent.innerHTML = ''; // Clear the modal content again when closing
        };
        modalContent.appendChild(clonedSpan);

        memberCards.forEach((card) => {
            let clone = card.cloneNode(true); // Clone the member card
            modalContent.appendChild(clone); // Append the clone to the modal content
        });

        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
        let modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = ''; // Clear the modal content when clicking on the original close button
    };


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            let modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = ''; // Clear the modal content when clicking outside
        }
    };

    const attendeeModal = document.getElementById("attendees-modal");
    const attendeeBtns = document.querySelectorAll("#attendees-button");
    const attendeeSpan = document.querySelector(".attendees-close-button");

    attendeeBtns.forEach((attendeeBtn) => {
        attendeeBtn.addEventListener("click", () => {
            let memberCards = document.querySelectorAll('.member-card');
            let modalContent = attendeeModal.querySelector('.modal-content');
            modalContent.innerHTML = '<span class="attendees-close-button">&times;</span>'; // This is to clear the modal content and add the close button back
            memberCards.forEach((card) => {
                let clone = card.cloneNode(true); // Clone the member card
                modalContent.appendChild(clone); // Append the clone to the modal content
            });

            attendeeModal.style.display = "block";
        });
    });


    attendeeSpan.onclick = function() {
        attendeeModal.style.display = "none";
        let modalContent = attendeeModal.querySelector('.modal-content');
        modalContent.innerHTML = '<span class="attendees-close-button">&times;</span>'; // This is to clear the modal content and add the close button back
    };


    window.onclick = function(event) {
        if (event.target == attendeeModal) {
            attendeeModal.style.display = "none";
        }
    };
    // end attendess and view all


    const currentUrl = window.location.href;
    if (currentUrl=== '/ManageEvents.html') {
        const managedButtons = document.querySelectorAll('.filterManaged-Button');

        managedButtons.forEach((button) => {
          button.addEventListener('click', () => {
            managedButtons.forEach((buttonOn) => buttonOn.classList.remove('active'));
            button.classList.add('active');
            h1.textContent = button.value; // Update h1 text with button value
          });
        });

      }
      document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.currentTarget.parentNode.parentNode.style.display = 'none';
            updateNoPostsMessage();
        });
    });
    document.querySelectorAll('.modify-button').forEach((button) => {
        button.addEventListener('click', (e) => {
            alert('Modify post: ' + e.currentTarget.parentNode.id);
        });
    });


    function createEvent() {
        // Create a new post
        const newEvent = document.createElement('div');
        newEvent.classList.add('Manage_Info');

        // Add the inner HTML to the new post
        newEvent.innerHTML = `
            <div class="Manage_Info">
                <div class="button-container">
                 <button class="delete-button">X</button>
                 <button class="modify-button">E</button>
                </div>
                <h2 class="Event_Name">Event Name</h2>

                <div class="event-details">
                    <p>Date: <span class="Event_Date">Date of event</span></p>
                    <p>Time: <span class="Event_Time">Time of event</span></p>
                    <p>Location: <span class="Event_Location">Location of event</span></p>
                </div>

                <div class="Manage_Content">
                    <div class="ManageText">
                        <h1 class="ManageTitleEvent">About the Event</h1>
                        <p class="ManageDescription">Some event info, possibly containing a message from the event organizer
                        and/or relevant event details. Who knows what they'll write here, I'm just writing a bunch of stuff
                        so that this p element is filled out so I can test it.
                        </p>
                    </div>
                    <img src="/images/icecreamImage.jpg" alt="No img Loaded" class="ManageImg">
                </div>
                <button id="attendees-button" class="make-event-button">Attendees</button>
            </div>
        `;

        // Append the new post to the Manage_List
        document.querySelector('.ManageList').appendChild(newEvent);

        // Add delete and modify event listeners to the new post
        newEvent.querySelector('.delete-button').addEventListener('click', (e) => {
            e.currentTarget.parentNode.parentNode.parentNode.style.display = 'none';
        });
        newEvent.querySelector('.modify-button').addEventListener('click', (e) => {
            alert('Modify post: ' + e.currentTarget.parentNode.parentNode.id);
        });
    }


    document.getElementById('make-event-button').addEventListener('click', () => {
        createEvent();
    });



};