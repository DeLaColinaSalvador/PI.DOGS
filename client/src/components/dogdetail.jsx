import axios from 'axios';
import { useState } from 'react'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import s from '../styles/dogdetail.module.css'

export default function DogDetail(){
    const [dog,setDog] = useState(null);
    let {id} = useParams()

    useEffect(() => {
       async function fetchData(){
            try {
                console.log('here')
                await axios.get('http://localhost:3001/api/dogs/'+id)
                .then((response) => {
                    console.log('here')
                    setDog(response.data)
                })

                return () => {
                    setDog(null)
                }
            }
            catch(error){
                console.log(error)
            }
        };
        fetchData()
    }, [] )
    console.log(dog)
    return <div className={s.mainDiv}>
        {
            dog ?
            <>
            <h3 className={s.name}>{dog.name}</h3>
            <img className={s.image} src={dog.image} alt='imagen'/>
            <ul className={s.ul}>
                <li className={s.li}>Peso : {dog.weightMin}kg - {dog.weightMax}kg</li>
                <li className={s.li}>Altura : {dog.heightMin}cm - {dog.heightMax}cm</li>
                <li className={s.li}>Expectativa de vida : {dog.life_span}</li>
                <li className={s.li}>Temperamento : {dog.temperaments}</li>
            </ul>
            </> :
            <div>loading</div>
        }
    </div>
}