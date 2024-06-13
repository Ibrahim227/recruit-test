// server.js file
require('dotenv').config();
let username = process.env.USERNAME;
let password = process.env.PASSWORD;
let auth = Buffer.from(`${username}:${password}`).toString('base64');

fetch('https://fedskillstest.coalitiontechnologies.workers.dev/auth', {
	headers: {
		'Authorization': `Basic ${auth}`,
		'Content-Type': 'application/json'
	}
}).then(function (response) {
	if (!response.ok) {
		return response.json().then(error => {
			throw new Error(error.message || 'Unknown error');
		});
	}
	return response.json();
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.error('Authentication failed:', error.message || error);
});