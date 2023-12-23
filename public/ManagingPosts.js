const vueinst = new Vue({
    el: "#body",
    data: {
        ButtomOn: false
    },
});



window.onload=function(){
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

    const buttons = document.querySelectorAll('.Filter-Button, .filterManaged-Button');
    const h1 = document.getElementById('Events_Title');


    buttons.forEach((button) => {
        button.addEventListener('click', () => {
        buttons.forEach((buttonOn) => buttonOn.classList.remove('active'));
        button.classList.add('active');
        });
    });

    document.getElementById('make-post-button').addEventListener('click', displayPostForm);
    function displayPostForm() {
    let title = prompt("Enter the post title");
    let content = prompt("Enter the post content");
    if(title != null && content != null) {
        createPost(title, content);
    }
}

    // change
    const currentUrl = window.location.href;
    if (currentUrl.endsWith('Manage.html')) {
        const managedButtons = document.querySelectorAll('.filterManaged-Button');

        let buttons = document.querySelectorAll('.filterManaged-Button');

        buttons.forEach((button) => {
            button.addEventListener('click', (event) => {
                let newText = event.currentTarget.value;
                document.getElementById('Events_Title').textContent = newText;
            });
        });



        const modal = document.getElementById("modal");
        const btn = document.getElementById("view-all-button");
        const span = document.getElementsByClassName("close-button")[0];

        btn.onclick = function() {
            let memberCards = document.querySelectorAll('.Filter-List .member-card'); // I will change this from filter-list when we have database and rsvp
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

      }

      document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', e => {
            e.currentTarget.parentNode.parentNode.style.display = 'none';
            updateNoPostsMessage();
        });
    });
    document.querySelectorAll('.modify-button').forEach(button => {
        button.addEventListener('click', e => {
            let eventInfo = e.currentTarget.parentNode.parentNode;
            let eventName = eventInfo.querySelector('.ManageTitle');
            let eventDescription = eventInfo.querySelector('.ManageDescription');

            if(e.currentTarget.innerHTML == 'E') {
                // Make elements editable
                e.currentTarget.innerHTML = 'Save';
                eventName.contentEditable = "true";
                eventDescription.contentEditable = "true";

                eventName.addEventListener('keydown', limitTextLength);
                eventDescription.addEventListener('keydown', limitTextLength);

            } else {
                // Save changes and make elements not editable
                e.currentTarget.innerHTML = 'E';
                eventName.contentEditable = "false";
                eventDescription.contentEditable = "false";

                eventName.removeEventListener('keydown', limitTextLength);
                eventDescription.removeEventListener('keydown', limitTextLength);
            }
        });
    });




    function limitTextLength(event) {
        let characterLimit;
        let lineBreaksLimit;

        // Set limits based on element class
        if (this.classList.contains('ManageTitle')) {
            characterLimit = 35; // limit for title
            lineBreaksLimit = 0; // no line breaks allowed in title
        } else if (this.classList.contains('ManageDescription')) {
            characterLimit = 750; // limit for description
            lineBreaksLimit = 15; // line breaks limit for description
        }

        if (this.innerText.length >= characterLimit && event.key !== 'Backspace') {
            event.preventDefault();
            return false;
        } else if (event.key === 'Enter') {
            const lineBreaks = (this.innerText.match(/\n/g) || []).length;
            if (lineBreaks >= lineBreaksLimit) {
                event.preventDefault();
                return false;
            }
        }
    }


    // new changes
        updateNoPostsMessage();
    document.getElementById('make-post-button').addEventListener('click', () => {
        createPost(title, content);
        updateNoPostsMessage();
    });
    document.getElementById('make-post-button').addEventListener('click', displayPostForm);
    // document.getElementById('new-post-form').addEventListener('submit', handleFormSubmit);


    function createPost(title, content) {
        // Create a new post
        const newPost = document.createElement('div');
        newPost.classList.add('Manage_Info');

         // Get the current date
        let currentDate = new Date();
        // Format it as a string in the format MM/DD/YYYY
        let dateString = (currentDate.getMonth()+1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();

        // Add the inner HTML to the new post
        newPost.innerHTML = `
            <div class="button-container" data-visibility="public">
                <button class="delete-button">X</button>
                <button class="modify-button">E</button>
                <button class="visibility-button">Make Public</button>
            </div>
            <div class="Profile_Details">
                <div class="Profile_Top">
                    <img src="/path_to_profile_picture.jpg" alt="Profile Picture" class="Profile_Pic">
                    <h2 class="Profile_Name">Profile Name</h2>
                    <h2 class="ClubName"><a href="/ClubHomePage.html">Club Name</a></h2>
                </div>
                <p class="Published_Date">Published: ${dateString}</p>
            </div>
            <div class="Manage_Content">
                <img src="/images/icecreamImage.jpg" alt="No img Loaded" class="Manage_img">
                <button class="edit-image-button" style="display: none;">Edit Image</button>
                <div class="Manage_Text">
                    <form class="ManageTitle" readonly>${title}</form>
                    <form class="ManageDescription" readonly>${content}</form>
                </div>
            </div>
        `;

        // Append the new post to the Manage_List
        document.querySelector('.Manage_List').appendChild(newPost);
        newPost.querySelector('.edit-image-button').addEventListener('click', function() {
            const imageFileInput = document.createElement('input');
            imageFileInput.type = 'file';
            imageFileInput.accept = 'image/*';
            imageFileInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        newPost.querySelector('.Manage_img').src = e.target.result;
                    }
                    reader.readAsDataURL(this.files[0]);
                }
            });
            imageFileInput.click();
        });

        // Add delete and modify event listeners to the new post
        newPost.querySelector('.delete-button').addEventListener('click', e => {
            e.currentTarget.parentNode.parentNode.style.display = 'none';
            updateNoPostsMessage();
        });
        newPost.querySelector('.modify-button').addEventListener('click', e => {
            let eventInfo = e.currentTarget.parentNode.parentNode;
            let eventName = eventInfo.querySelector('.ManageTitle');
            let eventDescription = eventInfo.querySelector('.ManageDescription');
            let editImageButton = eventInfo.querySelector('.edit-image-button');

            if(e.currentTarget.innerHTML == 'E') {
                // Make elements editable
                e.currentTarget.innerHTML = 'Save';
                eventName.contentEditable = "true";
                eventDescription.contentEditable = "true";

                eventName.addEventListener('keydown', limitTextLength);
                eventDescription.addEventListener('keydown', limitTextLength);

                editImageButton.style.display = 'block';

            } else {
                // Save changes and make elements not editable
                e.currentTarget.innerHTML = 'E';
                eventName.contentEditable = "false";
                eventDescription.contentEditable = "false";

                eventName.removeEventListener('keydown', limitTextLength);
                eventDescription.removeEventListener('keydown', limitTextLength);

                editImageButton.style.display = 'none';
            }
        });
        updateNoPostsMessage();
        // document.getElementById('post-form').style.display = 'none';
         // changes for visibility
        newPost.querySelector('.visibility-button').addEventListener('click', function() {
        var post = this.parentElement.parentElement;  // The Manage_Info div

        // Toggle the data-visibility attribute
        if (post.getAttribute('data-visibility') === 'public') {
            post.setAttribute('data-visibility', 'members');
            this.textContent = 'Make Members-Only';  // Change the button text
        } else {
            post.setAttribute('data-visibility', 'public');
            this.textContent = 'Make Public';  // Change the button text
        }
    });

    }

};

