const $ = require('jquery');
const fetchCurrentUser = require('./fetchCurrentUser.js');

$('#button').on('click', function() {
  fetchCurrentUser(function(user) {
    const loggedText = 'Logged ' + (user.loggedIn ? 'In' : 'Out');
    $('#username').text(user.fullName + ' - ' + loggedText);
  });
});