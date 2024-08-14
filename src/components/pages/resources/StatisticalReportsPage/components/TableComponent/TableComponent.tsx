import * as React from 'react';
import TCSSProperties from '../../../../../../core/styles/TCSSProperties';
import make from '../../../../../../utils/make';
import { ITableCell } from '../../../../../common/DataTable';

import styles from './TableComponent.module.scss';

type Split = {
    groupBy: string;
    elements: string[];
};
export interface ITableComponentProps {
    title?: string;
    headerCells: (string | Split)[];
    data: ITableCell[];
    width?: string;
}

export default function TableComponent(props: ITableComponentProps) {
    const elments = make.result(() => {
        return props.headerCells.map((item, index) => {
            if (typeof item === 'string')
                return (
                    <th key={`${index}hfdfdjdshfd`} rowSpan={2}>
                        {item}
                    </th>
                );
            else {
                return <th colSpan={item.elements.length}>{item.groupBy}</th>;
            }
        });
    });

    const elmentsExtend = make.result(() => {
        return props.headerCells.map((item) => {
            if (typeof item === 'string') return null;
            else {
                return item.elements.map((el, i) => <th key={`${i}aaaaaa`}>{el}</th>);
            }
        });
    });

    let rows;
    if (props.data.length === 0) {
        rows = <div></div>;
    } else {
        rows = props.data.map((row) => {
            return (
                <tr key={row._id} className={styles['row']}>
                    {row.items.map((item,index) => {
                        return <td key={`${item}_${index}`}>{item}</td>;
                    })}
                </tr>
            );
        });
    }

    return (
        <div
            className={styles['table-statis-container']}
            style={
                {
                    '--table-width': props.width || '100%',
                } as TCSSProperties
            }
        >
            <table className={styles['table']}>
                <thead className={styles['table-head']}>
                    {props.title ? (
                        <tr>
                            <th colSpan={elments.length}>{props.title}</th>
                        </tr>
                    ) : null}
                    <tr>{elments}</tr>
                    <tr>{elmentsExtend}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
