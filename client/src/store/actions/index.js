import axios from 'axios';


export const FETCH_DOGS = 'FETCH_DOGS';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SORT_NAME = 'SORT_NAME';
export const ADD_DOG = 'ADD_DOG';
export const SORT_WEIGHT = 'SORT_WEIGHT'

export function fetchDogs() {
    return function(dispatch) {
        axios.get("http://localhost:3001/api/dogs")
        .then((dogs) => {
            console.log(dogs)
            dispatch({
                type: FETCH_DOGS,
                payload: dogs
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