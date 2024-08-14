import React from "react";

/* components */
import SearchBar from "../../../../../common/SearchBar";
import DataTable from "../../../../../common/DataTable";

/* configurations */
import useProviderManageStore from "./useProviderManageStore";

/* packages */
import { Oval } from "react-loader-spinner";

function ProviderManagePage() {
    /* collect value from store */
    const {
        search,
        isLoading,
        formatedProvidersCollection,
        setSearch,
        handleSearchListener,
        handleCreateFormOpen,
        handleLifeCycleViewOpen,
    } = useProviderManageStore();

    /** create constants */
    const MAX_WIDTH = "100%";
    const VIEW_WIDTH = "200px";
    const VIEW_TITLE = "Xem vòng đời";
    const NUMBER_ROW_CONFIG = "default";
    const HEADER_CELLS = ["Tên Nhà cung cấp"];
    const TITLE = "Thông tin quản lý nhà cung cấp";
    const COLUMN_CELLS_WIDTH = ["width: calc(100%)"];

    return (
        <>
            <SearchBar
                placeholder={"Nhập tên nhà cung cấp"}
                input={search}
                setInput={setSearch}
                handleButtonClick={handleSearchListener}
            />

            <DataTable
                title={TITLE}
                loading={isLoading}
                maxWidth={MAX_WIDTH}
                headerCells={HEADER_CELLS}
                viewColumnWidth={VIEW_WIDTH}
                titleOfColumnView={VIEW_TITLE}
                columnWidth={COLUMN_CELLS_WIDTH}
                data={formatedProvidersCollection}
                numberRowConfig={NUMBER_ROW_CONFIG}
                lengthList={formatedProvidersCollection.length}
                displayButtons={{ view: true, create: true }}
                onButtonViewClick={handleLifeCycleViewOpen}
                onButtonCreateClick={handleCreateFormOpen}
            />
        </>
    );
}

export default React.memo(ProviderManagePage);
