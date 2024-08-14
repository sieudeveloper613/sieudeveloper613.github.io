import api from "../../../../api";
import SSCCPage from "./SSCCPage";
import Validate from "../../../../utils/Validate";
import { TValidateKernel } from "../../../../utils/Validate/Validate";

export namespace Self {
    export const contextApi = api.sscc;

    export const SSCCValidation = Object.assign({
        code: Validate.minLengthWithTrim(1)
    } as TValidateKernel<{ code: string }>)
}

export default SSCCPage;