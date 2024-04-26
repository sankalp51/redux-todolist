const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const listRoutes = require('./routes/listRoutes');
const connectDb = require('./config/db');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDb();

app.use("/api/list", listRoutes);

mongoose.connection.once("open", () => {
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
})