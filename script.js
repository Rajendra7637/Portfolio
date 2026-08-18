$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function () {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }

// Certificate Modal Functions
function openModal(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('certificateModal');
  const modalImg = document.getElementById('modalImage');
  
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Add blur effect to background
  document.body.style.overflow = 'hidden';
  document.querySelector('.certifications-section').style.filter = 'blur(5px)';
  
  // Show modal with animation
  modal.classList.add('show');
}

function closeModal() {
  const modal = document.getElementById('certificateModal');
  
  // Remove blur effect
  document.body.style.overflow = 'auto';
  document.querySelector('.certifications-section').style.filter = 'none';
  
  // Hide modal
  modal.classList.remove('show');
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
    closeProjectModal();
  }
});

// Project Modal Functions
function openProjectModal(element) {
  const img = element.querySelector('img');
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('projectModalImage');
  
  modalImg.src = img.src;
  modalImg.alt = img.alt;
  
  // Add blur effect to background
  document.body.style.overflow = 'hidden';
  document.querySelector('.project-content').style.filter = 'blur(5px)';
  
  // Show modal with animation
  modal.classList.add('show');
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  
  // Remove blur effect
  document.body.style.overflow = 'auto';
  document.querySelector('.project-content').style.filter = 'none';
  
  // Hide modal
  modal.classList.remove('show');
}