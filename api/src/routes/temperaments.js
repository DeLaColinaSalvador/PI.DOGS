const { Router } = require('express');
const {Temperament} = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get( ("/") , (req,res,next) => {
    try{
        return Temperament.findAll()
        .then((temperaments) => {
            res.send(temperaments)}
        )}
    catch(error){
        next(error)
    }   
})



router.post( "/" , async (req,res,next) => {
    try {
        const {name} = req.body;
        const newTemperament = await Temperament.create({
         name,
        })
        res.status(201).send(newTemperament)
    }
    catch (error){
        next(error)
    }
})

module.exports = router;
