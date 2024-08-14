import React from "react";
import make from "../../../../../../utils/make";
import styles from "./TableComponent.module.scss";
import { ITableCell } from "../../../../../common/DataTable";
import TCSSProperties from "../../../../../../core/styles/TCSSProperties";

export interface ITableComponentProps {
    width?: string;
    title?: string;
    data: ITableCell[];
    headerCells: string[];
    onButtonViewDetail?: (id: string) => void
}

export default function TableComponent(props: ITableComponentProps) {

    // create variables
    let rows: any;

    const elments = make.result(() => {
        return props.headerCells.map((item, index) => {
            return <th key={`${index}`}>{item}</th>;
        });
    });

    const handlerViewDetail = (_id: string) => () => {
        if (props.onButtonViewDetail) return props.onButtonViewDetail(_id);
    };

    
    if (props.data.length === 0) {
        rows = <div></div>;
    } else {
        rows = props.data.map((row: any, index: number) => {
            return (
                <tr key={`${index}`} className={styles["row"]}>
                    {
                        row.items.map((item: any, mIndex: number) => {
                            if(props.title === "Thu hoạch (Nhập kho)" && props.headerCells[index] === "Chi tiết"){
                                return (
                                    <td className={styles["view"]} key={`${mIndex}`}>
                                        <div>
                                            <button type="button" style={{ color: "#0844A4" }} onClick={handlerViewDetail(item)}>
                                                visibility
                                            </button>
                                        </div>
                                    </td>
                                )
                            }
                            return <td key={`${mIndex}`}>{item}</td>;
                        })
                    }
                </tr>
            );
        });
    }

    return (
        <div className={styles["table-statis-container"]} style={{"--table-width": props.width || "100%"} as TCSSProperties}>
            <table className={styles["table"]}>
                <thead className={styles["table-head"]}>
                    {
                        props.title && (
                            <tr>
                                <th colSpan={elments.length}>{props.title}</th>
                            </tr>
                        )
                    }
                    <tr>{elments}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
