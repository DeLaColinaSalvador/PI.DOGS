const { Router } = require('express');
const {Dog} = require('../db.js')
const {Temperament} = require('../db.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.post( "/" , async (req,res,next) => {
        const {name  , life_span} = req.body;
        const weight = req.body.weightMin + " - " + req.body.weightMax
        const height = req.body.heightMin + " - " + req.body.heightMax 
        const temperaments = req.body.temperament
        console.log(req.body)
        const newBreed = await Dog.create({
            name,
            height,
            weight,
            life_span,
        })
        try{
            await temperaments.forEach(async (temperament) => {
            let temperamentDb = await Temperament.findAll({
                where: {name: temperament}
            });
            return await newBreed.addTemperament(temperamentDb)
        })
            res.status(201).send(newBreed)
        }
        catch(error){
            console.log(error)
            next(error)
        }
    })

module.exports = router;