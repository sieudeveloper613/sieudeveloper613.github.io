import ENV from "../../core/ENV"
import axiosClient, { TAPIResponse } from "../../core/axiosClient"
import SSCCResponse from "../../sharetype/response/resources/enterprise/SSCCResponse";

const reset = async (code: string): TAPIResponse<SSCCResponse.IData> => {
    try {
        const request = await axiosClient.patch(
            `${ENV.API_HOST_1}/resources/enterprise/sscc/reset/${code}`
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("sscc-reset-error: ", error);
        return { status: "failure" };
    }
}

export default reset;