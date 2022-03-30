import React from "react";
import s from '../styles/paginado.module.css'

export default function Paginado ({dogsPerPage, dogs , paginado}){
    const pageNumbers = []
    for (let i = 1; i<= Math.ceil(dogs/dogsPerPage.current); i++){
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className={s.paginado}>
                {pageNumbers &&
                pageNumbers.map(number => {
                    return (
                    <li className={s.number} key={number}>
                        <a onClick={()=>{paginado(number)}}>{number}</a>
                    </li>)
                })}
            </ul>
        </nav>
    )
}