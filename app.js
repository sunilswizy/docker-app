const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const MONGO_USER_NAME = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_USER_PASSWORD;
const URL = `mongodb://${MONGO_USER_NAME}:${MONGO_PASSWORD}@mongodb/users?authSource=admin`;

mongoose.connect(URL)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:80', 'http://localhost']
}))

app.use(express.json());

app.get('/', (req, res) => {
    console.log("App is running");
    res.send("Hello from server!");
});

app.get('/data', async (req, res) => {

    const user = await User.findOne({
        email: 'sunil@example.com'
    });

    const data = { username: user.name }
    res.send({
        status: true,
        data
    });
});

app.patch('/data', async (req, res) => {
    const { username } = req.body;

    await User.updateOne({
        email: 'sunil@example.com'
    }, { name: username });

    res.send({
        status: true
    });
})


app.listen(3000, () => {
    console.log("App is running on 3000");
});
