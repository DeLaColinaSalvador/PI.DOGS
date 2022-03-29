import s from '../styles/dog.module.css'

export default function Dog({dog}){
    return <div>
        <h3>{dog.name}</h3>
            <img className={s.image} src={dog.image} alt='imagen'/>
            <ul>
                <li>Peso : {dog.weightMin}kg - {dog.weightMax}kg</li>
                <li>Temperamento : {dog.temperaments}</li>
            </ul>
    </div>
}