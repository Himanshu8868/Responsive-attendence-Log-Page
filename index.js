 // JavaScript for Hamburger Menu
 const navMenu = document.getElementById('nav-menu');
document.getElementById('hamburger').addEventListener('click', function() {
    navMenu.classList.toggle('active'); // Toggle the menu visibility
});


// Check login status
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

// Update the CTA button based on the login status
const updateCTABtn = () => {
    const ctaButton = document.querySelector(".cta-button");
    if (isLoggedIn) {
        ctaButton.textContent = "Log Out"; // Change button text to Log Out
        ctaButton.href = "index.html"; // Set href to '#' to avoid default navigation
    } else {
        ctaButton.textContent = "Sign In"; // Change button text to Sign In
        ctaButton.href = "login.html"; // Redirect to login page
    }
};

// Call function to set initial button state
updateCTABtn();

// Add event listener for the CTA button
const ctaButton = document.querySelector(".cta-button");
ctaButton.addEventListener("click", (e) => {
    if (isLoggedIn) {
        // Log out the user
        console.log("Logging out...");
        localStorage.setItem('isLoggedIn', 'false'); // Update login state
        isLoggedIn = false; // Update variable state
        updateCTABtn(); // Update the button text and behavior
        // Optionally redirect to a landing page or reload the page
        window.location.href = "index.html"; // Redirect to login page
    } else {
        // Redirect to sign in page
        console.log("Redirecting to sign in...");
        window.location.href = "signup.html"; // Redirect to login page
    }
});
