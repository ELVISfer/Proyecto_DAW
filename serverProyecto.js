const express = require('express');
const app = express();
app.use(express.json());


const rutausuario = require('./routes/usuario');
app.use('/api/usuario', rutausuario);

const rutalaboratorio = require('./routes/laboratorio');
app.use('/api/laboratorio', rutalaboratorio);

const rutareserva = require('./routes/reserva');
app.use('/api/reserva', rutareserva);

const rutaHorario = require('./routes/Horario');
app.use('/api/Horario', rutaHorario);

app.listen(3001);

