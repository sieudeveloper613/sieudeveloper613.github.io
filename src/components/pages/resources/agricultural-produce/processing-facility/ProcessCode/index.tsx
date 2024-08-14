/* configurations */
import api from "../../../../../../api";

/* components */
import ProcessCodePage from "./ProcessCodePage";
import EditingForm from "./components/EditingForm";
import LifeCycle from "./components/LifeCycleView";
import CreatingForm from "./components/CreatingForm";
import ProcessCodeProvider from "./ProcessCodeProvider";

export namespace Self {
    export const contextApi = api.agriculturalProduce.processingFacility.processCode;
}

export default function ProcessCode() {
    return (
        <ProcessCodeProvider>
            <ProcessCodePage />
            <CreatingForm />
            <EditingForm />
            <LifeCycle />
        </ProcessCodeProvider>
    )
} 
