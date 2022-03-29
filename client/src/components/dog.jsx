import s from '../styles/dog.module.css'
import {Link} from 'react-router-dom'

export default function Dog({id, name, image , temperaments , weightMin , weightMax}){
    return <div>
                <h3><Link to={'/detail/'+id}>{name}</Link></h3>
                <img className={s.image} src={image} alt='imagen'/>
                <ul>
                    <li>Peso : {weightMin}kg - {weightMax}kg</li>
                    <li>Temperamento : {temperaments}</li>
                </ul>
    </div>
}