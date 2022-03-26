const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Dog} = require('../db');
const {Temperament} = require('../models/Temperament');
const {Op} = require('sequelize');
const { API_KEY } = process.env

router.get( ("/") , (req,res,next) => {
    let name = req.query.name;
    let DogPromiseApi;
    let DogPromiseDB;
    if (name){
        console.log('back')
        DogPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds/search?q='+name ,
            {headers: {
                "x-api-key" : `${API_KEY}`} 
            }
        );
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
                image : "https://cdn2.thedogapi.com/images/"+dog.reference_image_id+".jpg"
            }
        })
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

module.exports = router;
