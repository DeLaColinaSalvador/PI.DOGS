import axios from "axios";
import React, { useState , useEffect } from "react"
import { useNavigate } from "react-router";
import { useDispatch , useSelector } from "react-redux";
import { FetchTemperaments } from "../store/actions";
import s from '../styles/adddog.module.css'

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
        e.preventDefault();
        let errors = validate(newDog)
        console.log(errors)
        errors.forEach((err) => {
            alert(err)
        })
        if (errors.length == 0){
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
        } else{
            
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
        if (!nums.test(dog.weightMax) || !nums.test(dog.weightMin)) {
            errors.push("Min. and Max. weights have to be numbers")
        }
        if (!numsHeight.test(dog.heightMax) || !numsHeight.test(dog.heightMin)) {
            errors.push("Min. and Max. Heights have to be numbers")
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

    return <form className={s.form} onSubmit={onSubmit}>
        <label className={s.label} htmlFor="name">Nombre: </label>
        <input className={s.input} id='name' onChange={onInputChange} name='name'/>
        <br className={s.br}/>
        <label className={s.label} htmlFor="weightMin">Peso Mínimo: </label>
        <input className={s.input} id='weightMin' onChange={onInputChange} name='weightMin'/>
        <br className={s.br}/>
        <label className={s.label} htmlFor="weightMax">Peso Máximo: </label>
        <input className={s.input} id='weightMax' onChange={onInputChange} name='weightMax'/>
        <br className={s.br}/>
        <label className={s.label} htmlFor="heightMin">Altura Mínima: </label>
        <input className={s.input} id='heightMin' onChange={onInputChange} name='heightMin'/>
        <br className={s.br}/>
        <label className={s.label} htmlFor="heightMax">Altura Máxima: </label>
        <input className={s.input} id='heightMax' onChange={onInputChange} name='heightMax'/>
        <br className={s.br}/>
        <label className={s.label} htmlFor="life_span">Expectativa de vida: </label>
        <input className={s.input} id='life_span' onChange={onInputChange} name='life_span'/>
        <br className={s.br}/>
        <label className={s.label} htmlFor="temperament">Temperamento: </label>
        <select name="temperament" onChange={onSelectChange} multiple={true}>
                    {temperaments ? temperaments.map(makeOption) : <option>loading</option>}
        </select>
        <br className={s.br}/>
        <input className={s.submit} type='submit'/>

    </form>
}