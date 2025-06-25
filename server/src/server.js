/*
The server that runs the application defined in app.js
Basically just provides an address for the frontend to access the API
*/

const app = require('./app');
const PORT = 3232;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
