document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const loads = document.getElementById("loads");

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (username === "" || email === "" || password === "" || confirmPassword === "") {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Simulate sign-up process
        loads.innerHTML = "<h2>Creating account... Please wait...</h2>";
        setTimeout(() => {
            loads.innerHTML = "<h2>Sign-up successful! Redirecting...</h2>";
            loads.style.color = "green";

            // Redirect to login page after a brief pause
            setTimeout(() => {
                window.location.href = "index.html"; // Redirect to login page
            }, 2000);
        }, 3000); // Simulated delay for account creation
    });
});
