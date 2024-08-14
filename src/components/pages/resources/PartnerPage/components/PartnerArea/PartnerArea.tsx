import { useEffect, useState } from "react";
import DataTable from "../../../../../common/DataTable";
import usePartnerStore from "../../usePartnerStore";
import { ThreeDots } from "react-loader-spinner";
import SearchBar from "../../../../../common/SearchBar";

interface IPartnerAreaProps { }

const listCells = ["Tên doanh nghiệp", "Loại đối tượng", "Tên đối tượng", "Địa chỉ"];

function PartnerArea(props: IPartnerAreaProps) {
    const {
        dataSheet,
        resData,
        lengthList,
        handlerBtnCreateClick,
        handlerBtnRemoveClick,
        handlerBtnUpdateClick,
        searchInput,
        setSearchInput,
        handlerBtnSearchClick,
    } = usePartnerStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const TITLE = "Quản lý đối tác";
    const NUMBER_ROW_CONFIG = "default";
    const HEADER_CELLS = ["Tên doanh nghiệp", "Loại đối tượng", "Tên đối tượng", "Địa chỉ"];
    const COLUMN_CELLS_WIDTH = ["minWidth: 220px", "minWidth: 200px", "minWidth: 240px", "minWidth: 320px"];

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
                placeholder="Nhập tên DN, Số điện thoại hoặc Email..." 
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
                displayButtons={{ update: false, remove: true }}
                onButtonCreateClick={handlerBtnCreateClick}
                onButtonRemoveClick={handlerBtnRemoveClick}
                onButtonUpdateClick={handlerBtnUpdateClick}
            />
        </>
    );
}

export default PartnerArea;
