const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/UserAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Connection to MongoDB Failed due to: " + error);
})