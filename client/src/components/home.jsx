import React, { useRef } from "react";
import SearchBar from "./searchbar.jsx";
import Dogs from "./dogs.jsx";
import Order from "./order.jsx";
import { useDispatch } from "react-redux";
import { fetchDogs } from "../store/actions/index.js";
import { useEffect } from "react";

export default function Home (){

    const searched = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDogs());
    }, [])

    return  <div>
                <SearchBar searched={searched}/>
                <Order searched={searched}/>
                <Dogs searched={searched} />
            </div>
    
}
