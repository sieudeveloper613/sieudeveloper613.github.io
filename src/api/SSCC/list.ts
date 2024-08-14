import ENV from "../../core/ENV"
import axiosClient, { TAPIResponse } from "../../core/axiosClient"
import SSCCResponse from "../../sharetype/response/resources/enterprise/SSCCResponse";

const list = async (pageNumber: number, nPage: number): TAPIResponse<SSCCResponse.TCollection> => {
    try {
        const request = await axiosClient.get(
            `${ENV.API_HOST_1}/resources/enterprise/sscc/list?pageNumber=${pageNumber}&nPage=${nPage}`
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("sscc-list-error: ", error);
        return { status: "failure" };
    }
}

export default list;