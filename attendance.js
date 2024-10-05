// attendance.js

let userLatitude = null;
let userLongitude = null;
let studentDatabase = [
    { name: "John Doe", attendance: 0 },
    { name: "Jane Smith", attendance: 0 },
    { name: "Alice Johnson", attendance: 0 },
    { name: "Bob Brown", attendance: 0 }
];

export function handleAttendanceSubmit(e) {
    const studentName = document.getElementById('studentName').value.trim();
    const statusMessage = document.getElementById('statusMessage');

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
            e.target.reset();
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 3000);
        } else {
            statusMessage.textContent = "Error: Student not found in the database. Please enter a valid name.";
        }
    } else {
        statusMessage.textContent = "Location not verified. Please check your location first.";
    }
}
