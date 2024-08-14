
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import Pagingreducer from '../../../../../redux/Paging/Paging';
import RowsPerPage from './components/RowsPerPage';

import styles from './Footer.module.scss';

export interface IFooterProps {
    from?: number;
    to?: number;
    total?: number;
    data: { _id: string; items: string[] }[];
    lengthList?:number
}



export default function Footer(props: IFooterProps) {
    const dispatch = useAppDispatch();
    const numberOfRowsRedux = useAppSelector((state) => state.paging.row);
    const [number,setNumber] = React.useState(1)
    React.useEffect(()=>{
        if(props.lengthList)
        setNumber(Math.ceil(props.lengthList / numberOfRowsRedux))
    },[props.lengthList,numberOfRowsRedux])
    React.useEffect(() => {
        setCurrentPage(1);
        setTotalPge(number);
    }, [number]);

    React.useEffect(()=>{
        setCurrentPage(1)
    },[numberOfRowsRedux])

    const handleFitstPage = () => {
        if (currentPage > 1) {
            setCurrentPage(1);
            return;
        }
        return 
    };

    const handleNextPage = () => {
        if (currentPage == totalPage) {
            return;
        }
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        if (currentPage == 1) {
            return;
        }
        setCurrentPage(currentPage - 1);
    };

    const handleLastPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(totalPage);
            return;
        }
        return
    };

    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPge] = React.useState(1);

    React.useEffect(() => {
        dispatch(Pagingreducer.actions.PagingByButton({ currentPage , data: props.data}));
    }, [currentPage, totalPage]);
    return (
        <div className={styles['footer']}>

            <RowsPerPage data = {props.data} className={styles['rows-per-page']} rowsPerPageOptions={[10, 20, 50]}  />

            <div>
                Đang xem {currentPage} đến {currentPage == totalPage ? currentPage : currentPage + 1} trong tổng số{' '}
                {totalPage} mục
            </div>
            <div className={styles['buttons']}>
                <button className={currentPage === 1 ? styles["non_touch"] : styles[""]} onClick={handleFitstPage}>keyboard_double_arrow_left</button>
                <button className={currentPage === 1 ? styles["non_touch"] : styles[""]} onClick={handlePrevPage}>keyboard_arrow_left</button>
                <button className={currentPage === totalPage ? styles["non_touch"] : styles[""]} onClick={handleNextPage}>keyboard_arrow_right</button>
                <button className={currentPage === totalPage ? styles["non_touch"] : styles[""]} onClick={handleLastPage}>keyboard_double_arrow_right</button>
            </div>
        </div>
    );
}