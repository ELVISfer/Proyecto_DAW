const express = require('express');
const labora = express();
labora.use(express.json());


const rutausuario = require('./routes/usuario');
labora.use('/api/usuario', rutausuario);

const rutalaboratorio = require('./routes/laboratorio');
labora.use('/api/laboratorio', rutalaboratorio);

const rutareserva = require('./routes/reserva');
labora.use('/api/reserva', rutareserva);

const rutaHorario = require('./routes/Horario');
labora.use('/api/Horario', rutaHorario);

labora.listen(4000);

