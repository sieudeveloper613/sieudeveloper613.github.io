import api from "../../../../../../api";
import Validate from "../../../../../../utils/Validate";
import { TValidateKernel } from "../../../../../../utils/Validate/Validate";
import ProcedurePage from "./ProcedurePage";

export namespace Self {
    export const contextApi = api.agriculturalProduce.processingFacility.procedures;

    export const procedureValidation = Object.assign({
        procedure: Validate.minLengthWithTrim(1)
    } as TValidateKernel<{ procedure: string }>)
}

export default ProcedurePage;