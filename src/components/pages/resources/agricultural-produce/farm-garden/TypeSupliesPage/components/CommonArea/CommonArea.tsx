import { useEffect, useState } from "react";
import { Self } from "../..";
import { ThreeDots } from "react-loader-spinner";
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
    const MAX_WIDTH = "100%"
    const NUMBER_ROW_CONFIG = "default"
    const HEADER_CELLS = ["Loại vật tư"];
    const TITLE = "Thông tin loại vật tư";
    const COLUMN_CELLS_WIDTH = ["width: calc(100%)"];

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
        <div style={{ position: "relative" }}>
            <SearchBar 
                placeholder="Nhập tên loại vật tư" 
                input={searchInput} 
                setInput={setSearchInput} 
                handleButtonClick={handlerBtnSearchClick} 
            />

            <DataTable
                title={TITLE}
                loading={isLoading}
                data={dataSheet}
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
        </div>
    );
}

export default CommonArea;
