/* components */
import SearchBar from "../../../../../../../common/SearchBar";
import DataTable from "../../../../../../../common/DataTable";

/* configurations */
import useAccessInfoManageStore from "../../useAccessInfoManageStore";

type IAccessInfoManageProps = {};

function AccessInfoManageArea(props: IAccessInfoManageProps) {
    // create store
    const {
        isLoading,
        collection,
        dataSheet,
        searchInput,
        setSearchInput,
        handleUpdateOpen,
        handleSearchListener,
    } = useAccessInfoManageStore();

    /** create constants */
    const MAX_WIDTH = "100%"
    const NUMBER_ROW_CONFIG = "default";
    const HEADER_CELLS = ["Tên sản phẩm"];
    const TITLE = "Quản lý thông tin truy xuất";
    const COLUMN_CELLS_WIDTH = ["width: calc(100%)"];

    return (
        <>
            <SearchBar 
                placeholder={"Nhập tên sản phẩm để tìm kiếm..."} 
                input={searchInput} 
                setInput={setSearchInput} 
                handleButtonClick={handleSearchListener} 
            />

            <DataTable
                title={TITLE}
                data={dataSheet}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                hiddenButtonCreate={true}
                headerCells={HEADER_CELLS}
                lengthList={collection.length}
                columnWidth={COLUMN_CELLS_WIDTH}
                numberRowConfig={NUMBER_ROW_CONFIG}
                displayButtons={{ update: true }}
                onButtonUpdateClick={handleUpdateOpen}
            />
        </>
    );
}

export default AccessInfoManageArea;
