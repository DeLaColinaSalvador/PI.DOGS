import axios from "axios";
import React, { useState , useEffect } from "react"
import { useNavigate } from "react-router";
import { useDispatch , useSelector } from "react-redux";
import { FetchTemperaments } from "../store/actions";

export default function AddDog () {

    const [newDog , setNewDog] = useState({})
    const [selectedTemperaments,setTemperaments] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(FetchTemperaments())
    }, [])

    useEffect(() => {
        setNewDog({
            ...newDog,
            temperament: selectedTemperaments
        })
    }, [selectedTemperaments])

    let temperaments = useSelector((state) => state.temperaments)

    function onInputChange(e){
        e.preventDefault();
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e){
        let errors = validate(newDog)
        console.log(errors)
        errors.forEach((err) => {
            alert(err)
        })
        if (!errors){
            try{
                axios.post('http://localhost:3001/api/dog', newDog)
                .then(() => {
                alert('Perro creado')
                navigate('/home')
                })
            }
            catch(error){
                alert(error)
            }
        }
    }

    function validate(dog) {
        let errors= [];
        const nums = new RegExp("^\s*?[0-9]{1,2}\s*$");
        const numsHeight = new RegExp("^\s*?[0-9]{1,3}\s*$");
        let weightMinN = parseInt(dog.weightMin);
        let weightMaxN = parseInt(dog.weightMax);
        let heightMinN = parseInt(dog.heightMin);
        let heightMaxN = parseInt(dog.heightMax);
        if (!dog.name || !dog.weightMax || !dog.weightMin || !dog.heightMin || !dog.heightMax || 
            !dog.life_span ) {
            errors.push("Some inputs are empty")
        }
        if (!nums.test(dog.weightMax) || !nums.test(dog.weightMin) || !nums.test(dog.life_span)) {
            errors.push("Weight and lifespan have to be numbers")
        }
        if (!numsHeight.test(dog.heightMax) || !numsHeight.test(dog.heightMin)) {
            errors.push("Height has to be a number")
        }
        
        if (weightMinN > weightMaxN) {
            errors.push("The min weight has to be lower than the max weight")
        }
        if (heightMinN > heightMaxN) {
            errors.push("The min height has to be lower than the max height")
        }
        return errors;
    }

    async function onSelectChange(e){
        let indexOf = selectedTemperaments.indexOf(e.target.value)
        if (indexOf===-1){
            setTemperaments([...selectedTemperaments,e.target.value])
        } else {
            setTemperaments(selectedTemperaments.filter((temperament)=>{
                return temperament!==e.target.value
            }))
        }
    }

    let makeOption = function(obj){
        return <option key={obj.id}>{obj.name}</option>
    }

    return <form onSubmit={onSubmit}>
        <label htmlFor="">Nombre: </label>
        <input onChange={onInputChange} name='name'type='text'/>
        <label htmlFor="">Peso Mínimo: </label>
        <input onChange={onInputChange} name='weightMin' type='text'/>
        <label htmlFor="">Peso Máximo: </label>
        <input onChange={onInputChange} name='weightMax' type='text'/>
        <label htmlFor="">Alltura Mínima: </label>
        <input onChange={onInputChange} name='heightMin' type='text'/>
        <label htmlFor="">Altura Máxima: </label>
        <input onChange={onInputChange} name='heightMax' type='text'/>
        <label htmlFor="">Expectativa de vida: </label>
        <input onChange={onInputChange} name='life_span' type='text'/>
        <select name="temperament" onChange={onSelectChange} multiple={true}>
                    {temperaments ? temperaments.map(makeOption) : <option>loading</option>}
        </select>
        <input type='submit'/>

    </form>
}