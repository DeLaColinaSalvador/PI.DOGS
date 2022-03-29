const { Router } = require('express');
const {Dog} = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.post( "/" , async (req,res,next) => {
        const {name  , life_span} = req.body;
        const weight = req.body.weightMin + " - " + req.body.weightMax
        const height = req.body.heightMin + " - " + req.body.heightMax
        const newBreed = await Dog.create({
            name,
            height,
            weight,
            life_span,
        })
        .then((newBreed)=>{
            res.status(201).send(newBreed)
        })
        .catch(error => next(error))
    })

module.exports = router;