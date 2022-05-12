const mongoose= require("mongoose");

mongoose.connect('mongodb://localhost/chats-db-app',{
    keepAlive:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(db=>console.log('BASE DE DATOS CONECTADA'))
.catch(err=>console.log(err));
