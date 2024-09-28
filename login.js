// document.addEventListener("DOMContentLoaded", () => {
//     const form = document.querySelector('form');
//     const usernameInput = document.getElementById('username');
//     const passwordInput = document.getElementById('password');
//     const loads = document.getElementById("loads"); // Updated to 'loads'

//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); 

//         const username = usernameInput.value.trim();
//         const password = passwordInput.value.trim();

//         if (username === "" || password === "") {
//            loads.innerHTML ="Username and password are required"
//             return;
//         }

//         // Show loading message
//         loads.innerHTML = "<h>Logging in... Please wait...</h>"; // Display a message
//         loads.style.color = "yellow"; // Optional: change color of the message

//         // Simulating login validation
//         setTimeout(() => {            
//             if (username === "87" && password === "87") {
//                 loads.innerHTML = "<h>Login successful! Redirecting...</h>"; // Success message
//                 loads.style.color = "green"; // Change color for success
//                  form.reset();
//                 // Store login state in localStorage
//                 localStorage.setItem("loggedIn", "true");
//                 // Redirect to main page after a brief pause
//                 setTimeout(() => {
                    
//                     window.location.href = "main.html";
                    
//                 }, 2000); // Delay for 2 seconds before redirecting
//             } else {
//                 loads.innerHTML = "<h>Invalid login details.try again.</h>"; // Error message
//                 loads.style.color = "red"; // Change color for error
//                 form.reset(); // Reset form fields
//             }
//         }, 3000); // Simulated delay for login validation
//     });
// });
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loads = document.getElementById("loads");
    const togglePassword = document.getElementById("togglePassword");
    
    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye-slash');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (username === "" || password === "") {
            loads.innerHTML = "Username and password are required";
            loads.style.color = "red";
            return;
        }

        // Show loading message
        loads.innerHTML = "Logging in... Please wait...";
        loads.style.color = "yellow";

        // Simulating login validation
        setTimeout(() => {            
            if (username === "87" && password === "87") {
                loads.innerHTML = "Login successful! Redirecting...";
                loads.style.color = "green";
                form.reset();
                
                // Store login state in localStorage
                localStorage.setItem("loggedIn", "true");
                // Redirect to main page after a brief pause
                setTimeout(() => {
                    window.location.href = "portal.html";                    
                }, 2000); // Delay for 2 seconds before redirecting
            } else {
                loads.innerHTML = "Invalid login details, try again.";
                loads.style.color = "red";
                form.reset(); // Reset form fields
            }
        }, 3000); // Simulated delay for login validation
    });
});
