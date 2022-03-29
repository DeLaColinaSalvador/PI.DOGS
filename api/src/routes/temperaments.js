const { Router } = require('express');
const {Temperament} = require('../db');
const axios = require('axios');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get( ("/") , async (req,res,next) => {
    try{
        let apiresponse =  await axios.get("https://api.thedogapi.com/v1/breeds")
        apiresponse.data.map((dog)=>{
            if (dog.temperament) {
                let Temperaments = dog.temperament.split(', ')
                Temperaments.map(async (element) => {
                    const [newTemperament, created] = await Temperament.findOrCreate({
                        where : { name : element},
                        defaults: {
                            name : element
                        }
                    })
                })
            }

        })
        let Temperaments = await Temperament.findAll({
            order :[
                ['name','ASC']
            ]
        })
        res.send(Temperaments)
    }
    catch(error){
        next(error)
    }   
})


module.exports = router;
