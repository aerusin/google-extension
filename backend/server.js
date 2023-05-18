const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3000;
let intervalId; // Variable to hold the interval ID

app.use(cors()); // Enable CORS for all routes
// Store the heart rate value globally
let heartRateValue = null;

// Define a route to start the data retrieval
app.get('/start', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto('https://app.hyperate.io/3021');

    await page.waitForFunction(() => {
      const element = document.querySelector('.heartrate');
      return element && element.textContent > 0;
    });

    // Start the interval to fetch the heart rate every second
    intervalId = setInterval(async () => {
      heartRateValue = await page.$eval('.heartrate', element => element.innerHTML);
    }, 1000); // Interval of 1 second (1000 milliseconds)

    res.json({ message: 'Data retrieval started' });
  } catch (error) {
    console.error('Error starting data retrieval:', error);
    res.status(500).json({ error: 'An error occurred while starting data retrieval' });
  }
});

// Define a route to stop the data retrieval
app.get('/stop', (req, res) => {
  clearInterval(intervalId); // Clear the interval
  res.json({ message: 'Data retrieval stopped' });
});

// Define a route to retrieve the heart rate
app.get('/heartrate', (req, res) => {
  res.json({ heartRate: heartRateValue });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
