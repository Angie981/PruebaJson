const express = require('express');
const datos = require('./datos.json');
const app = express();

app.get('/datos', (req, res) => {
  res.json(datos);
});

app.get('/datos/:fecha_inicio/:fecha_fin', (req, res) => {
  const fechaInicio = new Date(req.params.fecha_inicio);
  const fechaFin = new Date(req.params.fecha_fin);

  const datosFiltrados = datos.filter(dato => {
    const fechaDato = new Date(dato.fecha_creacion);
    return fechaDato >= fechaInicio && fechaDato <= fechaFin;
  });

  res.json(datosFiltrados);
});

app.get('/datos/fechas', (req, res) => {
    const fechas = datos.map(dato => new Date(dato.fecha_creacion));
    const fechaMinima = new Date(Math.min(...fechas));
    const fechaMaxima = new Date(Math.max(...fechas));
    res.json({ fechaMinima, fechaMaxima });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
  