document.addEventListener('DOMContentLoaded', () => {
    let studentDatabase = [
        { name: "John Doe", attendance: 0 },
        { name: "Jane Smith", attendance: 0 },
        { name: "Alice Johnson", attendance: 0 },
        { name: "Bob Brown", attendance: 0 }
    ];

    const adminPassword = "123"; // Admin password is now a string

    // Hamburger menu toggle for mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const checkLocationBtn = document.getElementById('checkLocationBtn');
    const attendanceForm = document.getElementById('form');
    const statusMessage = document.getElementById('statusMessage');
    let userLatitude = null;
    let userLongitude = null;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    checkLocationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkLocation();
    });

    function checkLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
                statusMessage.textContent = "Location verified!";
            }, (error) => {
                statusMessage.textContent = "Error retrieving location. Please try again.";
            });
        } else {
            statusMessage.textContent = "Geolocation is not supported by this browser.";
        }
    }

    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value.trim();

        if (studentName === '') {
            statusMessage.textContent = "Please enter the student name.";
        } else if (userLatitude && userLongitude) {
            const student = studentDatabase.find(s => s.name.toLowerCase() === studentName.toLowerCase());

            if (student) {
                student.attendance += 1;
                const attendanceData = {
                    studentName: student.name,
                    latitude: userLatitude,
                    longitude: userLongitude,
                    timestamp: new Date().toISOString()
                };
                console.log("Attendance Data:", attendanceData);
                statusMessage.textContent = `Attendance submitted successfully for ${student.name}. Total attendance: ${student.attendance}`;
                attendanceForm.reset();
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 3000);
            } else {
                statusMessage.textContent = "Error: Student not found in the database. Please enter a valid name.";
            }
        } else {
            statusMessage.textContent = "Location not verified. Please check your location first.";
        }
    });

    // Adding new student with authorization (admin password)
    const addStudentForm = document.getElementById('addStudentForm');
    const newStudentName = document.getElementById('newStudentName');
    const adminPassInput = document.getElementById('adminPassword');

    addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newStudent = newStudentName.value.trim();
        const enteredPassword = adminPassInput.value.trim(); // Ensure password is trimmed

        // Check if the admin password is correct
        if (enteredPassword === adminPassword) { // Now comparing as strings
            if (newStudent === '') {
                alert('Please enter a name for the new student.');
            } else if (studentDatabase.some(s => s.name.toLowerCase() === newStudent.toLowerCase())) {
                alert('Student already exists in the database.');
            } else {
                studentDatabase.push({ name: newStudent, attendance: 0 });
                newStudentName.value = '';
                adminPassInput.value = '';
                alert(`New student "${newStudent}" added successfully.`);
            }
        } else {
            alert('Error: Incorrect admin password. You are not authorized to add a new student.');
        }
    });
});
