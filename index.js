const connectToMongo = require('./dbConfig');
const express = require('express')
const cors = require('cors');

require('dotenv').config();
connectToMongo();

const app = express()
const port = 5000


app.use(express.json());    
app.use(cors());
//Availabel routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
