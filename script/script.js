// Create Charts
const ctx = document.getElementById('myChart');

new Chart(ctx, {
   type: 'line',
    data: {
      labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Fev, 2024', 'Mar, 2024'],
      datasets: [{
        label: 'Systolic',
        data: [120, 115, 160, 115, 150, 160],
        borderWidth: 3,
        borderColor: '#C26EB4',
        fill: false
      }, {
        label: 'Diastolic',
        data: [110, 60, 110, 90, 70, 80],
        borderWidth: 3,
        borderColor: '#7E6CAB',
        fill: false
      }
      ]
    },
  options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
  }
});

// Retrieve Data for Jessica Taylor
async function fetchData() {
    const username = 'coalition';
    const password = 'skills-test';
    const auth = btoa(`${username}:${password}`); // Encode credentials in base64

    try {
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev/', {
             headers: {
                  'Authorization': `Basic ${auth}`,
                  'Content-Type': 'application/json'
             }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const person = data.find(person => person.name === 'Jessica Taylor');

        if (person) {
            displayData(person);
        } else {
            displayData({ message: 'Jessica Taylor not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayData({ message: 'Error fetching data' });
    }
}

function displayData(data) {
    // retrieve Patient name
    const nameDiv = document.querySelector('#name');

    //retrieve the systolic value and level
    const systolicLevel = document.querySelector('#systolic-levels');
    const systolicValue = document.querySelector('#systolic-val');

    //retrieve the diastolic value and level
    const diastolicValue = document.querySelector('#diastolic-val');
    const diastolicLevel = document.querySelector('#diastolic-levels');

    //retrieve the respiratory  rate and level
    const respRateValue = document.querySelector('#resp-val');
    const respRateLevel = document.querySelector('#resp-levels');

    // retrieve the temperature level and value
    const tempValue = document.querySelector('#temp-val');
    const tempLevel = document.querySelector('#temp-levels');

    // retrieve the heartbeat rate and value
    const heartbeatValue = document.querySelector('#heart-val');
    const heartbeatLevel = document.querySelector('#heart-levels');

    const march2024Diagnosis = data.diagnosis_history.find(diagnosis => diagnosis.month === 'March' && diagnosis.year === 2024);

    if (march2024Diagnosis) {
        systolicValue.textContent = `${march2024Diagnosis.blood_pressure.systolic.value}`;
        systolicLevel.textContent = `${march2024Diagnosis.blood_pressure.systolic.levels}`;

        diastolicValue.textContent = `${march2024Diagnosis.blood_pressure.diastolic.value}`;
        diastolicLevel.textContent = `${march2024Diagnosis.blood_pressure.diastolic.levels}`;

        respRateValue.textContent = `${march2024Diagnosis.respiratory_rate.value} bpm`;
        respRateLevel.textContent = `${march2024Diagnosis.respiratory_rate.levels}`;

        tempValue.textContent = `${march2024Diagnosis.temperature.value} °F`;
        tempLevel.textContent = `${march2024Diagnosis.temperature.levels}`;

        heartbeatValue.textContent = `${march2024Diagnosis.heart_rate.value} bpm`;
        heartbeatLevel.textContent = `${march2024Diagnosis.heart_rate.levels}`;
    } else {
        displayData({ message: "Data not found!"});
    }

    if (data.message) {
        nameDiv.textContent = data.message;
    } else {
        nameDiv.textContent = `${data.name}`;
    }

}



// Call fetchData when the script loads
fetchData();
