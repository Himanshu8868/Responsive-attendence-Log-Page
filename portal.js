// Event listener for DOM content load
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const checkLocationBtn = document.getElementById('checkLocationBtn');
    const attendanceForm = document.getElementById('form');
    const statusMessage = document.getElementById('statusMessage');
    let userLatitude = null;
    let userLongitude = null;

    // Hamburger menu toggle for mobile navigation
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Toggle 'active' class
    });

    // Function to trace geolocation
    const checkLocation = () => {
        // Check if the browser supports geolocation
        if (navigator.geolocation) {
            statusMessage.textContent = "Checking your location...";

            // Use navigator.geolocation.getCurrentPosition to get location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setTimeout(() => {
                        userLatitude = position.coords.latitude;
                        userLongitude = position.coords.longitude;

                        // Display latitude and longitude to the user
                        statusMessage.textContent = `Location confirmed: Latitude ${userLatitude}, Longitude ${userLongitude}. You can now fill the attendance form.`;

                        setTimeout(() => {
                            attendanceForm.style.display = 'block'; // Show form after successful location check
                        }, 1000); // Delayed form display for smoother experience
                    }, 1500); // Simulating location checking delay for better experience
                },
                (error) => {
                    // Handle geolocation errors
                    setTimeout(() => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                statusMessage.textContent = "Location access was denied by the user. Please allow location access.";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                statusMessage.textContent = "Location information is unavailable.";
                                break;
                            case error.TIMEOUT:
                                statusMessage.textContent = "The request to get your location timed out.";
                                break;
                            default:
                                statusMessage.textContent = "An unknown error occurred.";
                                break;
                        }
                    }, 1000); // Add a slight delay before showing error messages
                },
                {
                    // Options to improve accuracy
                    enableHighAccuracy: true,
                    timeout: 10000, // 10 seconds
                    maximumAge: 0
                }
            );
        } else {
            setTimeout(() => {
                // If geolocation is not supported
                statusMessage.textContent = "Geolocation is not supported by this browser.";
            }, 1000); // Delay for user experience
        }
    };

    // Event listener for location check button
    checkLocationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkLocation(); // Call the location checking function
    });

    // Event listener for attendance form submission
    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value;

        // Check if student name is entered and location is confirmed
        if (studentName.trim() === '') {
            setTimeout(() => {
                statusMessage.textContent = "Please enter the student name.";
            }, 500); // Slight delay to allow form interaction to feel smoother
        } else if (userLatitude && userLongitude) {
            // Create an attendance data object
            const attendanceData = {
                studentName: studentName,
                latitude: userLatitude,
                longitude: userLongitude,
                timestamp: new Date().toISOString()
            };

            // Simulate storing or processing the attendance data
            console.log("Attendance Data:", attendanceData);
            setTimeout(() => {
                statusMessage.textContent = `Attendance submitted successfully for ${studentName}.`;
            }, 1000); // Adding delay for a smoother submission message display

            setTimeout(() => {
                attendanceForm.reset(); // Reset the form after submission
                statusMessage.textContent = ''; // Clear the message after a brief moment
            }, 3000); // Delay reset and clearing for better feedback
        } else {
            setTimeout(() => {
                statusMessage.textContent = "Location not verified. Please check your location first.";
            }, 500); // Slight delay before showing location verification error
        }
    });
});
// Quiz Section Functionality
document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const quizResult = document.getElementById('quizResult');

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const answer = quizForm.answer.value;

        if (answer === 'B') {
            quizResult.textContent = 'Correct! Accuracy is the primary benefit.';
        } else {
            quizResult.textContent = 'Incorrect! Please try again.';
        }
    });
});

// User Dashboard Section Functionality
const attendanceData = [
    { date: 'September 28, 2024', status: 'Present', location: 'College Premises' },
    { date: 'September 27, 2024', status: 'Absent', location: '-' },
    // Add more data as needed
];

function populateDashboard() {
    const dashboardTableBody = document.querySelector('.user-dashboard-section tbody');
    dashboardTableBody.innerHTML = ''; // Clear existing rows

    attendanceData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.status}</td>
            <td>${entry.location}</td>
        `;
        dashboardTableBody.appendChild(row);
    });
}

// Call function to populate the dashboard when the page loads
populateDashboard();

// Feedback Section Functionality
const feedbackForm = document.getElementById('feedbackForm');
const feedbackText = document.getElementById('feedbackText');

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = feedbackText.value;

    // Display a message or process the feedback (e.g., send to server)
    alert('Thank you for your feedback: ' + feedback);
    feedbackText.value = ''; // Clear the textarea
});
