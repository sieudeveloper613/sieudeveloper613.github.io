/* components */
import SearchBar from "../../../../../common/SearchBar";

/* configurations */
import useSSCCStore from "../../useSSCCStore";
import DataTable from "../../../../../common/DataTable";

const Main = () => {
    const { 
        isLoading,
        collection,
        handleSearch, 
        search, setSearch, 
        formatedCollection, 
        handleDisplayingLifeCycle, 
        handleDisplayingCreatingForm, 
        handleDisplayingResetingAlert 
    } = useSSCCStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const VIEW_WIDTH = "200px"
    const ACTION_TITLE = "Reset";
    const TITLE = "Thông Tin SSCC";
    const HEADER_CELLS = ["Mã SSCC", "Trạng thái"];
    const VIEW_TITLE = "Xem vòng đời";
    const NUMBER_ROW_CONFIG = "default";
    const COLUMN_CELLS_WIDTH = ["width: calc(70%)", "width: calc(30%)"];
    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <SearchBar 
                placeholder={"Nhập mã sscc để tìm kiếm"} 
                input={search} 
                setInput={setSearch} 
                handleButtonClick={handleSearch} 
            />

            <DataTable
                title={TITLE}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                headerCells={HEADER_CELLS}
                data={formatedCollection}
                viewColumnWidth={VIEW_WIDTH}
                titleOfColumnView={VIEW_TITLE} 
                columnWidth={COLUMN_CELLS_WIDTH}
                titleOfColumnAction={ACTION_TITLE} 
                numberRowConfig={NUMBER_ROW_CONFIG}
                lengthList={collection!.length || 0}
                displayButtons={{ reset: true, view: true }}
                onButtonViewClick={handleDisplayingLifeCycle}
                onButtonCreateClick={handleDisplayingCreatingForm}
                onbuttonResetClick={handleDisplayingResetingAlert}
            />
        </div>
    )
}

export default Main;