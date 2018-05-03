function login(username, password) {

  $.ajax({
    type:"POST",
    url:"https://api.dev.talentmap.us/api/v1/accounts/token/",
    data: "username=" + username + "&password=" + password,
    success: function(data) {
      window.location.href = '/talentmap/tokenValidation?tmApiToken=' + data.token
    },
    error: function(){
      alert('Request failed');
    },
    dataType: 'json',
  });

};
