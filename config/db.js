const mongoose =require('mongoose')
const mongo_uri = "mongodb://127.0.0.1:27017/data";


const connect = async () => {
    try {
      await mongoose.connect(mongo_uri,{  
        useNewUrlParser: true,
        useUnifiedTopology: true,});
      console.log('Conectado a la base de datos');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
    }
  };
  
  module.exports = connect;
  