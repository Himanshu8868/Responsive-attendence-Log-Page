// main.js
import { studentDatabase } from './database.js';
import { handleAddStudentSubmit } from './admin.js';

let userLatitude = null;
let userLongitude = null;

document.addEventListener('DOMContentLoaded', () => {
    // Handle Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Location checking function
    function checkLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
                document.getElementById('statusMessage').textContent = "Location verified!";
            }, (error) => {
                document.getElementById('statusMessage').textContent = "Error retrieving location. Please try again.";
            });
        } else {
            document.getElementById('statusMessage').textContent = "Geolocation is not supported by this browser.";
        }
    }

    // Handle location verification button click
    document.getElementById('checkLocationBtn').addEventListener('click', (e) => {
        e.preventDefault();
        checkLocation();
    });

    // Attendance submission form
    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const studentName = document.getElementById('studentName').value.trim();
        const statusMessage = document.getElementById('statusMessage');

        if (studentName === '') {
            statusMessage.textContent = "Please enter the student name.";
        } else if (userLatitude && userLongitude) {
            const student = studentDatabase.find(s => s.name.toLowerCase() === studentName.toLowerCase());

            if (student) {
                student.attendance += 1; // Increment attendance
                const attendanceData = {
                    studentName: student.name,
                    latitude: userLatitude,
                    longitude: userLongitude,
                    timestamp: new Date().toISOString()
                };
                console.log("Attendance Data:", attendanceData);
                statusMessage.textContent = `Attendance submitted successfully for ${student.name}. Total attendance: ${student.attendance}`;
                document.getElementById('form').reset();
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 3000); // Clear message after 3 seconds
            } else {
                statusMessage.textContent = "Error: Student not found in the database. Please enter a valid name.";
            }
        } else {
            statusMessage.textContent = "Location not verified. Please check your location first.";
        }
    });

    // Handle adding a student (admin form)
    document.getElementById('addStudentForm').addEventListener('submit', handleAddStudentSubmit);
});
