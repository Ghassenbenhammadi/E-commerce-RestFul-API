
const mongoose = require('mongoose')
const dbConneection= () =>{
    mongoose.connect(process.env.DB_URI).then((conn)=>{
        console.log(`Database Connected: ${conn.connection.host}`);
     })
};
module.exports = dbConneection;