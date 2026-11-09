const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan for logging
const app = express();
app.use(morgan('dev')); // Logs each HTTP request
app.use(cookieParser());
app.use(cors({
      origin: ['http://localhost:5173', 'http://localhost:5174'],                                  
        credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./Routes/route')); // Use the main routes under the '/api' prefix
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports=app;
