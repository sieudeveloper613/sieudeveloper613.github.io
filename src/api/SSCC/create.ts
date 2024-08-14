import ENV from "../../core/ENV"
import axiosClient, { TAPIResponse } from "../../core/axiosClient"
import SSCCResponse from "../../sharetype/response/resources/enterprise/SSCCResponse";
import SSCCFormData from "../../sharetype/form-data/resources/enterprise/SSCCFormData";

const create = async (formData: SSCCFormData.ICreate): TAPIResponse<SSCCResponse.IData> => {
    try {
        const request = await axiosClient.post(
            `${ENV.API_HOST_1}/resources/enterprise/sscc/create`, 
            formData
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("sscc-create-error: ", error);
        return { status: "failure" };
    }
}

export default create;