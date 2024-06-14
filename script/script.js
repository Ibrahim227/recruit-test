const ctx = document.getElementById('myChart');

new Chart(ctx, {
   type: 'line',
    data: {
      labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Fev 2024', 'Mar 2024'],
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

async function fetchData() {
    const username = 'coalition'; // Credentials directly in the script
    const password = 'skills-test'; // Credentials directly in the script
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
            displayData({ message: `${person} not found` });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayData({ message: 'Error fetching data' });
    }
}

function displayData(data) {
    const graphicDiv = document.querySelector('#name');
    if (data.message) {
        graphicDiv.textContent = data.message;
    } else {
        graphicDiv.textContent = `${data.name}`;
    }
}

// Call fetchData when the script loads
fetchData();