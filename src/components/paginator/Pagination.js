import React from 'react';
import { useNavigation } from './Navigation';
import { DOTS } from '../../constants/configs';
import './Pagination.scss';

const Pagination = (props) => {

    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;
    const paginationRange = useNavigation({ currentPage, totalCount, siblingCount, pageSize });
    let lastPage = paginationRange[paginationRange.length - 1];

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };


    return (
        <ul className="pagination-container">
            <li className={`pagination-item ${currentPage === 1 && 'disabled'}`} onClick={onPrevious}>
                <div className="arrow left" />
            </li>
            {
                paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li key={`pg-${pageNumber}-${index}`} className="pagination-item dots">&#8230;</li>;
                    }
                    return (
                        <li key={`pg-${pageNumber}-${index}`} className={`pagination-item ${pageNumber === currentPage && 'selected'}`} onClick={() => onPageChange(pageNumber)}>
                          {pageNumber}
                        </li>
                    );
                })
            }
            <li className={`pagination-item ${currentPage === lastPage && 'disabled'}`} onClick={onNext}>
                <div className="arrow right" />
            </li>
        </ul>
    )

}

export default Pagination;