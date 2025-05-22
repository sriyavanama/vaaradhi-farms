document.addEventListener('DOMContentLoaded', function() {
    // Select elements
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const headerMenu = document.querySelector('.header2_menu1');
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    
    // Toggle mobile menu
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerIcon.classList.toggle('open');
            headerMenu.classList.toggle('show');
            
            // Set display property based on show class
            if (headerMenu.classList.contains('show')) {
                headerMenu.style.display = 'flex';
            } else {
                headerMenu.style.display = 'none';
            }
        });
    }
    
    // Handle dropdowns
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const menu = this.nextElementSibling;
            const allDropdowns = document.querySelectorAll('.dropdown-menu');
            
            // Close other dropdowns
            allDropdowns.forEach(dropdownMenu => {
                if (dropdownMenu !== menu && dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                    dropdownMenu.style.display = 'none';
                }
            });
            
            // Toggle current dropdown
            if (menu) {
                this.classList.toggle('open');
                menu.classList.toggle('show');
                
                if (menu.classList.contains('show')) {
                    menu.style.display = 'block';
                } else {
                    menu.style.display = 'none';
                }
            }
        });
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header2_menu1') && !e.target.closest('.hamburger-menu')) {
            headerMenu.classList.remove('show');
            if (window.innerWidth <= 768) {
                headerMenu.style.display = 'none';
                hamburgerIcon.classList.remove('open');
            }
        }
    });
    
    // Handle responsive behavior
    function handleResponsive() {
        if (window.innerWidth > 768) {
            // Desktop view
            headerMenu.style.display = 'flex';
            headerMenu.classList.remove('show');
            hamburgerIcon.classList.remove('open');
            
            // Reset all dropdowns for desktop view
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = '';
                menu.classList.remove('show');
            });
            
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('open');
            });
            
            // Ensure hamburger is hidden in desktop view
            if (hamburgerMenu) {
                hamburgerMenu.style.display = 'none';
            }
        } else {
            // Mobile view - initially hide menu
            if (!headerMenu.classList.contains('show')) {
                headerMenu.style.display = 'none';
            }
            
            // Make hamburger visible in mobile view
            if (hamburgerMenu) {
                hamburgerMenu.style.display = 'flex';
            }
        }
    }
    
    // Initial setup and window resize handler
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
  // Banner slider functionality
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentSlide = 0;
  let slideInterval;
  
  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Navigation functions
  function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetInterval();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 10000); // Change slide every 10 seconds
  }
  
  // Event listeners
  
  // Start automatic sliding
  if (slider) {
    resetInterval();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', resetInterval);
  }
});