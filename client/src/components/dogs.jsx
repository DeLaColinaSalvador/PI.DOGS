import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchDogs } from "../store/actions";
import Dog from './dog';
import ReactPaginate from 'react-paginate'

export default function Dogs() {
    let dogs = useSelector((state) => state.dogs)
    console.log(dogs)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDogs())
    }, [])

    const [pageNumber, setPageNumber] = useState(0);
    const dogsPerPage = 8;
    const pagesVisited = pageNumber * dogsPerPage;


    const displayDogs = dogs.slice(pagesVisited, pagesVisited + dogsPerPage).map(dog => {
        return <Dog 
            dog={dog}
            key={dog.id}/>
    });

    const pageCount = Math.ceil(dogs.length / dogsPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    return <div>
        {displayDogs}
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'paginationBttns'}
            previousLinkClassName={'previousBttn'}
            nextLinkClassName={'nextBttn'}
            disabledClassName={'paginationDisabled'}
            activeClassName={'paginationActive'}
            pageRangeDisplayed={10}
            marginPagesDisplayed={1}
        />
    </div>
}