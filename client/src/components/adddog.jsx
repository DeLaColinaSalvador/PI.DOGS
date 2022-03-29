import axios from "axios";
import React, { useState } from "react"

export default function AddDog () {

    const [newDog , setNewDog] = useState({})

    function onInputChange(e){
        e.preventDefault();
        setNewDog({
            ...newDog,
            [e.target.name]: e.target.value
        })
    }

    function onSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:3001/api/dog', newDog)
        .then(() => {

        })
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
        <input type='submit'/>
    </form>
}