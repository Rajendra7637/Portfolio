$(document).ready(function() {

  const menuIcon = $(".menu_icon");
  const mobileMenu = $(".header ul");

  menuIcon.on('click touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    mobileMenu.toggleClass("open");
  });

  // Scroll Progress Indicator & Back to Top controls
  const scrollProgress = $("#scroll-progress");
  const backToTopBtn = $("#backToTop");

  $(window).scroll(function() {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgress.length) {
      scrollProgress.css("width", Math.min(100, Math.max(0, scrollPercent)) + "%");
    }

    if (scrollTop > 20) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    if (scrollTop > 350) {
      backToTopBtn.addClass("visible");
    } else {
      backToTopBtn.removeClass("visible");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  backToTopBtn.on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
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

      // Auto-close dropdown after selecting a section on phones.
      if (window.matchMedia('(max-width: 767px)').matches) {
        mobileMenu.removeClass("open");
      }
    });

    $(document).click(function(e) {
      if (!$(e.target).closest('.header').length) {
        mobileMenu.removeClass('open');
      }
    });
  

    // Enhanced Responsive Scroll Animations with ScrollReveal
    if (typeof ScrollReveal !== 'undefined') {
      const sr = ScrollReveal({
        distance: "40px",
        duration: 900,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        delay: 100,
        reset: false
      });

      // Hero Elements
      sr.reveal(".profile-photo", { origin: "left", distance: "50px", delay: 150 });
      sr.reveal(".profile-text", { origin: "right", distance: "50px", delay: 200 });

      // About Section
      sr.reveal(".about-content", { origin: "left", distance: "40px", delay: 150 });
      sr.reveal(".about-skills", { origin: "right", distance: "40px", delay: 200 });

      // Section Titles
      sr.reveal(".project-title, .section-title", { origin: "top", distance: "30px", delay: 100 });

      // Projects (Staggered entrance with smooth scale)
      sr.reveal(".project", { origin: "bottom", distance: "50px", interval: 180, scale: 0.95 });

      // Certifications (Staggered cascade)
      sr.reveal(".certificate-card", { origin: "bottom", distance: "40px", interval: 120, scale: 0.96 });
    }

    // Interactive 3D Card Hover / Scroll Perspective on Desktop
    if (window.matchMedia('(min-width: 992px)').matches) {
      $(".project, .certificate-card").on("mousemove", function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 7;
        const rotateY = (x / rect.width) * 7;
        $(this).css({
          transform: "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) translateY(-8px)",
          boxShadow: "0 18px 40px rgba(0, 255, 255, 0.28)",
          borderColor: "aqua"
        });
      }).on("mouseleave", function() {
        $(this).css({
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
          boxShadow: "",
          borderColor: ""
        });
      });
    }

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

    if (form && msg) {
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
    }
    
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

function setMobileCertificationsHeight() {
  const certificationsGrid = document.querySelector('.certifications-grid');

  if (!certificationsGrid) {
    return;
  }

  const isPhoneView = window.matchMedia('(max-width: 768px)').matches;

  if (!isPhoneView) {
    certificationsGrid.style.removeProperty('--mobile-cert-visible-height');
    return;
  }

  const cards = certificationsGrid.querySelectorAll('.certificate-card');

  if (cards.length <= 3) {
    certificationsGrid.style.removeProperty('--mobile-cert-visible-height');
    return;
  }

  const gridStyles = window.getComputedStyle(certificationsGrid);
  const gapValue = gridStyles.rowGap || gridStyles.gap || '0';
  const gap = parseFloat(gapValue) || 0;

  let visibleHeight = 0;
  for (let i = 0; i < 3; i += 1) {
    visibleHeight += cards[i].offsetHeight;
  }

  visibleHeight += gap * 2;
  certificationsGrid.style.setProperty('--mobile-cert-visible-height', `${Math.ceil(visibleHeight)}px`);
}

window.addEventListener('load', setMobileCertificationsHeight);
window.addEventListener('resize', setMobileCertificationsHeight);
