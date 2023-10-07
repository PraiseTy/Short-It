require('dotenv').config()

const connectDB = require('./db/connect')
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send({ msg: "inital commit"})
})

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
        console.log(error);
  }
};

start();