window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
//foe all links other than footer
/*const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  if (link.pathname=== window.location.pathname) {
    link.classList.add("active");
  }
});*/

//for footer links
const navLinks = document.querySelectorAll(".nav-links a");
const currentPath = window.location.pathname;

navLinks.forEach(link => {
    // Normalize paths: remove trailing slashes and ensure comparison is clean
    const linkPath = new URL(link.href).pathname;
    
    if (linkPath === currentPath || (currentPath === "/" && linkPath.includes("index.html"))) {
        link.classList.add("active");
    }
});
//button-navigation
const allButtons = document.querySelectorAll('.sticky-button:not([onclick]), .primary-cta-button:not([onclick]), .final-cta-button, .pricing-cta');
//const allButtons = document.querySelectorAll('.sticky-button, .primary-cta-button, .final-cta-button, .pricing-cta');
allButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (window.location.href.includes('contact.html')) {     //If the link is in contact page, goes directly to form
            document.querySelector('#contact-form').scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = 'contact.html';    //else remains in contact page
        }
    });
});


const tooltip = document.getElementById('site-tooltip');

document.addEventListener('mouseover', (e) => {
    // The "Trigger": Find if what we hovered over has a tooltip attribute
    const target = e.target.closest('[data-tooltip]');  //targets the closest parent element of tool-tip avoiding children
    
    if (target) {
        // 1. Get the custom text you wrote in the HTML
        const message = target.getAttribute('data-tooltip');
        
        // 2. Put that text into the site-tooltip div
        tooltip.textContent = message;
        
        // 3. Make it visible
        tooltip.style.display = 'block';
    }
});

document.addEventListener('mousemove', (e) => {
    // This moves the box so it follows the mouse cursor
    if (tooltip.style.display === 'block') {
        tooltip.style.left = e.pageX + 15+ 'px';
        tooltip.style.top = e.pageY + 15+ 'px';
    }
});

document.addEventListener('mouseout', (e) => {
    // When the mouse leaves the trigger, hide the tooltip
    if (e.target.closest('[data-tooltip]')) {
        tooltip.style.display = 'none';
    }
});

const form = document.querySelector('form');

// We add 'async' here so we can use 'await' inside the function
form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Stops the page from refreshing immediately
    
    let isValid = true;

    // --- 1. VALIDATION LOGIC (Your Gatekeeper) ---
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    document.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));

    // Name validation
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        showError(name, 'Please enter your name');
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email');
    if (email.value.trim() === '') {
        showError(email, 'Please enter your email');
        isValid = false;
    } else if (!email.validity.valid) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    }

    // Service select validation
    const service = document.getElementById('service-needed');
    if (service.value === '') {
        showError(service, 'Please select a service');
        isValid = false;
    }

    // Message validation
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        showError(message, 'Please enter your message');
        isValid = false;
    }

    // --- 2. ASYNC SUBMISSION LOGIC (The Advanced Part) ---
    if (isValid) {
        // Prepare the data to be sent
        const formData = new FormData(form);

        try {
            // 'await' tells the browser: "Pause here until the server answers"
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success path
                alert('Form submitted successfully!'); 
                window.location.href = 'thank-you.html';
                // In a real funnel, you'd use: window.location.href = "thank-you.html";
            } else {
                // Server-side error (e.g., Formspree is down)
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            // Network error (e.g., User lost internet connection)
            alert('Network error. Please check your connection.');
        }
    }
});

// Error display function
function showError(input, message) {
    input.classList.add('input-error');
    const error = document.createElement('span');
    error.classList.add('error-message');
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
}

const hamburger = document.querySelector('.hamburger');
const rightContainer = document.querySelector('.right-container');

hamburger.addEventListener('click', function() {
    rightContainer.classList.toggle('active');
    hamburger.textContent = rightContainer.classList.contains('active') ? '✕' : '☰';
});