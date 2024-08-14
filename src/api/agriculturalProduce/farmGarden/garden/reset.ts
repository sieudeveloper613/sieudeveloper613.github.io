import ENV from "../../../../core/ENV"
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient"
import GardenResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/GardenResponse"

const reset = async (id: string): TAPIResponse<GardenResponse.IData> => {
    try {
        const request = await axiosClient.patch(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/garden/reset/${id}`
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("garden-reset-error: ", error);
        return { status: "failure" };
    }
}

export default reset;