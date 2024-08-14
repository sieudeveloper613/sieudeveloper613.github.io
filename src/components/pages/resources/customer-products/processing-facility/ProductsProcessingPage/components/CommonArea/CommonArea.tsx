import { useState, useEffect } from "react";
import useCommonStore from "../../useCommonStore";
import DataTable from "../../../../../../../common/DataTable";
import SearchBar from "../../../../../../../common/SearchBar";


function CommonArea() {
    const { 
        resData, 
        dataSheet, 
        lengthList, 
        searchInput, 
        setSearchInput, 
        handlerBtnSearchClick, 
        handlerBtnCreateClick, 
        handlerBtnUpdateClick, 
        handlerBtnRemoveClick 
    } = useCommonStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const TITLE = "Thông tin sản phẩm";
    const NUMBER_ROW_CONFIG = "default";
    const HEADER_CELLS = ["Tên sản phẩm", "Loại sản phẩm", "Mã GTIN sản phẩm"]
    const COLUMN_CELLS_WIDTH =["width: calc(30%)", "width: calc(40%)", "width: calc(30%)"] 

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
                placeholder="Nhập tên hoặc mã GTIN của sản phẩm" 
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
                displayButtons={{ update: true, remove: true }}
                onButtonUpdateClick={handlerBtnUpdateClick}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
            />
        </>
    );
}

export default CommonArea;
