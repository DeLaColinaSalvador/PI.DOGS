import { DESCENDENTE , W_DESCENDENTE } from "../../const/sort";
import { FETCH_DOGS , FETCH_TEMPERAMENTS, SEARCH_DOGS, SORT_NAME, SORT_WEIGHT } from "../actions";

const initialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_DOGS:
            return{
                ...state,
                filteredDogs: action.payload
            }
        case SEARCH_DOGS:
            return{
                ...state,
                filteredDogs: action.payload.data
            }
        case SORT_NAME:
            let orderedDogsN = [...state.filteredDogs];
            orderedDogsN.sort((a,b) =>{
                let comparison = a.name.toUpperCase().localeCompare(b.name.toUpperCase());
                return action.payload === DESCENDENTE ? comparison : comparison * -1
                }
            )
            return{
                ...state,
                filteredDogs : orderedDogsN
            }
        case SORT_WEIGHT:
            console.log(action.payload)
            let orderedDogsW = [...state.filteredDogs];
            let filteredDogsW = orderedDogsW.map((a)=>{
                let numberA = Math.ceil(parseInt(a.weightMin))
                let numberB = Math.ceil(parseInt(a.weightMax))
                if (typeof numberA==="number" && typeof numberB==="number" && !(Number.isNaN(numberA)) && !(Number.isNaN(numberB))){
                    a.avgW=Math.ceil((numberB+numberA)/2)
                    return a
                } else if ((typeof numberA==="number" && !Number.isNaN(numberA))|| Number.isNaN(numberB)){
                    numberB=numberA;
                    a.avgW=Math.ceil((numberB+numberA)/2);
                    return a
                } else if ((typeof numberB==="number" && !Number.isNaN(numberB))|| Number.isNaN(numberA)){
                    numberA=numberB;
                    a.avgW=Math.ceil((numberB+numberA)/2);
                    return a
                } else {
                    numberB = numberA = 0
                    a.avgW=Math.ceil((numberB+numberA)/2)
                    return a
                }
            })
            function sortArray(array){ 
                return array.sort((a,b) => {
                return a.avgW - b.avgW}
                )
            }
            let sortedDogsW = sortArray(filteredDogsW)
            console.log(sortedDogsW)
            if (action.payload === W_DESCENDENTE){
                return {
                    ...state,
                    filteredDogs: sortedDogsW
                }
            }
            else {
                return {
                    ...state,
                    filteredDogs: sortedDogsW.reverse()
            }}
            case FETCH_TEMPERAMENTS:
                return {
                    ...state,
                    temperaments: action.payload
                }
        default: return state
    }
}