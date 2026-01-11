// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Section navigation functionality
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const header = document.getElementById('header');
    
    // Function to show specific section
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('section-show');
        });
        
        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('section-show');
        }
        
        // Update header class for fixed positioning
        if (targetId === '#header') {
            header.classList.remove('header-top');
            // Disable scroll on home page
            document.body.classList.add('no-scroll');
        } else {
            header.classList.add('header-top');
            // Enable scroll on other sections
            document.body.classList.remove('no-scroll');
        }
    }
    
    // Navigation functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for external links (resume)
            if (this.getAttribute('target') === '_blank') {
                return;
            }
            
            e.preventDefault();
            
            // Remove active class from all parent li elements
            navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
            
            // Add active class to clicked link's parent li
            this.parentElement.classList.add('active');
            
            // Get the target section
            const target = this.getAttribute('href');
            console.log(`Navigating to: ${target}`);
            
            // Show the target section
            showSection(target);
        });
    });
    
    // Initialize - show home section by default
    showSection('#header');

    // Project card click functionality
    const projectImages = document.querySelectorAll('.project-image');
    console.log('Found ' + projectImages.length + ' project images');
    
    projectImages.forEach((image, index) => {
        image.addEventListener('click', function(e) {
            console.log('Clicked on project image ' + index);
            e.stopPropagation();
            const projectCard = this.closest('.project-card');
            console.log('Project card:', projectCard);
            if (projectCard) {
                projectCard.classList.toggle('active');
                console.log('Active class toggled. Active now:', projectCard.classList.contains('active'));
            }
        });
    });

    // Close project info when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.project-card')) {
            document.querySelectorAll('.project-card.active').forEach(card => {
                card.classList.remove('active');
            });
        }
    });
    
    // Typing effect for the role text
    const typingElement = document.querySelector('.typing');
    if (typingElement) {
        const roles = ['WebDeveloper', 'Designer', 'Programmer', 'Creator'];
        let currentRoleIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentRole = roles[currentRoleIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }
            
            let typeSpeed = isDeleting ? 100 : 150;
            
            if (!isDeleting && currentCharIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next role
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect
        typeEffect();
    }
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Console welcome message
    console.log('%c Welcome to R THARUN REDDY\'s Portfolio! ', 'background: #12D640; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
    console.log('Feel free to explore the code and reach out if you have any questions!');
    
});

// Project scroll functionality
function scrollProjectContent(button, direction) {
    const projectInfo = button.closest('.project-info');
    const projectContent = projectInfo.querySelector('.project-content');
    const scrollAmount = 50; // pixels to scroll
    
    if (direction === 'up') {
        projectContent.scrollTop -= scrollAmount;
    } else if (direction === 'down') {
        projectContent.scrollTop += scrollAmount;
    }
    
    // Add visual feedback
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}