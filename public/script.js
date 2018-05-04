function login(username, password) {
  $.ajax({
    type: 'POST',
    url: '/api/v1/accounts/token/',
    dataType: 'json',
    data: 'username=' + username + '&password=' + password,
    success: function(data) {
      window.location.href = '/tokenValidation?tmApiToken=' + data.token;
    },
    error: function() {
      alert('Request failed');
    },
  });
};
