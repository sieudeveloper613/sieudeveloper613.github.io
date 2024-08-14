import { useState, useEffect } from "react";
import { Self } from "../..";
import DataTable from "../../../../../../../common/DataTable";
import useCommonStore from "../../useCommonStore";
import { ThreeDots } from "react-loader-spinner";
import SearchBar from "../../../../../../../common/SearchBar";

type ICommonProps = {};

const listCells = ["Tên Nhà cung cấp", "Địa chỉ", "Mã số thuế"];

function CommonArea(props: ICommonProps) {
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
    const NUMBER_ROW_CONFIG = "default";
    const TITLE = "Thông tin nhà cung cấp";
    const HEADER_CELLS = ["Tên Nhà cung cấp", "Địa chỉ", "Mã số thuế"];
    const COLUMN_CELLS_WIDTH = ["width: calc(35%)", "width: calc(50%)", "width: calc(15%)"];

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
                placeholder="Nhập tên hoặc mã số thuế..." 
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
