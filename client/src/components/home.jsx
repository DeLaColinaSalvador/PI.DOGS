import React, { useRef , useState} from "react";
import SearchBar from "./searchbar.jsx";
import Dogs from "./dogs.jsx";
import Order from "./order.jsx";
import Paginado from "./paginado.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchDogs, FetchTemperaments } from "../store/actions/index.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home (){
    
    //preload dogs
    const dispatch = useDispatch();
    let dogs = useSelector((state) => state.filteredDogs)

    // paginado
    const [pageNumber, setPageNumber] = useState(1);
    const dogsPerPage = useRef(8);
    const indexOfLastDog = pageNumber * dogsPerPage.current
    const indexOfFirstDog = indexOfLastDog - dogsPerPage.current
    const currentDogs = dogs.slice(indexOfFirstDog,indexOfLastDog)
    const paginado = (pageNumber) => {
        setPageNumber(pageNumber)
    }

    useEffect(() => {
        dispatch(fetchDogs());
        dispatch(FetchTemperaments())
    }, [dispatch])

    return  <div>
                <Link to='/add'>Añadir</Link>
                <SearchBar 
                    paginado={paginado}
                />
                <Order 
                    paginado={paginado}
                />
                <Dogs 
                    currentDogs={currentDogs}
                />
                <Paginado 
                    dogsPerPage={dogsPerPage} 
                    dogs={dogs.length} 
                    paginado={paginado}
                />
            </div>
    
}
