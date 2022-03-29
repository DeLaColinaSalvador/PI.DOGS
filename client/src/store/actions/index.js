import axios from 'axios';
import { ALL, CREATED, EXISTENT } from '../../const/sort';


export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SORT_NAME = 'SORT_NAME';
export const ADD_DOG = 'ADD_DOG';
export const SORT_WEIGHT = 'SORT_WEIGHT';
export const FETCH_TEMPERAMENTS = 'FETCH_TEMPERAMENTS';

export function fetchDogs(type=ALL,shouldFilter=false,toFilter=[]) {
    return function(dispatch) {
        axios.get("http://localhost:3001/api/dogs")
        .then((dogs) => {
            let filteredDogs = dogs.data
            const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
            if (type===CREATED){
                filteredDogs=dogs.data.filter((element) =>{
                    return regexExp.test(element.id)
                })
            } else if (type===EXISTENT){
                filteredDogs=dogs.data.filter((element) =>{
                    return !(regexExp.test(element.id))
                })
            }
            if (shouldFilter){
                filteredDogs = filteredDogs.filter((element) => {
                    if (!element.temperaments){return false}
                    let temperaments = element.temperaments.split(', ')
                    for (let i=0 ; i<toFilter.length ; i++){
                        if (!temperaments.includes(toFilter[i])){
                            return false;
                        }
                    }
                    console.log('match')
                    return true;
                })
                console.log('temperament filter')
                console.log(filteredDogs)
            }
            dispatch({
                type: FETCH_DOGS,
                payload: filteredDogs
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function SearchDog(search){
    return function(dispatch) {
        axios.get("http://localhost:3001/api/dogs?name="+search)
        .then((dogs) => {
            dispatch({
                type: SEARCH_DOGS,
                payload: dogs
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function SortName(order){
    return {
        type: SORT_NAME,
        payload: order
    }
}

export function SortWeight(order){
    return {
        type: SORT_WEIGHT,
        payload: order
    }
}

export function FetchTemperaments(){
    return function (dispatch){
        axios.get('http://localhost:3001/api/temperaments')
        .then((temperaments)=>{
            dispatch({
                type: FETCH_TEMPERAMENTS,
                payload: temperaments.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }
}