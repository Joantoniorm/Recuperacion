const alumnos = require('./alumnos.json');
const tutores = require('./tutores.json');
const trabajos = require('./trabajos.json');
module.exports = () =>({
  alumnos: alumnos,
  tutores: tutores,
  trabajos: trabajos
});

