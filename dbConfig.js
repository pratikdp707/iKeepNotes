const mongoose = require('mongoose');

function connectToMongo(){
    mongoose.connect(process.env.CONNECTION_URL,
        {useUnifiedTopology: true,
        useNewUrlParser : true});

    const connection = mongoose.connection;

    connection.on('connected', ()=>{
        console.log('MongoDB is connected successfully')
    })

    connection.on('error', () => {
        console.log('Failed to connect to MongoDB');
    })
}

module.exports = connectToMongo;