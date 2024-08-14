import React from "react";

/* components */
import Header from "./components/Header";
import Footer from "./components/Footer/Footer";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody/TableBody";

/* configurations, utils */
import make from "../../../utils/make";
import { Circles } from "react-loader-spinner";
/* types */
import { INumberRowConfig } from ".";
import TCSSProperties from "../../../core/styles/TCSSProperties";

/* styles */
import styles from "./DataTable.module.scss";

export interface ITableCell {
    _id: string;
    items: string[];
    edit?: boolean,
    disableRemove?: boolean;
}

export interface IDataTableDisplayButtons {
    view?: boolean;
    reset?: boolean;
    remove?: boolean;
    create?: boolean;
    update?: boolean;
}

export interface IDataTableRadio {
    label: string;
    onClick?: (v: string) => any;
}

export interface IDataTableProps {
    lengthList?: number;
    maxHeight?: number | string;
    title?: string;
    loading?: boolean,
    minWidth?: string;
    maxWidth?: string,
    rowHeight?: string;
    viewColumnWidth?: string;
    titleOfColumnView?: string;
    titleOfColumnAction?: string;

    data: ITableCell[];
    headerCells: string[];
    radios?: IDataTableRadio[];
    columnWidth?: string | (string | undefined)[];

    displayButtons?: IDataTableDisplayButtons;
    numberRowConfig?: INumberRowConfig | "default";

    displayHeader?: boolean;
    displayFooter?: boolean;
    hiddenButtonCreate?: boolean;
    hideWhenDataIsEmpty?: boolean;

    onButtonCreateClick?: () => any;
    onButtonViewClick?: (_id: string) => any;
    onbuttonResetClick?: (_id: string) => any;
    onButtonUpdateClick?: (_id: string) => any;
    onButtonRemoveClick?: (_id: string) => any;
}

export default function DataTable(props: IDataTableProps) {

    const numberRowConfig = make.result(() => {
        if (!props.numberRowConfig) return undefined;

        const defaultConfig = {
            sortBy: "ascending",
            startWith: 1,
            step: 1,
            title: "STT",
            minWidth: "60px",
        } as Required<INumberRowConfig>;

        if (props.numberRowConfig === "default") return defaultConfig;

        return {
            ...defaultConfig,
            ...props.numberRowConfig,
        };
    });

    return (
        <div
            className={make.className([styles["data-table"], props.hideWhenDataIsEmpty && props.data.length === 0 && styles["hidden"]])}
            style={{ "--row-height": props.rowHeight || "48px" } as TCSSProperties}
        >
            {
                props.displayHeader !== false && (
                    <Header
                        title={props.title}
                        radios={props.radios}
                        hiddenButtonCreate={props.hiddenButtonCreate}
                        onButtonCreateClick={props.onButtonCreateClick}
                    />
                )
            }

            <div
                className={styles["table-container"]}
                style={
                    {
                        "--number-of-items": props.data.length,
                        "maxHeight": make.result(() => {
                            switch (typeof props.maxHeight) {
                                case "number": {
                                    return `calc(var(--row-height) * ${props.maxHeight + 1})`;
                                }
                                case "string": {
                                    return props.maxHeight;
                                }
                            }
                            return undefined;
                        }),
                    } as TCSSProperties
                }
            >
                <table className={styles["table"]} style={{ minWidth: props.minWidth, maxWidth: props.maxWidth }}>
                    <TableHeader
                        columnWidth={props.columnWidth}
                        headerCells={props.headerCells}
                        displayButtons={props.displayButtons}
                        titleOfColumnView={props.titleOfColumnView}
                        titleOfColumnAction={props.titleOfColumnAction}
                        viewColumnWidth={props.viewColumnWidth}
                        numberRowConfig={numberRowConfig}
                    />
                    {
                        props.loading ? (
                            <Circles
                                height="40"
                                width="40"
                                color="#ff4500"
                                ariaLabel="circles-loading"
                                wrapperStyle={{ display: "flex", justifyContent: "center", padding: "24px" }}
                                wrapperClass=""
                                visible={props.loading}
                            />
                        ) : (
                            <TableBody
                                data={props.data}
                                columnWidth={props.columnWidth}
                                displayButtons={props.displayButtons}
                                viewColumnWidth={props.viewColumnWidth}
                                onButtonUpdateClick={props.onButtonUpdateClick}
                                onButtonRemoveClick={props.onButtonRemoveClick}
                                onButtonViewClick={props.onButtonViewClick}
                                onButtonResetClick={props.onbuttonResetClick}
                                numberRowConfig={numberRowConfig}
                            />
                        )
                    }
                </table>
            </div>

            {props.displayFooter !== false && <Footer lengthList={props.lengthList} data={props.data} />}
        </div>
    );
}
