let average = 0;
let heartRateCount = 0;
const progressBar = document.getElementById('progress-bar');
let averageBool = false;
let stressTest = false;

// Function to display a notification
function showNotification(message) {
  if (Notification.permission === 'granted') {
    // Create a new notification
    const notification = new Notification('Notification', {
      body: message,
      requireInteraction: true,
    });

    const audio = new Audio('notification-sound.mp3');
    audio.play();

    // Handle notification click event
    notification.onclick = function () {
      // Close the notification when clicked
      notification.close();
    };
  } else if (Notification.permission !== 'denied') {
    // Request permission to display notifications
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotification(message);
      }
    });
  }
}

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
      const heartRate = parseInt(data.heartRate);
      if (averageBool) {
        progressBar.style.display = "block";
        if (heartRateCount == 20) {
          stressTest = true;
          averageBool = false;
          average = average / heartRateCount;
          heartRateCount = 0;
          document.getElementById("avgHeartRate").innerText = average;
          progressBar.value = 0;
          progressBar.style.display = "none";
        } else {
          average += heartRate;
          heartRateCount++;
          progressBar.value = heartRateCount;
          console.log(progressBar);
        }
      }
      console.log(stressTest, heartRate, average, typeof (heartRate), typeof (average))
      if (stressTest && heartRate > average + 15) {
        showNotification(`Your heartrate is ${heartRate - average} above average, you should take a break!`);
        stressTest = false;
        console.log("hello")
      }
      // Update the heart rate value
      document.getElementById('heartRateValue').innerText = heartRate !== null ? heartRate : '-';
    })
    .catch(error => {
      console.error('Error retrieving heart rate:', error);
    });
}

function getAverage() {
  averageBool = true;
  console.log("wdad");
}

// Start the data retrieval process when the button is clicked
document.getElementById('startButton').addEventListener('click', startDataRetrieval);

// Fetch and display the heart rate every second
setInterval(getHeartRate, 1000); // Interval of 1 second (1000 milliseconds)
