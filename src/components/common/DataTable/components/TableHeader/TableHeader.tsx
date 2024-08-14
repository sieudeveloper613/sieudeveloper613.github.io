import React from "react";
import { INumberRowConfig } from "../..";
import make from "../../../../../utils/make";
import styles from "./TableHeader.module.scss";
import preProcess from "../../../../../utils/preProcess";
import { IDataTableDisplayButtons } from "../../DataTable";
import TCSSProperties from "../../../../../core/styles/TCSSProperties";

export interface ITableHeaderProps {
    headerCells: string[];
    viewColumnWidth?: string;
    titleOfColumnView?: string;
    titleOfColumnAction?: string;
    displayButtons?: IDataTableDisplayButtons;
    numberRowConfig?: Required<INumberRowConfig>;
    columnWidth?: string | (string | undefined)[];
}

export default function TableHeader(props: ITableHeaderProps) {
    const numberRowElement = make.result(() => {
        const config = props.numberRowConfig;
        
        if (!config) return null;
        
        return (
            <th style={{ minWidth: config.minWidth, textAlign: "center" }}>{config.title}</th>
        ); 
    });

    const actionElement = make.result(() => {
        if (!props.displayButtons?.update && !props.displayButtons?.remove && !props.displayButtons?.reset) return null;

        return <th className={styles["update-remove"]} style={{ textAlign: "center" }}>{props.titleOfColumnAction || "Thao tác"}</th>;
    });

    const viewElement = make.result(() => {
        if (!props.displayButtons?.view) return null;

        return (
            <th className={styles["view"]} style={{ minWidth: props.viewColumnWidth, textAlign: "center" }}>
                {props.titleOfColumnView}
            </th>
        );
    });

    const element = make.result(() => {
        if (typeof props.columnWidth === "string") {
            return props.headerCells.map((item, index: number) => {
                return (
                    <th key={`${index}_${item}`} style={{ width: props.columnWidth as string }}>
                        {item}
                    </th>
                );
            });
        }

        // column width
        if (Array.isArray(props.columnWidth)) {
            return props.headerCells.map((item, i) => {
                const style = make.result(() => {
                    const v: string | undefined = (props.columnWidth as string[])[i];
                    if (!v) return undefined;
                    const cssItems = preProcess.removeAllSpace(v).split(";");

                    return cssItems.reduce((aggregate, item) => {
                        const itemSplit = item.split(":");

                        if (itemSplit.length === 1) {
                            aggregate.width = item;
                            return aggregate;
                        }

                        aggregate[itemSplit[0]] = itemSplit[1];
                        return aggregate;
                    }, {} as TCSSProperties);
                });
                
                return (
                    <th key={`${i}_${item}`} style={style}>
                        {item}
                    </th>
                );
            });
        }

        return props.headerCells.map((item, i) => {
            return <th key={`${i}_${item}`}>{item}</th>;
        });
    });

    return (
        <thead className={styles["table-head"]}>
            <tr>
                {numberRowElement}
                {element}
                {viewElement}
                {actionElement}
            </tr>
        </thead>
    );
}
