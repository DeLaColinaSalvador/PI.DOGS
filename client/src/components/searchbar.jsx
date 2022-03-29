import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchDog } from "../store/actions";


export default function SearchBar (props){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(e){
        e.preventDefault();
        dispatch(SearchDog(search));
        props.searched.current = true;
        console.log('searched')
    }

    function onInputChange(e){
        setSearch(e.target.value)
        e.preventDefault()
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type='text' onChange={onInputChange}/>
            <input type='submit' value='Search'/>
        </form>
    </div>
}