import * as React from 'react';
import api from '../../../../../../../api';
import { useAppDispatch } from '../../../../../../../redux/hooks';
import Pagingreducer from '../../../../../../../redux/Paging/Paging';
import make from '../../../../../../../utils/make';
import { IDataTableProps, ITableCell } from '../../../../DataTable';
import styles from './RowsPerPage.module.scss';

export interface IRowsPerPageProps  {
    className?: string;
    rowsPerPageOptions: number[];
    data: ITableCell[];
}

export default function RowsPerPage(props: IRowsPerPageProps) {
    const [rows, setRows] = React.useState(10);
    const dispatch = useAppDispatch();

    const handleChange = (evt: any) => {
        setRows(evt.target.value);
    };

    React.useEffect(() => {
        dispatch(Pagingreducer.actions.Pagingrow({row: rows, data: props.data}));
    }, [rows]);

    const options = props.rowsPerPageOptions.map((item) => {
        return (
            <option key={item} value={item}>
                {item}
            </option>
        );
    });
    return (
        <div className={make.className([styles['rows-per-pages'], props.className])}>
            <div className={styles['label']}>Hàng mỗi trang</div>
            <select className={styles['selection']} onChange={handleChange}>
                {options}
            </select>
        </div>
    );
}