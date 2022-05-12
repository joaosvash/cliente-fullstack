const mongoose = require("mongoose");
const {Schema}=mongoose;

const ClienteSchema=new Schema({
    nombre:{type: String, required:true},
    apellido:{type: String, required:true},
    edad:{type: Number, required:true},
    fechnac:{type:Date, required:true},
    date:{ type:Date,default: Date.now},
    user:{type:String}
});

ClienteSchema.virtual('fecha_nacimiento')
  .set(function(fecha) {
    // El formato esperado es 'yyyy-mm-dd' que es el devuelto por el campo input
    // el valor recibido se almacenará en el campo fecha_nacimiento_iso de nuestro documento
    this.fechnac = new Date(fecha);
  })
  .get(function(){
    // el valor devuelto será un string en formato 'yyyy-mm-dd'
    return this.fechnac.toISOString().substring(0,10);
  });

module.exports=mongoose.model('Cliente',ClienteSchema);