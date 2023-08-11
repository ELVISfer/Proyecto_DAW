const express = require('express');
const labora = express.Router();
const db = require('../db/conn');

labora.post('/api/laboratorio',(req, res)=>{


    let laboratorio =[
    
       req.body.nombre
  
    ];

    let sql = `insert into laboratorio (nombre) values ($1)
      returning id` ;
  
      db.one(sql,laboratorio, event => event.id)
      .then( data => {
  
        const objetocreador = {id : data, nombre :  req.body.nombre}
  
        res.json(objetocreador);
      })
      .catch((error)=>{
  
        res.json(error);
      });
  
  });
  
  labora.get('/api/laboratorio',(req, res)=>{
   
    let sql = "select * from laboratorio";
  
  
      db.any(sql, e => e.id)
          .then(rows => { res.json(rows); })
          .catch((error) => {
  
              res.json(error);
  
          });
  
  });
  
  labora.put('/api/laboratorio/:id', (req, res) => {
  
  
    const parametros = [
      req.params.id,
      req.body.nombre,
    ];
  
    let sql = ` update laboratorio 
                set  nombre =  $2,
                    where id= $1`;
  
    db.result(sql, parametros, r => r.rowCount)
        .then(data => {
  
            const objetoMo = {  id : req.params.id,    nombre : req.body.nombre};
            
            res.json(objetoMo);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });
  labora.delete('/api/laboratorio/:id', (req, res) => {
  
  
    let sql = ` update laboratorio
                   set id = $1,
                  nombre = $2`;
  
    db.result(sql, [req.params.id] ,   r => r.rowCount)
        .then(data => {
  
            
            const objetoBorrado     = {  id : req.params.id, nombre :req.params.nombre
                                    };
            
            res.json(objetoBorrado);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });

  module.exports = labora;