import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import Dog from './dog';
import ReactPaginate from 'react-paginate'

export default function Dogs(props) {

    let dogs = useSelector((state) => state.filteredDogs)

    useEffect(()=>{
        console.log('rerender dogs')
    }, [dogs])

    const [pageNumber, setPageNumber] = useState(0);
    const dogsPerPage = 8;
    const pagesVisited = pageNumber * dogsPerPage;
    let displayDogs,pageCount,changePage


    if (props.searched.current){
        props.searched.current = false;
        setPageNumber(0)
    }
    
    if (dogs)
        {displayDogs = dogs.slice(pagesVisited, pagesVisited + dogsPerPage).map(dog => {
        return <Dog 
            dog={dog}
            key={dog.id}/>
            });
        pageCount = Math.ceil(dogs.length / dogsPerPage)
        changePage = ({selected}) => {
            setPageNumber(selected)
            }
        }

    

    return( 
        <div>
            {displayDogs && <div>
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
            </div>}
        </div>)
}