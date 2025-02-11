const express = require('express');
require('dotenv').config(); 
const mongoose = require('mongoose');
const cors=require('cors');
const app = express();
const userRoutes=require('./routes/userRoutes')

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("Server running");
});

app.listen(PORT, () => {
    console.log(`Server running on server ${PORT}`);
});
