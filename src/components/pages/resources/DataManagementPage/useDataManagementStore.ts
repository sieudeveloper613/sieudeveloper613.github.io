import { useContext } from "react";
import { DataManagementContext } from "./DataManagementProvider";

export default function useDataManagementStore() {
    return useContext(DataManagementContext);
}