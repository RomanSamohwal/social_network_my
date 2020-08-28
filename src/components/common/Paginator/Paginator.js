import React, {useState} from 'react';
import styles from "./Paginator.module.css";

const Paginator = ({totalItemCount,pageSize,currentPage,onPageChanged,portionSize=10}) => {
    {
        let pagesCount = Math.ceil(totalItemCount / pageSize);
        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        let portionCount = Math.ceil(pagesCount / portionSize);
        let [portionNumber, setPortionNumber] = useState(1);
        let leftPositionPageNumber = (portionNumber - 1) * portionSize + 1;
        let rightPositionPageNumber = portionNumber * portionSize

        return (
                <div className={styles.paginator}>
                    {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
                    {pages.filter(p => p >= leftPositionPageNumber && p <= rightPositionPageNumber)
                        .map(p =>
                            <span className={currentPage === p && styles.selectedPages}
                                  onClick={(e) => onPageChanged(p)}>{p + " "}</span>
                    )}
                    {portionCount > portionNumber &&
                    <button onClick={() => setPortionNumber(portionNumber+1)}>Next</button>}
                </div>
        );
    }
};

export default Paginator;