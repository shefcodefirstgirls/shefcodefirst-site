const basicScroll = require('basicscroll')
const bootstrap = require('bootstrap')
const $ = require('jquery')
const popper = require('popper.js')
const Masonry = require('masonry-layout')
const jQueryBridget = require('jquery-bridget')
$(window).on("load, resize", function() {
  var viewportWidth = $(window).width()
  if (viewportWidth < 768) {
    $("nav li.fadeInUp").each(function() {
      $(this).removeClass("fadeInUp").addClass("fadeInLeft")
    })
    $("nav li.fadeInDown").each(function() {
      $(this).removeClass("fadeInDown").addClass("fadeInRight")
    })
  } else {
    $("nav li.fadeInLeft").each(function() {
      $(this).removeClass("fadeInLeft").addClass("fadeInUp")
    })
    $("nav li.fadeInRight").each(function() {
      $(this).removeClass("fadeInRight").addClass("fadeInDown")
    })
  }
})

$(document).ready(function() {
  // Portfolio modal information function
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

  // Nav scrolling
  $("#nav").on('click','a:not([target="_blank"])', function(event){ 
    event.preventDefault()
    var o =  $( $(this).attr("href") ).offset()   
    var sT = o.top - $("#nav").outerHeight(true) // get the fixedbar height
    // compute the correct offset and scroll to it.
    window.scrollTo(0,sT)
  })

  // Scroll animations
  const basicScrollContactButtons = basicScroll.create({
    elem: document.querySelector('.contact-buttons'),
    from: 'bottom-bottom',
    to: 'middle-middle',
    props: {
      '--contact-opacity': {
        from: '.01',
        to: '.99'
      },
      '--contact-tx': {
        from: '-50px',
        to: '0px'
      }
    }
  })
  const basicScrollAboutButtons = basicScroll.create({
    elem: document.querySelector('.about-buttons'),
    from: 'bottom-bottom',
    to: 'middle-middle',
    props: {
      '--about-opacity': {
        from: '.01',
        to: '.99'
      },
      '--about-tx': {
        from: '-50px',
        to: '0px'
      }
    }
  })
  const basicScrollTestimonialsButtons = basicScroll.create({
    elem: document.querySelector('.testimonials-buttons'),
    from: 'bottom-bottom',
    to: 'top-middle',
    props: {
      '--testimonials-opacity': {
        from: '.01',
        to: '.99'
      },
      '--testimonials-tx': {
        from: '-50px',
        to: '0px'
      }
    }
  })
  basicScrollAboutButtons.start()
  basicScrollTestimonialsButtons.start()
  basicScrollContactButtons.start()
  window.onresize = function() {
    basicScrollAboutButtons.calculate()
    basicScrollAboutButtons.update()
    basicScrollTestimonialsButtons.calculate()
    basicScrollTestimonialsButtons.update()
    basicScrollContactButtons.calculate()
    basicScrollContactButtons.update()
  }
})
jQueryBridget( 'masonry', Masonry, $  )
$('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true
})
