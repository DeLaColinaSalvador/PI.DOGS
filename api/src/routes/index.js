const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const DogsRoute = require('./dogs.js');
const TemperamentsRoute = require('./temperaments.js');
const DogRoute = require('./dog.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs' , DogsRoute);
router.use('/temperaments' , TemperamentsRoute);
router.use('/dog' , DogRoute);


module.exports = router;
