var express = require('express');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mysql = require('mysql');
var dbConnectionPool = mysql.createPool({
    host: 'localhost',
    database: 'clubDatabase'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoRouter = require('./routes/getInfo.js');
var postInfoRouter = require('./routes/postInfo.js');
var homePostInfoRouter = require('./routes/homePostInfo.js');
var homeEventInfoRouter = require('./routes/homeEventInfo.js');
var clubEventInfoRouter = require('./routes/clubEventInfo.js');
var userClubsRouter = require('./routes/getUserClubs.js');
var userEventsRouter = require('./routes/getUserEvents.js');
var AllClubsRouter = require('./routes/getAllClubs.js');
var joinClubRouter = require('./routes/joinClubGroup.js');
var leaveClubRouter = require('./routes/leaveClubGroup.js');
var joinLeaveRouter = require('./routes/joinOrLeave.js');
var getAllEventsRouter = require('./routes/getAllEvents.js');
var leaveEventRouter = require('./routes/leaveEvent.js');
var attendEventRouter = require('./routes/attendEvent.js');
var updateProfileRouter = require('./routes/updateProfile.js');
var logoutRouter = require('./routes/logout.js');
var eventNotificationsRouter = require('./routes/getEmailEvents.js');
var postNotificationsRouter = require('./routes/getEmailPosts.js');
var getManagedClubsRouter = require('./routes/getManagedClubs.js');
var clubMembersRouter = require('./routes/clubMembers.js');
var getClubEventsRouter = require('./routes/getClubEvents.js');
var getClubPostsRouter = require('./routes/getClubPosts.js');
var managePostsRoutter = require('./routes/managePosts.js');
var AddNewPostRoutter = require('./routes/AddNewPost.js');
var AddNewEventRoutter = require('./routes/AddNewEvent.js');
var deleteEventRoutter = require('./routes/deleteEvent.js');
var addNotifDetailsRouter = require('./routes/addNotifDetails.js');
var clubManagerRouter = require('./routes/clubManager.js');
var sendMailRouter = require('./routes/sendMail.js');

var adminRouter = require('./routes/admin.js');
var adminUsersRouter = require('./routes/adminUsers.js');
var getEventAttendeesRouter = require('./routes/getEventAttendees.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    req.pool = dbConnectionPool;
    next();
});

// Test route to show all users
app.get('/dbtest', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            console.error('Error getting connection from pool:', err);
            res.status(500).send('Error getting connection from pool');
            return;
        }

        var query = "SELECT * FROM Users";
        connection.query(query, function(qerr, rows, fields) {
            connection.release();

            if (qerr) {
                console.error('Error executing query:', qerr);
                res.status(500).send('Error executing query');
            } else {
                console.log('Query result:', rows);
                res.send(rows);
            }
        });
    });
});

app.use(session({
    secret: 'superSecretString',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    secure: false
}));

app.use(function(req, res, next){
    console.log("Current logged in user is : " + req.session.username);
    next();
});

app.use('/AdminMembers.html', adminRouter);
app.use('/Manage.html', clubManagerRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getInfo', infoRouter);
app.use('/postInfo', postInfoRouter);
app.use('/homePostInfo', homePostInfoRouter);
app.use('/homeEventInfo', homeEventInfoRouter);
app.use('/clubEventInfo', clubEventInfoRouter);
app.use('/getUserClubs', userClubsRouter);
app.use('/getUserEvents', userEventsRouter);
app.use('/getAllClubs', AllClubsRouter);
app.use('/joinClubGroup', joinClubRouter);
app.use('/leaveClubGroup', leaveClubRouter);
app.use('/joinOrLeave', joinLeaveRouter);
app.use('/getAllEvents', getAllEventsRouter);
app.use('/leaveEvent', leaveEventRouter);
app.use('/attendEvent', attendEventRouter);
app.use('/updateProfile', updateProfileRouter);
app.use('/logout', logoutRouter);
app.use('/getEmailEvents', eventNotificationsRouter);
app.use('/getEmailPosts', postNotificationsRouter);
app.use('/getManagedClubs', getManagedClubsRouter);
app.use('/clubMembers', clubMembersRouter);
app.use('/getClubEvents', getClubEventsRouter);
app.use('/getClubPosts', getClubPostsRouter);
app.use('/managePosts', managePostsRoutter);
app.use('/AddNewPost', AddNewPostRoutter);
app.use('/AddNewEvent', AddNewEventRoutter);
app.use('/deleteEvent', deleteEventRoutter);
app.use('/addNotifDetails', addNotifDetailsRouter);
app.use('/adminUsers', adminUsersRouter);
app.use('/getEventAttendees', getEventAttendeesRouter);
app.use('/sendMail', sendMailRouter);


module.exports = app;
