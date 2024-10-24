const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');

const app = express();
app.use(bodyParser.json());

// Use API routes
app.use('/api', apiRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});