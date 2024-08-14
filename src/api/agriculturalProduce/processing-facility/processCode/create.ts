import ENV from "../../../../core/ENV";
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ProcessCodeFormData from "../../../../sharetype/form-data/resources/enterprise/processing-facility/ProcessCodeFormData";
import ProcessCodeResponse from "../../../../sharetype/response/resources/enterprise/processing-facility/ProcessCodeResponse";

const create = async (formData: ProcessCodeFormData.ICreate): TAPIResponse<ProcessCodeResponse.ICreate> => {
    try {
        const request = await axiosClient.post(`${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/process-code/create`, formData);

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data,
        };

    } catch (error: any) {
        console.log("create-error: ", + error);
        return { status: "failure" };
    }
}

export default create;