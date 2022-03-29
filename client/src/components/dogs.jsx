import { Link } from "react-router-dom";
import Dog from './dog.jsx'

export default function Dogs(props) {
    return( 
        <div>
            {props.currentDogs.map((dog) => {
                return(
                        <Dog 
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