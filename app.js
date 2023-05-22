const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');
const User =require('./public/user');
const user = require('./public/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');


app.post('/register', (req, res) => {
    const {username,password}=req.body;
    
    const user=new User({username:username,password:password}); 
    user.save(err=>{
      if(err){
        res.status(500).send('ERROR AL REGISTRAR USUARIO');
      }else{
        res.status(200).send('USUARIO REGISTRADO');
      }
    });
  });
  app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
  
    User.findOne({ username }, (err, user) => {
      if (err) {
        res.status(500).send('ERROR AL AUTENTICAR EL USUARIO');
      } else if (!user) {
        res.status(500).send('EL USUARIO NO EXISTE');
      } else {
        user.isCorrectPassword(password, (err, result) => {
          if (err) {
            res.status(500).send('ERROR AL AUTENTICAR');
          } else if (result) {
            User.find({}, (err, users) => {
              if (err) {
                console.error(err);
                res.status(500).send('ERROR AL OBTENER LOS USUARIOS');
              } else {
                // Generar el contenido HTML de la tabla de usuarios
                let html = `
                <html>

                  <head>
                    <title>Usuarios Registrados</title>
                    <style>
                      /* Estilos CSS aquí */
                      @import url('https://fonts.googleapis.com/css?family=Roboto');
                      body {
                        font-family: "Roboto";
                        background-color: #f2f2f2;
                        
                      }
                
                      h1 {
                        color: #599;
                        text-align: center;
                      }
                
                      table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                      }
                
                      th, td, tr {
                        padding: 10px;
                        text-align: left;
                        border-bottom: 1px solid #ccc;
                        text-align: center;
                      }
                
                      th {
                        background-color: #f9f9f9;
                      }
                    </style>
                  </head>
                  <body>
                    <h1>Usuarios Registrados</h1>
                    <table>
                      <thead>
                        <tr>
                          <th>Nombre de Usuario</th>
                          <th>Contraseña</th>
                        </tr>
                      </thead>
                      <tbody>
                `;
                
              users.forEach((user) => {
                html += `
                  <tr>
                    <td>${user.username}</td>
                    <td>${user.password}</td>
                  </tr>
                `;
              });
              
              html += `
                      </tbody>
                    </table>
                    <div class="section">   
                        <div class="button"><a href="data.html">Datos Registrados</a></div>
                    </div>
                  </body>
                </html>
              `;
              
              res.send(html);
              }
            });
          } else {
            res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
          }
        });
      }
    });
  });
  




db();
app.listen(5000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
module.exports=app;
