window.onload=function(){var e=document.getElementsByClassName("project-image__single");Array.prototype.forEach.call(e,function(e){e.addEventListener("click",function(){document.getElementById("img_modal").getElementsByClassName("modal-image")[0].src=e.src,$("#img_modal").modal("show")})}),$(".modal-image").on("click",function(){$("#img_modal").modal("hide")})};