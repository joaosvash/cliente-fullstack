const mongoose= require("mongoose");

mongoose.connect('mongodb+srv://joao:joao123@cluster0.jlk9z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    keepAlive:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(db=>console.log('BASE DE DATOS CONECTADA'))
.catch(err=>console.log(err));
