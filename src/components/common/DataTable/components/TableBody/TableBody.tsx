import React from "react";
import { INumberRowConfig } from "../..";
import make from "../../../../../utils/make";
import styles from "./TableBody.module.scss";
import { ITableCell } from "../../DataTable";
import { IDataTableDisplayButtons } from "../../DataTable";
import { useAppSelector } from "../../../../../redux/hooks";
import preProcess from "../../../../../utils/preProcess";
import TCSSProperties from "../../../../../core/styles/TCSSProperties";

export interface ITableBodyProps {
    data: ITableCell[];
    viewColumnWidth?: string;
    displayButtons?: IDataTableDisplayButtons;
    numberRowConfig?: Required<INumberRowConfig>;
    columnWidth?: string | (string | undefined)[];
    onButtonViewClick?: (_id: string) => any;
    onButtonResetClick?: (_id: string) => any;
    onButtonUpdateClick?: (_id: string) => any;
    onButtonRemoveClick?: (_id: string) => any;
}

export default function TableBody(props: ITableBodyProps) {
    const { row: numberOfRowsRedux, currentPage: currentPage } = useAppSelector((state) => state.paging);

    const [numberOfRows, setNumberOfRows] = React.useState(10);
    React.useEffect(() => {
        setNumberOfRows(numberOfRowsRedux);
    }, [numberOfRowsRedux]);

    const handlerButtonUpdateClick = (_id: string) => () => {
        if (props.onButtonUpdateClick) props.onButtonUpdateClick(_id);
    };

    const handlerButtonRemoveClick = (_id: string) => () => {
        if (props.onButtonRemoveClick) props.onButtonRemoveClick(_id);
    };

    const handlerButtonViewClick = (_id: string) => () => {
        if (props.onButtonViewClick) props.onButtonViewClick(_id);
    };

    const handlerButtonResetClick = (_id: string) => () => {
        if(props.onButtonResetClick) props.onButtonResetClick(_id);
    }

    const renderViewButton = (_id: string) => {
        if (!props.displayButtons?.view) return null;

        return (
            <td className={styles["view"]} style={{ minWidth: props.viewColumnWidth }}>
                <div>
                    <button
                        type="button"
                        style={{ color: "#0844A4" }}
                        onClick={handlerButtonViewClick(_id)}
                    >
                        visibility
                    </button>
                </div>
            </td>
        );
    };

    const renderUpdateRemoveButtons = (_id: string, disableRemove: boolean) => {
        if (!props.displayButtons?.update && !props.displayButtons?.remove && !props.displayButtons?.reset ) return null;

        const buttonUpdate = make.result(() => {
            if (!props.displayButtons?.update) return null;

            return (
                <button type="button" style={{ color: "#0B58CF" }} onClick={handlerButtonUpdateClick(_id)}>
                    edit
                </button>
            );
        });

        const buttonReset = make.result(() => {
            if (!props.displayButtons?.reset) return null;

            return(
                <button type={"button"} style={{ color: "#0B58CF" }} onClick={handlerButtonResetClick(_id)}>
                    restart_alt
                </button>
            )
        })

        const buttonRemove = make.result(() => {
            if (!props.displayButtons?.remove) return null;

            if (disableRemove) return (
                <div style={{ width: "30px", height: "30px" }}></div>
            )
            return (
                <button type="button" style={{ color: "#72BB53" }} onClick={handlerButtonRemoveClick(_id)}>
                    delete
                </button>
            );
        });

        return (
            <td className={styles["update-remove"]}>
                <div>
                    {buttonReset}
                    {buttonUpdate}
                    {buttonRemove}
                </div>
            </td>
        );
    };

    const renderCells = (cells: string[]) => {
        if (typeof props.columnWidth === "string") {
            return cells.map((item, index: number) => {
                return (
                    <td key={`${index}_${item}`} style={{ width: props.columnWidth as string }}>
                        {item}
                    </td>
                );
            });
        }

        // column width
        if (Array.isArray(props.columnWidth)) {
            return cells.map((item, i) => {
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
                    <td key={`${i}_${item}`} style={style}>
                        {item}
                    </td>
                );
            });
        }

        return cells.map((item, i) => {
            return <td key={`${i}_${item}`}>{item}</td>;
        });
    };

    const renderNumberRow = (i: number) => {
        const config = props.numberRowConfig;
        if (!config) return null;

        const n = make.result(() => {
            if (config.sortBy === "ascending") {
                return config.startWith + i * config.step + (currentPage - 1) * numberOfRows;
            }

            return config.startWith - i * config.step + (currentPage - 1) * numberOfRows;
        });

        return (
            <td key={n} style={{ minWidth: config.minWidth, textAlign: "center" }}>{n}</td> 
        );
    };

    const rows = props.data.map((row: any, i: number) => {
        return (
            <tr key={row._id} className={styles["row"]}>
                {renderNumberRow(i)}
                {renderCells(row.items)}
                {renderViewButton(row._id)}
                {renderUpdateRemoveButtons(row._id, row.disableRemove)}
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}