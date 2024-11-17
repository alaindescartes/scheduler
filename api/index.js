const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');

//Middleware
app.use(cors());
app.use(express.json());




//connect to the db()
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Mongo_error: ",err));










// Start the server
const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
