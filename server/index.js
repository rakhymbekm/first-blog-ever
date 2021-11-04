const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json()); // req.body
app.use(cors());
app.options('*', cors());

// routes
app.use('/', require('./routes/public'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/dashboard'));

app.listen(5000, ()=>{
    console.info('Server is running on port 5000...')
});