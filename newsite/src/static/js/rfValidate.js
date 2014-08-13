$(function() {
  // jQuery validation for forms.
  
  $(".rfForm").validate({
    errorClass: "rfFormError",

    highlight: function(element, errorClass) {
      $(element).addClass(errorClass);
      //  $(element).fadeOut(function() {
      //   $(element).fadeIn();
      // });
    },

    unhighlight: function(element, errorClass) {
      $(element).removeClass(errorClass);
    }
  });

});