import ENV from "../../../../core/ENV";
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import NameSuppliesResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/NameSuppliesResponse";

const collection = async (): TAPIResponse<NameSuppliesResponse.IData[]> => {
    try {
        const request = await axiosClient.get(`${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/name-supplies/collection`);
        
        if (request.status !== 200) {
            return {
                status: "failure",
                statusCode: request.status,
            };
        }

        return {
            status: "successfully",
            statusCode: request.status,
            data: request.data.data,
            count: request.data.count
        };
    } catch {
        return {
            status: "failure",
        };
    }
};

export default collection;
