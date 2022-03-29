import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ASCENDENTE, DESCENDENTE , W_ASCENDENTE , W_DESCENDENTE } from "../const/sort";
import { SortName, SortWeight } from "../store/actions";

export default function Order (props){
    const dispatch = useDispatch();
    const [orderN,setOrderN] = useState('')
    const [orderW,setOrderW] = useState('')


    useEffect(() => {
        dispatch(SortName(orderN))
    }, [orderN])

    useEffect(() => {
        dispatch(SortWeight(orderW))
    }, [orderW])

    function onSelectChangeN(e){
        props.searched.current = true
        console.log(e.target.value)
        setOrderN(e.target.value)
        console.log('select N')
    }

    function onSelectChangeW(e){
        props.searched.current = true
        console.log(e.target.value)
        setOrderW(e.target.value)
        console.log('select W')
    }

    return  <div>
                <select name='selectN' onChange={onSelectChangeN}>
                    <option value=''>Ordenar alfabeticamente</option>
                    <option value={DESCENDENTE}> ↓ Nombre </option>
                    <option value={ASCENDENTE}> ↑ Nombre </option>
                </select>
                <select name='selectW' onChange={onSelectChangeW}>
                    <option value=''>Ordenar por peso</option>
                    <option value={W_DESCENDENTE}> ↓ Peso</option>    
                    <option value={W_ASCENDENTE}> ↑ Peso</option>
                </select>
            </div>
}