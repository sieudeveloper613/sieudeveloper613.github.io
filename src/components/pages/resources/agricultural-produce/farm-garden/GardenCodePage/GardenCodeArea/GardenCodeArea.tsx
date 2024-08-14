import { useState, useEffect } from "react";
import { ThreeDots } from "react-loader-spinner";
import useGardenCodeStore from "../useGardenCodeStore";
import DataTable from "../../../../../../common/DataTable";

export interface IGardenCodeAreaProps { }

export default function GardenCodeArea(props: IGardenCodeAreaProps) {
    const {
        dataSheet,
        collection,
        handlerBtnViewClick,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnRemoveClick,
    } = useGardenCodeStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const VIEW_TITLE = "Mã QR";
    const VIEW_WIDTH = "200px";
    const TITLE = "Thông tin khu vườn";
    const HEADER_CELLS = ["Mã khu vườn", "Tên khu vườn"];
    const COLUMN_CELLS_WIDTH = ["width: calc(50%)", "width: calc(50%)"];
    const NUMBER_ROW_CONFIG = "default";

    /** create state */
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!!dataSheet && dataSheet.length) {
            setIsLoading(false);
        } else if (dataSheet.length === 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else setIsLoading(true);
    }, [dataSheet]);

    useEffect(() => {
        if (!!collection) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }, [collection]);

    return (
        <>
            <div style={{ height: 16 }} />
            <DataTable
                title={TITLE}
                data={dataSheet}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                headerCells={HEADER_CELLS}
                viewColumnWidth={VIEW_WIDTH}
                titleOfColumnView={VIEW_TITLE}
                lengthList={collection.length}
                columnWidth={COLUMN_CELLS_WIDTH}
                numberRowConfig={NUMBER_ROW_CONFIG}
                displayButtons={{ remove: true, update: true, view: true }}
                onButtonViewClick={handlerBtnViewClick}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
            />
        </>
    );
}
