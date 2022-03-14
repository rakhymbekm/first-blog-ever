const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;

// process.env.PORT
// process.env.NODE_ENV

// middleware
app.use(express.json()); // req.body
app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

// routes
app.use('/', require('./routes/public'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/dashboard'));

app.listen(PORT, ()=>{
    console.info(`Server is running on port ${PORT}...`);
});