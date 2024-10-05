// admin.js
import { studentDatabase } from './database.js';

const adminPassword = '123'; // Hardcoded admin password for simplicity

// Function to handle adding a new student
export function handleAddStudentSubmit(event) {
    event.preventDefault();
    const newStudent = document.getElementById('newStudentName').value.trim();
    const enteredPassword = document.getElementById('adminPassword').value;

    // Check if the admin password is correct
    if (enteredPassword === adminPassword) {
        if (newStudent === '') {
            alert('Please enter a name for the new student.');
        } else if (studentDatabase.some(s => s.name.toLowerCase() === newStudent.toLowerCase())) {
            alert('Student already exists in the database.');
        } else {
            // Add new student to the database with 0 attendance
            studentDatabase.push({ name: newStudent, attendance: 0 });
            document.getElementById('newStudentName').value = ''; // Reset the input field
            document.getElementById('adminPassword').value = ''; // Reset the password field
            alert(`New student "${newStudent}" added successfully.`);
        }
    } else {
        // Incorrect password
        alert('Error: Incorrect admin password. You are not authorized to add a new student.');
    }
}
