var files = {};
var droppedFilesStart = 0;

var dragLeave = function(e) {
  $(".file-uploader").removeClass('dropping').addClass('default');
};

var allowFileDrop = function(e) {
  e.preventDefault();
  $(".file-uploader").removeClass('default').addClass('dropping');
};

var fileDrop = function(e) {
  e.preventDefault();
  // $(".file-uploader").css({
  //   "border-color": '#ccdcf0'
  // });
  $(".file-uploader").removeClass('dropping').addClass('default');
  var droppedFiles = e.dataTransfer.files;
  addFilesToList(droppedFiles);

};

var addFilesToList = function(droppedFiles) {
  for(var i=0; i<droppedFiles.length; i++) {
    var fileObj = droppedFiles[i];
    files[droppedFilesStart] = fileObj;
    $("#dropped-files").append("<li><a href='#' onClick='unselectUploaded(this, "+(droppedFilesStart)+", event)' class='unselectUploaded'>" + fileObj.name + " <span>&times</span></a></li>");
    droppedFilesStart += 1;
  }
};

var unselectUploaded = function(context, index, e) {
  e.preventDefault();
  delete(files[index]);
  droppedFilesStart -= 1;
  $(context).parent().fadeOut().remove();
  return false;
}

var showFirstBoxRemove = function() {
  if($(".single-attachment").length > 1) {
    $("#attach_remove_1").show();
  }
  else {
    $("#attach_remove_1").hide();
  }
};


$(function() {

  var droptarget = $("#dropTarget");

  droptarget[0].addEventListener('dragleave', dragLeave  , false);

  var start = 1;

  if(window.FormData) {
    $("#dnd-group").removeClass('hidden');
  }
  else {
    $("#fallback-group").removeClass('hidden');
    // $("#attach1_fileremove").hide()
  }

  $(".single-attachment").change(function() {
    addFileInput();
  });

  showFirstBoxRemove();

  var addFileInput = function() {
    start += 1;

    if($("#attach_" + start).get(0)) {
      start -= 1;
    }
    else {
      var $element = $("<input/>", {
        type: 'file',
        name: 'attach' + start,
        id: 'attach_' + start,
        'class': 'single-attachment'
      });
      $element.bind('change', addFileInput);
      var $wrapper = $("<div/>", {
        'class': 'inputFileWrapper'
      });

      $wrapper.html($element);
      $closeElement = $("<a/>", {
        'class': 'fileInputRemove',
        href: 'javascript:void(0)',
        id: 'attach_remove_' + start
      });
      $closeElement.bind('click', {'id': 'attach_remove_'+start}, fileInputRemove);
      $wrapper.append($closeElement.html("&times;"));
      $("#files").append($wrapper);
    }

    showFirstBoxRemove();
  };

  $("#helpdeskForm").on("submit", function() {
    debugger
    var validator = $(this).validate();
    var action = $(this).attr("action");
    var $form = $(this);
    if(!validator.form()) {
      return;
    }

    $form.find("#submit").val("Please Wait...");
    if(window.FormData) {
      var formData = new FormData(this);
      for(var key in files) {
        formData.append('attachment[]', files[key]);
      }
      $.ajax({
        url: action,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData,
        success: function(data) {
          var data = JSON.parse(data);
          if(data.success) {
            $form.trigger("reset");
            files = {};
            $("#dropped-files").empty();
            $("#response_message").addClass("alert alert-success")
            .html("Your query has been posted successfully.");
          }
          else {
            $("#response_message").addClass("alert alert-danger")
            .html("There was an error. Please try again later.");
          }
          $form.find("#submit").val("Submit");
        },
        error: function(data) {
          $form.find("#submit").val("Submit");
        }
      });

      return false;
    }
    else{

      $(this).submit();
    }
  });

  $("#file-browser-link").on("click", function(e) {
    e.preventDefault();
    $("#attachment").trigger('click');
  });

  $("#attachment").on("change", function() {
    var fileObj = this.files;
    addFilesToList(fileObj);
  });

  $(".fileInputRemove").on("click", function(e) {
    e.data = {'id': $(this).attr('id')};
    fileInputRemove(e);
  });

  var fileInputRemove = function(e) {
    var id = e.data['id'];
    if(id === 'attach_remove_1') {
      $('#attach_1').replaceWith($('#attach_1').clone());
      $("#attach_1").bind('change', addFileInput);
    }
    else {
        $(this).parent().fadeOut().remove();
    }

    showFirstBoxRemove();
  }

  return false;
});