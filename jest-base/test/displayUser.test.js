'use strict';

jest.mock('../src/fetchCurrentUser');

test('display a user after a click', function() {
  
  const $ = require('jquery');
  
  // document.body.innerHTML =
  //   '<div>' +
  //   '  <span id="username" />' +
  //   '  <button id="button" />' +
  //   '</div>';

  $(document).load('./html/displayUser.test.html', function(data) {
    require ('../src/displayUser.js');    
    
    console.log(data);
    
    fetchCurrentUser.mockImplementation(function(cb) {
      cb({
        fullName: 'Hayato Moritan',
        loggedIn: false,
      });
    });
    
    $('#button').click();
    
    expect(fetchCurrentUser).toBeCalled();
    expect($('#username').text()).toEqual('Hayato Moritan - Logged Out');

  });
  
})