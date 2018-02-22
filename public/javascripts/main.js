$(document).ready(function() {
  $('#portfolioModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var title = button.data('title') // Extract info from data-* attributes
    var subtitle = button.data('subtitle') // Extract info from data-* attributes
    var content = button.data('content') // Extract info from data-* attributes
    var date = button.data('date') // Extract info from data-* attributes
    var technologies = button.data('technologies') // Extract info from data-* attributes
    var projectlink = button.data('projectlink') // Extract info from data-* attributes
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').html(title)
    modal.find('.content').html(content)
    var ffhtml = 
      "<li><i class='fa-li fa fa-calendar'></i>" + date + "</li>"
    if (projectlink) {
      ffhtml+="<li><i class='fa-li fa fa-github'></i><a href='" + projectlink + "'>Project</a></li>" +
              "<li><i class='fa-li fa fa-terminal'></i>" + technologies + "</li>"
    } else {
      ffhtml+="<li><i class='fa-li fa fa-user'></i>" + technologies + "</li>"
    }
    modal.find('.fastfacts').html(ffhtml)
  })

  $("#nav").on('click','a:not([target="_blank"])', function(event){ 
      event.preventDefault();
      var o =  $( $(this).attr("href") ).offset();   
      var sT = o.top - $("#nav").outerHeight(true); // get the fixedbar height
      // compute the correct offset and scroll to it.
      window.scrollTo(0,sT);
  });
})
