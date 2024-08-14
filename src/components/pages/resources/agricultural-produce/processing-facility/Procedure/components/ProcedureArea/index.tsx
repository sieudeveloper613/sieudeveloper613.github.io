import React from "react";

/* components */
import DataTable from "../../../../../../../common/DataTable";
import SearchBar from "../../../../../../../common/SearchBar";

/* configurations */
import useProcedureStore from "../../useProcedureStore";

const ProcedureArea = () => {
    const {
        data,
        search, 
        setSearch,
        handleSearch,
        handleCreateItem,
        handleRemoveItem
    } = useProcedureStore();
    console.log("data-procedure: ", data);
    return(
        <div>
            <SearchBar 
                placeholder={"Nhập quy trình"} 
                input={search} 
                setInput={setSearch} 
                handleButtonClick={handleSearch} 
            />

            <DataTable
                lengthList={data!.length || 0}
                title={"Thông Tin quy trình"}
                headerCells={["Quy trình"]}
                data={[]}
                rowHeight={"40px"}
                numberRowConfig={"default"}
                displayButtons={{ remove: true }}
                onButtonCreateClick={handleCreateItem}
                onButtonRemoveClick={handleRemoveItem}
                // onButtonUpdateClick={handleEditItem}
            />
        </div>
    )
}

export default ProcedureArea;