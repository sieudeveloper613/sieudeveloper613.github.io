import { useEffect, useState } from "react";
import DataTable from "../../../../../../../common/DataTable";
import SearchBar from "../../../../../../../common/SearchBar";
import usePartnerStore from "../../usePartnerStore";

function PartnerArea() {
    const {
        resData,
        dataSheet,
        lengthList,
        searchInput,
        setSearchInput,
        handlerBtnCreateClick,
        handlerBtnRemoveClick,
        handlerBtnSearchClick
    } = usePartnerStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const TITLE = "Thông tin đối tác";
    const NUMBER_ROW_CONFIG = "default";
    const LIST_CELLS = ["Tên doanh nghiệp", "Địa chỉ", "Mã số thuế"];
    const LIST_CELLS_WIDTH = ["width: calc(40%)", "width: calc(40%)", "width: calc(20%)"];

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
                placeholder={"Nhập tên, số điện thoại hoặc email"} 
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
                headerCells={LIST_CELLS}
                columnWidth={LIST_CELLS_WIDTH}
                displayButtons={{ remove: true }}
                numberRowConfig={NUMBER_ROW_CONFIG}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
            />
        </>
    );
}

export default PartnerArea;
