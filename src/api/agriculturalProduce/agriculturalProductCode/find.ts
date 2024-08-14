import ENV from "../../../core/ENV";
import axiosClient, { TAPIResponse } from "../../../core/axiosClient";
import AgriculturalProductCodeResponse from "../../../sharetype/response/resources/enterprise/AgriculturalProductCodeResponse";

const find = async (qrCode: string): TAPIResponse<AgriculturalProductCodeResponse.IData> => {
    try {
        const request = await axiosClient.get(`${ENV.API_HOST_1}/login/find?qrCode=${qrCode}`);

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("agricultural-product-code-find-error: ", error);
        return { status: "failure" }
    }
}

export default find;