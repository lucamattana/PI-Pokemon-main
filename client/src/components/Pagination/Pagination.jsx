import React from "react";
import './Pagination.css'

const Pagination = ({pokemonsPerPage, totalPokemons, currentPage, paginate, prevPage, nextPage}) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <ul className="pagination">
                <li onClick={prevPage} className="page-number">{'<'}</li>
                {pageNumbers.map((number) => (
                    <li 
                    key={number} 
                    onClick={() => paginate(number)}
                    className={'page-number ' + (number === currentPage ? 'active' : '')}>
                        {number}
                    </li>
                ))}
                <li onClick={nextPage} className="page-number">{'>'}</li>
            </ul>
        </div>
    )
};

export default Pagination;