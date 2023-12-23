var xhttp1 = new XMLHttpRequest();
xhttp1.open('GET', '/adminUsers/getUsers');
xhttp1.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var usersArray = JSON.parse(xhttp1.responseText);
        var tableBody = document.getElementById('tableBody');

        for (var i = 0; i < usersArray.length; i++){
        // usersArray.forEach(function(user) {
            var user = usersArray[i];
            var adminCheck = user.AdminStatus;

            // Create a row in the table and fill it with user data
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.UserID}</td>
                <td>${user.GivenName}</td>
                <td>${user.Surname}</td>
                <td>${user.Email}</td>
                <td>${user.username}</td>
                <td><i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"></i></td>
                <td>
                    <div class="Make-Admin-Button">
                        <label>
                        <input type="checkbox" value="${user.UserID}" id="${user.UserID}i" onclick="updateAdminStatus(${user.UserID}, ${user.AdminStatus})" ${adminCheck ? 'checked' : ''}><span id="${user.UserID}s">${adminCheck ? 'Remove Admin' : 'Make Admin'}</span>
                        </label>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        }

    }
};
xhttp1.send();

// Update the checkbox when pressed
function updateAdminStatus(id, status) {
    var span = document.getElementById(id + "s");
    var newAdminStatus = 0;

    if (span.innerHTML === "Make Admin") {
        span.innerHTML = "Remove Admin";
    } else if (span.innerHTML === "Remove Admin") {
        span.innerHTML = "Make Admin";
    }

    if (status === 1) {
        newAdminStatus = 0;
    } else if (status === 0) {
        newAdminStatus = 1;
    }

    // Send Post request to server to update admin status
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open('POST', '/adminUsers/updateAdminStatus');
    xhttp2.setRequestHeader('Content-Type', 'application/json');
    xhttp2.send(JSON.stringify({ id: id, status: newAdminStatus }));
}
