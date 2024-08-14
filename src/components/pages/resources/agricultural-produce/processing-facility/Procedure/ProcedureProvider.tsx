import { createContext, useState } from "react";
import { ITableCell } from "../../../../../common/DataTable";

interface IProcedureContext {
    data: ITableCell[],
    isValid: boolean,
    isDisplayForm: boolean,

    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,

    procedure: string,
    setProcedure: React.Dispatch<React.SetStateAction<string>>,

    handleSearch: () => void,
    handleCloseForm: () => void,
    handleSubmitForm: () => void,
    handleCreateItem: () => void,
    handleRemoveItem: (id: string) => void,
}

export const ProcedureProviderContext = createContext<IProcedureContext>({
    data: [],
    isValid: false,
    isDisplayForm: false,
    
    /* state */
    search: "",
    setSearch: () => {},
    procedure: "",
    setProcedure: () => {},
    
    /* events */
    handleSearch: () => {},
    handleCloseForm: () => {},
    handleSubmitForm: () => {},
    handleCreateItem: () => {},
    handleRemoveItem: () => {},
});

const ProcedureProvider = ({ children }: { children?: any }) => {

    // create state
    const [search, setSearch] = useState<string>("");
    const [procedure, setProcedure] = useState<string>("");
    const [respondedData, setResponsedData] = useState<[]>([]);
    const [isValid, setIsValid] = useState<boolean>(false);
    const [isDisplayForm, setIsDisplayForm] = useState<boolean>(false);

    const handleSearch = () => {
        return search.trim();
    }

    const handleCreateItem = () => {
        setIsDisplayForm(true);
    }

    const handleRemoveItem = (id: string): void => {
        return;
    }

    const handleCloseForm = () => {
        setProcedure("");
        setIsDisplayForm(false);
    }

    const handleSubmitForm = () => {
        setProcedure("");
        setIsDisplayForm(false);
        return;
    }

    return(
        <ProcedureProviderContext.Provider
            value={{ 
                data: [],
                isValid,
                isDisplayForm, 
                search,
                setSearch,
                procedure,
                setProcedure,
                handleSearch,
                handleCloseForm,
                handleSubmitForm,
                handleCreateItem,
                handleRemoveItem,
            }}
        >
            {children}
        </ProcedureProviderContext.Provider>
    )
}

export default ProcedureProvider;