import { useContext } from "react";
import { ProviderManageContext } from "./ProviderManageProvider";

export default function useProviderManageStore() {
    return useContext(ProviderManageContext);
}
