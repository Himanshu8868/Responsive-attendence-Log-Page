// location.js
let userLatitude = null;
let userLongitude = null;

export function checkLocation() {
    const statusMessage = document.getElementById('statusMessage');
    console.log("Checking location...");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLatitude = position.coords.latitude;
                userLongitude = position.coords.longitude;
                statusMessage.textContent = "Location verified!";
                console.log("Latitude:", userLatitude, "Longitude:", userLongitude); // Log coordinates
            },
            (error) => {
                console.error("Error occurred while retrieving location:", error);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        statusMessage.textContent = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        statusMessage.textContent = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        statusMessage.textContent = "The request to get user location timed out.";
                        break;
                    case error.UNKNOWN_ERROR:
                        statusMessage.textContent = "An unknown error occurred.";
                        break;
                }
            }
        );
    } else {
        statusMessage.textContent = "Geolocation is not supported by this browser.";
    }
}
