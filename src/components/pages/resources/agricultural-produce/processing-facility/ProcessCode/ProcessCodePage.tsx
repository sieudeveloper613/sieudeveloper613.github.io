/* components */
import SearchBar from "../../../../../common/SearchBar";
import DataTable from "../../../../../common/DataTable";

/* configurations */
import useProcessCodeStore from "./useProcessCodeStore";

const ProcessCodePage = () => {
    const {
        search,
        isLoading,
        formatedProcessCodeCollection,
        setSearch,
        handleEditFormOpen,
        handleRemoveConfirm,
        handleSearchListener,
        handleCreatingFormOpen,
        handleLifeCycleViewOpen,
    } = useProcessCodeStore();

    /** create constants */
    const TITLE = "Thông tin mã quy trình";
    const MAX_WIDTH = "100%";
    const HEADER_CELLS = ["Mã quy trình", "Nguyên liệu"];
    const COLUMN_CELLS_WIDTH = ["width: calc(50%)", "width: calc(50%)"];
    const NUMBER_ROW_CONFIG = "default";
    const VIEW_TITLE = "Xem vòng đời";
    const VIEW_WIDTH = "220px";

    return (
        <>
            <SearchBar
                placeholder={"Nhập để tìm kiếm (tên, nguyên liệu...)"}
                input={search}
                setInput={setSearch}
                handleButtonClick={handleSearchListener}
            />

            <DataTable
                title={TITLE}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                headerCells={HEADER_CELLS}
                columnWidth={COLUMN_CELLS_WIDTH}
                numberRowConfig={NUMBER_ROW_CONFIG}
                data={formatedProcessCodeCollection}
                lengthList={formatedProcessCodeCollection!.length || 0}
                titleOfColumnView={VIEW_TITLE} viewColumnWidth={VIEW_WIDTH}
                displayButtons={{ create: true, view: true, remove: true, update: true }}
                onButtonViewClick={handleLifeCycleViewOpen}
                onButtonCreateClick={handleCreatingFormOpen}
                onButtonUpdateClick={handleEditFormOpen}
                onButtonRemoveClick={handleRemoveConfirm}
            />
        </>
    )
}

export default ProcessCodePage;