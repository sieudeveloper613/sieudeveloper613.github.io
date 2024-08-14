import ENV from "../../../../core/ENV"
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient"
import GardenResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/GardenResponse"

const remove = async (id: string): TAPIResponse<GardenResponse.IData> => {
    try {
        console.log("params remove: ", {id})
        const request = await axiosClient.delete(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/garden/remove/${id}`
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("garden-remove-error: ", error);
        return { status: "failure" };
    }
}

export default remove;