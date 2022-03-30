import Dog from './dog.jsx'
import s from '../styles/dogs.module.css'

export default function Dogs(props) {
    return( 
        <div className={s.mainDiv}>
            {props.currentDogs.map((dog) => {
                return(
                        <Dog className={s.dog}
                            key={dog.id}
                            id={dog.id} 
                            name={dog.name} 
                            image={dog.image}
                            weightMin={dog.weightMin} 
                            weightMax={dog.weightMax} 
                            temperaments={dog.temperaments} >
                        </Dog>
                )
            })}
        </div>)
}