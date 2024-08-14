import { useContext } from "react";
import { SSCCContext } from "./SSCCProvider";

const useSSCCStore = () => {
    return useContext(SSCCContext);
}

export default useSSCCStore;