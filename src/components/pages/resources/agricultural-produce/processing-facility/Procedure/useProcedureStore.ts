import { useContext } from "react";
import { ProcedureProviderContext } from "./ProcedureProvider";

const useProcedureStore = () => {
    return useContext(ProcedureProviderContext);
}

export default useProcedureStore;