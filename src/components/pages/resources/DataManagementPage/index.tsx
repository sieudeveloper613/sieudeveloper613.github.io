import api from "../../../../api";
import DataManagementProvider from "./DataManagementProvider";
import DataManagementBasePage from "./DataManagementPage";

export namespace Self {
    export const apiContext = api.agriculturalProduce.agriculturalProductCode;
}

export default function DataManagementPage() {
    return (
        <DataManagementProvider>
            <DataManagementBasePage />
        </DataManagementProvider>
    );
}