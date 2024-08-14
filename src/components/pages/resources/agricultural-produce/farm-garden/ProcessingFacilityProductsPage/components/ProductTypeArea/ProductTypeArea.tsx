import React from "react";
import useProductTypeStore from "../../useProductTypeStore";
import DataTable from "../../../../../../../common/DataTable";
import SearchBar from "../../../../../../../common/SearchBar";

function ProductTypeArea() {
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
    } = useProductTypeStore();

    const MAX_WIDTH = "100%";
    const NUMBER_ROW_CONFIG = "default";
    const TITLE = "Sản phẩm cơ sở chế biến";
    const HEADER_CELLS = ["Tên sản phẩm", "Loại sản phẩm", "Mã GTIN"];
    const COLUMN_CELLS_WIDTH = ["width: calc(35%)", "width: calc(40%)", "width: calc(25%)"]

    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        if (!!dataSheet && dataSheet.length) {
            setIsLoading(false);
        } else if (dataSheet.length === 0) {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        } else setIsLoading(true);
    }, [dataSheet]);
    React.useEffect(() => {
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
                placeholder="Nhập mã, tên sản phẩm..." 
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
                displayButtons={{ update: true, remove:true }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
            />
        </>
    );
}

export default ProductTypeArea;
