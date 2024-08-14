/* components */
import LifeCycle from "./components/LifeCycle";
import CreateForm from "./components/CreateForm";
import ProviderManagePage from "./ProviderManagePage";
import ProviderManageProvider from "./ProviderManageProvider";

/* configurations */
import api from "../../../../../../api";

export namespace Self {
    export const apiContext = api.agriculturalProduce.farmGarden.providerManage;
}

export default function ProviderManage() {
    return (
        <ProviderManageProvider>
            <ProviderManagePage />
            <CreateForm />
            <LifeCycle />
        </ProviderManageProvider>
    )
};
