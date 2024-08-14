import { useState, useEffect } from "react";
import { useVehicleStore } from "../useVehicleStore";
import DataTable from "../../../../../common/DataTable";
import SearchBar from "../../../../../common/SearchBar";

const VehicleArea = () => {
    const {
        resData,
        dataSheet,
        lengthList,
        searchInput,
        setSearchInput,
        handlerBtnCreateClick,
        handlerBtnUpdateClick,
        handlerBtnRemoveClick,
        handlerBtnSearchClick,
    } = useVehicleStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const TITLE = "Thông tin xe";
    const NUMBER_ROW_CONFIG = "default";
    const HEADER_CELLS = ["Biển số xe", "Loại xe", "Email"];
    const COLUMN_CELLS_WIDTH = ["width: calc(25%)", "width: calc(25%)", "width: calc(50%)"];

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
        if (!!resData) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }
    }, [resData]);

    return (
        <>
            <SearchBar
                placeholder="Nhập biển số, số điện thoại hoặc Email..."
                input={searchInput}
                setInput={setSearchInput}
                handleButtonClick={handlerBtnSearchClick}
            />
            <DataTable
                title={TITLE}
                data={dataSheet}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                lengthList={lengthList}
                headerCells={HEADER_CELLS}
                columnWidth={COLUMN_CELLS_WIDTH}
                numberRowConfig={NUMBER_ROW_CONFIG}
                displayButtons={{ create: true, remove: true, update: true }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
            />
        </>
    );
};

export default VehicleArea;
