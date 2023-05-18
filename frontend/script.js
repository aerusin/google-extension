// Retrieve the heartrate data from the server every second
setInterval(() => {
    fetch('http://localhost:3000/start') // Include the full URL
      .then(response => response.text())
      .then(data => {
        // Update the heartrate value in your script.js logic
        console.log('Heartrate:', data); // Example: Log the heartrate value
        // Use the heartrate value for further processing or display
      })
      .catch(error => {
        console.error('Error fetching heartrate:', error);
      });
  }, 1000);
  