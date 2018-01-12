window.onload = function () {

  var images = document.getElementsByClassName("project-image__single");

  Array.prototype.forEach.call(images, function(image) {
    image.addEventListener('click', function() {
      var modal = document.getElementById("img_modal");
      var modal_image = modal.getElementsByClassName("modal-image")[0];
      modal_image.src = image.src;

      $('#img_modal').modal('show');
    })
  });

  $('.modal-image').on('click', function() {
    $('#img_modal').modal('hide');
  });

}
