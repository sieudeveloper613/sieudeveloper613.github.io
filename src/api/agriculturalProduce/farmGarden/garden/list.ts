import ENV from "../../../../core/ENV"
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient"
import GardenResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/GardenResponse"

const list = async (pageNumber: number, nPage: number): TAPIResponse<GardenResponse.IData[]> => {
    try {
        const request = await axiosClient.get(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/garden/list?pageNumber=${pageNumber}&nPage=${nPage}`
        );

        if (request.status !== 200) {
            return { status: "failure" };
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error) {
        console.log("garden-list-error: ", error);
        return { status: "failure" };
    }
}

export default list;