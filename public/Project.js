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

    // change
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

        const modal = document.getElementById("modal");
        const btn = document.getElementById("view-all-button");
        const span = document.getElementsByClassName("close-button")[0];

        btn.onclick = function() {
            modal.style.display = "block";
            let memberCards = document.querySelectorAll('.member-card');
            let modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = '<span class="close-button">&times;</span>'; // This is to clear the modal content and add the close button back
            memberCards.forEach((card) => {
                let clone = card.cloneNode(true); // Clone the member card
                modalContent.appendChild(clone); // Append the clone to the modal content
            });
        }


        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
      }
      document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', e => {
            e.currentTarget.parentNode.parentNode.style.display = 'none';
            updateNoPostsMessage();
        });
    });
    document.querySelectorAll('.modify-button').forEach(button => {
        button.addEventListener('click', e => {
            alert('Modify post: ' + e.currentTarget.parentNode.id);
        });
    });





    // new changes
        updateNoPostsMessage();
    document.getElementById('make-post-button').addEventListener('click', () => {
        createPost();
        updateNoPostsMessage();
    });

    function createPost() {
        // Create a new post
        const newPost = document.createElement('div');
        newPost.classList.add('Manage_Info');

        // Add the inner HTML to the new post
        newPost.innerHTML = `
            <div class="button-container">
                <button class="delete-button">X</button>
                <button class="modify-button">E</button>
            </div>
            <div class="Profile_Details">
                <div class="Profile_Top">
                    <img src="/path_to_profile_picture.jpg" alt="Profile Picture" class="Profile_Pic">
                    <h2 class="Profile_Name">Profile Name</h2>
                    <h2 class="ClubName"><a href="/ClubHomePage.html">Club Name</a></h2>
                </div>
                <p class="Published_Date">Published: 01/01/2001</p>
            </div>
            <div class="Manage_Content">
                <img src="/images/icecreamImage.jpg" alt="No img Loaded" class="Manage_img">
                <div class="Manage_Text">
                    <h1 class="ManageTitle">Group Post Title</h1>
                    <p class="ManageDescription">Some event info, possibly containing a message from the event organizer
                        and/or relevant event details. Who knows what they'll write here, I'm just writing a bunch of stuff
                        so that this p element is filled out so i can test it.
                    </p>
                </div>
            </div>
        `;

        // Append the new post to the Manage_List
        document.querySelector('.Manage_List').appendChild(newPost);

        // Add delete and modify event listeners to the new post
        newPost.querySelector('.delete-button').addEventListener('click', e => {
            e.currentTarget.parentNode.parentNode.style.display = 'none';
            updateNoPostsMessage();
        });
        newPost.querySelector('.modify-button').addEventListener('click', e => {
            alert('Modify post: ' + e.currentTarget.parentNode.parentNode.id);
        });
        updateNoPostsMessage();
    }

    function updateNoPostsMessage() {
        // Get all posts
        const posts = document.querySelectorAll('.Manage_Info');
        // Get the No Posts message element
        const noPostsMessage = document.getElementById('no-posts-message');
        // If there are no posts, show the message; otherwise, hide it
        if (posts.length === 0) {
            noPostsMessage.style.display = 'block';
        } else {
            noPostsMessage.style.display = 'none';
        }
    }


    // make event

    document.getElementById('make-event-button').addEventListener('click', () => {
        createEvent();
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
        newEvent.querySelector('.delete-button').addEventListener('click', e => {
            e.currentTarget.parentNode.parentNode.style.display = 'none';
        });
        newEvent.querySelector('.modify-button').addEventListener('click', e => {
            alert('Modify post: ' + e.currentTarget.parentNode.parentNode.id);
        });
    }

};

