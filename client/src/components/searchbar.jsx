import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchDog } from "../store/actions";
import s from '../styles/searchbar.module.css'


export default function SearchBar (props){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault();
        console.log(search)
        if (search){
            dispatch(SearchDog(search));
            setSearch('')
            e.target.value = ''
            props.paginado(1)
            console.log('searched')
        } else {
            alert('El campo de busqueda no puede estar vacio')
        }
    }

    function onInputChange(e){
        setSearch(e.target.value)
        e.preventDefault()
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input className={s.input} type='text' onChange={onInputChange}/>
            <input className={s.submit} type='submit' value='Search'/>
        </form>
    </div>
}