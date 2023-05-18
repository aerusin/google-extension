let average = 0;
const progressBar = document.getElementById('progress-bar');

// Function to start the data retrieval
function startDataRetrieval() {
  // Make a request to start the data retrieval process on the server
  fetch('http://localhost:3000/start')
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
    })
    .catch(error => {
      console.error('Error starting data retrieval:', error);
    });
}

// Function to retrieve and display the heart rate
function getHeartRate() {
  // Make a request to retrieve the heart rate from the server
  fetch('http://localhost:3000/heartrate')
    .then(response => response.json())
    .then(data => {
      const heartRate = data.heartRate;
      // Update the heart rate value
      document.getElementById('heartRateValue').innerText = heartRate !== null ? heartRate : '-';
    })
    .catch(error => {
      console.error('Error retrieving heart rate:', error);
    });
}

// Start the data retrieval process when the button is clicked
document.getElementById('startButton').addEventListener('click', startDataRetrieval);

// Fetch and display the heart rate every second
setInterval(getHeartRate, 1000); // Interval of 1 second (1000 milliseconds)



