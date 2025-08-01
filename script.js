// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('open'); // For custom CSS transition
        });

        // Close menu when mobile menu link is clicked
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // Scroll to section functionality (for navigation links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            // Hide message and show loading state on form submission (if desired)
            formMessage.classList.add('hidden');
            formMessage.classList.remove('text-red-600');
            formMessage.classList.remove('text-green-600');
            // You can show a loading spinner or text here

            try {
                // Here we will make an API call to send data to your backend server.
                // Ensure this URL matches the port of your backend server.
                const response = await fetch('http://localhost:3000/api/contact', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    formMessage.textContent = 'Your message has been sent successfully! We will contact you soon.';
                    formMessage.classList.remove('hidden');
                    formMessage.classList.add('text-green-600');
                    contactForm.reset(); // Reset the form
                } else {
                    // If an error response is received from the server
                    const errorData = await response.json();
                    formMessage.textContent = `Error sending message: ${errorData.message || 'Please try again.'}`;
                    formMessage.classList.remove('hidden');
                    formMessage.classList.remove('text-green-600');
                    formMessage.classList.add('text-red-600');
                }
            } catch (error) {
                // Network errors (e.g., server not running)
                console.error('Form submission error:', error);
                formMessage.textContent = 'Network error sending message. Please ensure the backend server is running and try again.';
                formMessage.classList.remove('hidden');
                formMessage.classList.remove('text-green-600');
                formMessage.classList.add('text-red-600');
            }
        });
    }
});
