const delay = 250;

$(document).ready(() => {
    $('#login-form-link').click(function(e) {
      $("#login-form").delay(delay+10).fadeIn(delay);
      $("#register-form").fadeOut(delay);
      $('#register-form-link').removeClass('active');
      $(this).addClass('active');
      e.preventDefault();
  });
  
  $('#register-form-link').click(function(e) {
    $("#register-form").delay(delay+10).fadeIn(delay);
    $("#login-form").fadeOut(delay);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
  });
});
