import { useContext } from "react";
import { ProcessCodeContext } from "./ProcessCodeProvider";

function useProcessCodeStore() {
    return useContext(ProcessCodeContext);
}

export default useProcessCodeStore;