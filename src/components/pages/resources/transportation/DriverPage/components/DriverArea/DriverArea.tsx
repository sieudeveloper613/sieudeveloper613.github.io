import { useState, useEffect } from "react";
import useDriverStore from "../../useDriverStore";
import DataTable from "../../../../../../common/DataTable";
import SearchBar from "../../../../../../common/SearchBar";

export interface IDriverAreaProps { }

export default function DriverArea(props: IDriverAreaProps) {
    const {
        resData,
        dataSheet,
        lengthList,
        searchInput,
        setSearchInput,
        handlerBtnCreateClick,
        handlerBtnRemoveClick,
        handlerBtnUpdateClick,
        handlerBtnSearchClick,
    } = useDriverStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const TITLE = "Thông tin tài xế";
    const NUMBER_ROW_CONFIG = "default";
    const HEADER_CELLS = ["Tên tài xế", "Số điện thoại"];
    const COLUMN_CELLS_WIDTH = ["width: calc(50%)", "width: calc(50%)"]; 

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
                placeholder="Nhập tên tài xế, số điện thoại..." 
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
                displayButtons={{ remove: true, update: true }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
            />
        </div>
    );
}
