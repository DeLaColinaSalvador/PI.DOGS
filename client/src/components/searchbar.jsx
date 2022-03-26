import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SearchDog } from "../store/actions";


export default function SearchBar (){
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()

    function onSubmit(e){
        e.preventDefault();
        dispatch(SearchDog(search))
    }

    function onInputChange(e){
        e.preventDefault()
        setSearch(e.target.value)
    }

    return <div>
        <form onSubmit={onSubmit}>
            <input type='text' onChange={onInputChange}/>
            <input type='submit' value='Search'/>
        </form>
    </div>
}