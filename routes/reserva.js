const express = require('express');
const app = express.Router();
const db = require('../db/conn');

app.post('/api/reserva',(req, res)=>{


    let reserva =[
    
       req.body.id_horario,
       req.body.id_usuario,
       req.body.id_laboratorio,
       req.body.hora

  
    ];

    let sql = `insert into reserva (id_horario, id_usuario, id_laboratorio, hora) values ($1, 2$, 3$, 4$)
      returning id` ;
  
      db.one(sql,reserva, event => event.id)
      .then( data => {
  
        const objetocreador = {id : data,   id_horario: req.body.id_horario,
         id_usuario: req.body.id_usuario,
         id_laboratorio: req.body.id_laboratorio,
           hora: req.body.hora
   }
  
        res.json(objetocreador);
      })
      .catch((error)=>{
  
        res.json(error);
      });
  
  });
  
  app.get('/api/reserva',(req, res)=>{
   
    let sql = "select * from reserva";
  
  
      db.any(sql, e => e.id)
          .then(rows => { res.json(rows); })
          .catch((error) => {
  
              res.json(error);
  
          });
  
  });
  
app.put('/api/reserva/:id', (req, res) => {
  
  
    const parametros = [
      req.body.id_horario,
      req.body.id_usuario,
      req.body.id_laboratorio,
      req.body.hora

    ];
  
    let sql = ` update tbl_poderes 
                set  id_horario = 2$, id_usuario= 3$, id_laboratorio= 4$, hora=current_timestamp 
  where id= $1`;
  
    db.result(sql, parametros, r => r.rowCount)
        .then(data => {
  
            const objetoMo = {  id : req.params.id,  id_horario:   req.body.id_horario,
              id_usuario: req.body.id_usuario,
             id_laboratorio: req.body.id_laboratorio,
             hora: req.body.hora    };
            
            res.json(objetoMo);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });
  app.delete('/api/reserva/:id', (req, res) => {
  
  
    let sql = ` update reserva
                   set id = $1,id_horario = 2$, id_usuario= 3$, id_laboratorio= 4$, hora=current_timestamp 
                  `;
  
    db.result(sql, [req.params.id] ,   r => r.rowCount)
        .then(data => {
  
            
            const objetoBorrado     = {  id : req.params.id, id_horario: req.body.id_horario,
              id_usuario: req.body.id_usuario,
             id_laboratorio: req.body.id_laboratorio,
             hora: req.body.hora 
                                    };
            
            res.json(objetoBorrado);
  
        })
        .catch((error) => {
            res.json(error);
        });
  
  
  });

  module.exports = app;