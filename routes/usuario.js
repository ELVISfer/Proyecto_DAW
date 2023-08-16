const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('/api/usuario',(req, res)=>{


    let usuario = [

      req.body.nombre, 
      req.body.apellido,
      req.body.correo,
      req.body.contrasenia,
      req.body.foto

    ];
  
    let sql = `insert into usuarios (nombre, apellido, correo, contrasenia, foto) values ($1, $2, 3$, 4$, 5$)
      returning id ` ;
  
      db.one(sql,usuario, event => event.id)
      .then( data => {
  
        const objetoscreador = {  id : data, 
                                  nombre : nombre[1], 
                                  apellido : apellido[2], 
                                  correo : correo[3],
                                  contrasenia : contrasenia[4], 
                                  foto : foto[5]
                                };
  
        res.json(objetoscreador);
      })
      .catch((error)=>{
  
        res.json(error);
      });
  
  });
  
  
app.get('/api/usuario',(req, res)=>{
    let sql = "select * from usuarios";
  
  
    db.any(sql, e => e.id)
        .then(rows => { res.json(rows); })
        .catch((error) => {
  
            res.json(error);
  
        });
  
  });
  
  app.put('/api/usuario/:id', (req, res) => {
  
  
    const parametros = [
      req.body.nombre, 
      req.body.apellido,
      req.body.correo,
      req.body.contrasenia,
      req.body.foto
    ];
  
    let sql = ` update usuarios 
                  set nombre=$2, apellido =$3 , correo = 4$ , contrasenia = 5$ , foto= 6$
                    where id= $1`;
  
    db.result(sql, parametros, r => r.rowCount)
        .then(data => {
  
            const objetoMo = {  id : req.params.id, nombre : req.body.nombre, apellido: req.body.apellido,
             correo: req.body.correo,
              contrasenia: req.body.contrasenia,
              foto: req.body.foto };
            
            res.json(objetoMo);
  
        })
        .catch((error) => {
            res.json(error);
        });
  });
  app.delete('/api/usuario/:id', (req, res) => {
  
  
    let sql = ` update usuarios
    set nombre=$2, apellido =$3 , correo = 4$ , contrasenia = 5$ , foto= 6$

                where id = $1 `;
  
    db.result(sql, [req.params.id] ,   r => r.rowCount)
        .then(data => {
  
            
            const objetoBorrado     = {  id : req.params.id, id_poder :req.params.id_poder, id_heroe : req.params.id_heroe,
                                        activo : false
                                    };
            
            res.json(objetoBorrado);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });
  

module.exports = app;
