---Trying to generate a Token. Apparently the endpoint API does not support "POST" requests. So, I done it with the "Basic-encoded-base64"---
I had a "405 method not allowed" status.
//async function getToken() {
//    const username = 'coalition';
//    const password = 'skills-test';
//
//    try {
//        const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev/", {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify({
//                username = username,
//                password = password
//            })
//        });
//
//        if (!response.ok) {
//            throw new Error(`HTTP error! status ${response.status}`);
//        }
//
//        const data = await response.json();
//        return data.token;
//    } catch (error) {
//        console.log("Error fetching token:", error);
//        throw error;
//    }
//}
//
//// export function for use
//export { getToken };