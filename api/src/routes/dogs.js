const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Dog} = require('../db');
const {Temperament} = require('../models/Temperament');
const {Op} = require('sequelize');

router.get( ("/") , (req,res,next) => {
    let name = req.query.name;
    let DogPromiseApi;
    let DogPromiseDB;
    if (name){
        DogPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds/search?q=' + name)
        DogPromiseDB = Dog.findAll({
            include : Temperament,
            where : {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            }
            })
    }
    else {
        DogPromiseDB = Dog.findAll({
            include : Temperament
            })
        DogPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds');
    }
    Promise.all([DogPromiseApi,DogPromiseDB])
    .then((info) => {
        const [DogApi, DogDB] = info;
        const FilteredDogApi = DogApi.data.map((dog) => {
            return {
                name : dog.name,
                height : dog.height.metric,
                weight : dog.weight.metric,
                life_span : dog.life_span,
                temperaments : dog.temperaments,
                image : dog.reference_image_id,
            }
        })
        console.log(DogApi)
        console.log(DogApi.data);
        let allDogs = [...FilteredDogApi, ...DogDB]
        res.send(allDogs)
    })
    .catch(error => next (error))
})


router.get( ("/:id") , async (req,res,next) => {
    let DogID = req.params.id;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let dog;
    try{
        if (regexExp.test(DogID)){
            dog = await Dog.findByPk(DogID);
            
        } else {
            dog =  await axios.get("https://api.thedogapi.com/v1/breeds/search?q="+DogID)
        }
        return res.send(dog);
    }
    catch(error){
        next(error)
    }
})

router.delete( ("/") , (req,res,next) => {
    res.send('delete')
})

module.exports = router;
