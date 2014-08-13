$(function () {
  // $("#downloadForm").validate({
  //   rules: {
  //     inputName: {
  //       required: true
  //     },
  //     inputEmail: {
  //       required: true
  //     }
  //   },
  //   highlight: function(element) {
  //     $(element).closest('.form-group').addClass('has-error');
  //   },
  //   unhighlight: function(element) {
  //     $(element).closest('.form-group').removeClass('has-error');
  //   },
  //   errorElement: 'span',
  //   errorClass: 'help-block',
  //   errorPlacement: function(error, element) {
  //     if(element.parent('.input-group').length) {
  //       error.insertAfter(element.parent());
  //     } else {
  //       error.insertAfter(element);
  //     }
  //   }
  // })

  $(".technologies").bind("click", function () {
    if($(this).hasClass("disabled")) {
      return;
    }
    $(".tech-active").removeClass("tech-active");
    $(this).addClass("tech-active");
    $("#techType").val($(this).data("value"));
  });
});