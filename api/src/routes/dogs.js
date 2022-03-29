const { Router, response } = require('express');
const axios = require('axios');
const router = Router();
const {Dog} = require('../db');
const {Temperament} = require('../db');
const {Op} = require('sequelize');
const { API_KEY } = process.env

router.get( ("/") , async (req,res,next) => {
    let name = req.query.name;
    let DogPromiseApi;
    let DogPromiseDB;
    if (name){
        DogPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds/search?q='+name ,
            {headers: {
                "x-api-key" : `${API_KEY}`} 
            }
        );
        DogPromiseDB = Dog.findAll({
            include: [{
                model: Temperament
              }],
            where : {
                name: {
                    [Op.iLike]: "%" + name + "%"
                }
            }
            })
        console.log(DogPromiseDB)
    }
    else {
        DogPromiseDB =  await Dog.findAll({
            include: [{
                model: Temperament
              }],
            })
        console.log(DogPromiseDB)
        DogPromiseApi = axios.get('https://api.thedogapi.com/v1/breeds');
    }
    Promise.all([DogPromiseApi,DogPromiseDB])
    .then((info) => {
        const [DogApi, DogDB] = info;
        const FilteredDogDB = DogDB.map((dog) => {
            let weight = dog.dataValues.weight.split(" - ")
            let height = dog.dataValues.height.split(" - ")
            let temperaments = []
            dog.dataValues.temperaments.map((prop) => {
                temperaments.push(prop.name)
            })
            console.log(temperaments)
            return {
                id : dog.dataValues.id,
                name : dog.dataValues.name,
                weightMin : weight[0],
                weightMax : weight[1],
                heightMin : height[0],
                heightMax : height[1],
                temperaments : temperaments.join(', ')
            }
        })
        const FilteredDogApi = DogApi.data.map((dog) => {
            let weight = dog.weight.metric.split(" - ")
            let height = dog.height.metric.split(" - ")
            return {
                id : dog.id,
                name : dog.name,
                weightMin : weight[0],
                weightMax : weight[1],
                heightMin : height[0],
                heightMax : height[1],
                temperaments : dog.temperament,
                image : "https://cdn2.thedogapi.com/images/"+dog.reference_image_id+".jpg"
            }
        })
        let allDogs = [...FilteredDogApi, ...FilteredDogDB]
        res.send(allDogs)
    })
    .catch(error => next (error))
})


router.get( ("/:id") , async (req,res,next) => {
    let {id} = req.params;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    let dog;
    try{
        if (regexExp.test(id)){
            dog = await Dog.findByPk(id);
            let weight = dog.dataValues.weight.split(" - ")
            let height = dog.dataValues.height.split(" - ")
            let filteredDogInfo = {
                    id : dog.dataValues.id,
                    name : dog.dataValues.name,
                    weightMin : weight[0],
                    weightMax : weight[1],
                    heightMin : height[0],
                    heightMax : height[1],
                    temperaments : dog.dataValues.temperament,
                    life_span : dog.dataValues.life_span,
                }
            console.log(filteredDogInfo);
            dog = filteredDogInfo;
        } else {
            let apiresponse =  await axios.get("https://api.thedogapi.com/v1/breeds")
            console.log(apiresponse);
            dog = apiresponse.data.find((element) => {return element.id == id});
            console.log(dog)
            let weight = dog.weight.metric.split(" - ")
            let height = dog.height.metric.split(" - ")
            let filteredDogInfo = {
                name : dog.name,
                weightMin : weight[0],
                weightMax : weight[1],
                heightMin : height[0],
                heightMax : height[1],
                temperaments : dog.temperament,
                life_span : dog.life_span,
                image : "https://cdn2.thedogapi.com/images/"+dog.reference_image_id+".jpg"
            }
            dog = filteredDogInfo
        }
        return res.send(dog);
    }
    catch(error){
        next(error)
    }
})

module.exports = router;
