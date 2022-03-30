import s from '../styles/dog.module.css'
import {Link} from 'react-router-dom'

export default function Dog({id, name, image , temperaments , weightMin , weightMax}){
    return <div className={s.mainDiv}>
                <h3><Link to={'/detail/'+id} className={s.name} >{name}</Link></h3>
                <img className={s.image} src={image} alt='imagen'/>
                <ul className={s.ul}>
                    <li className={s.li}>Peso : {weightMin}kg - {weightMax}kg</li>
                    <li className={s.li}>Temperamento : {temperaments}</li>
                </ul>
    </div>
}