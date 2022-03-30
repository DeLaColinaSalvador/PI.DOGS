import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASCENDENTE, DESCENDENTE , W_ASCENDENTE , W_DESCENDENTE , ALL , EXISTENT , CREATED} from "../const/sort";
import { SortName, SortWeight, fetchDogs } from "../store/actions";
import s from '../styles/order.module.css'

export default function Order (props){
    const dispatch = useDispatch();
    const [orderN,setOrderN] = useState('')
    const [orderW,setOrderW] = useState('')
    const [typeofDogs,setTypeofDogs] = useState(ALL)
    const [selectedTemperaments,setTemperaments] = useState([])
    const [condition,setCondition] = useState(false)

    let temperaments = useSelector((state) => state.temperaments)

    useEffect(() => {
        dispatch(SortName(orderN))
    }, [orderN])

    useEffect(() => {
        dispatch(SortWeight(orderW))
    }, [orderW])

    useEffect(()=>{
        dispatch(fetchDogs(typeofDogs,condition,selectedTemperaments))
        if (selectedTemperaments.length===0){
            setCondition(false)
        }
    }, [selectedTemperaments,condition,typeofDogs])

    function onSelectChangeN(e){
        props.paginado(1)
        setOrderN(e.target.value)
    }

    function onSelectChangeW(e){
        props.paginado(1)
        setOrderW(e.target.value)
    }

    function onSelectChangeD(e){
        props.paginado(1)
        setTypeofDogs(e.target.value)
    }
    
    function onSelectChangeT(e){
        props.paginado(1)
        let indexOf = selectedTemperaments.indexOf(e.target.value)
        setCondition(true)
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
    return  <div className={s.mainDiv}>
                <select className={s.select} name='typeofDog' onChange={onSelectChangeD}>
                    <option value={ALL}>Todos</option>
                    <option value={EXISTENT}>Existentes</option>
                    <option value={CREATED}>Creados</option>
                </select>
                <select name='selectN' onChange={onSelectChangeN}>
                    <option value={DESCENDENTE}> ↓ Nombre </option>
                    <option value={ASCENDENTE}> ↑ Nombre </option>
                </select>
                <select name='selectW' onChange={onSelectChangeW}>
                    <option value=''>Ordenar por peso</option>
                    <option value={W_DESCENDENTE}> ↑ Peso</option>    
                    <option value={W_ASCENDENTE}> ↓ Peso</option>
                </select>
                <select name="temperamentFilter" onChange={onSelectChangeT} multiple={true}>
                    {temperaments ? temperaments.map(makeOption) : <option>loading</option>}
                </select>
            </div>
}