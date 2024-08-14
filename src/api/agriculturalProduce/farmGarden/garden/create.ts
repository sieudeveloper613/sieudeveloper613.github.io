import ENV from "../../../../core/ENV"
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient"
import GardenFormData from "../../../../sharetype/form-data/resources/enterprise/farm-garden/GardenFormData";
import GardenResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/GardenResponse"

const create = async (formData: GardenFormData.ICreate): TAPIResponse<GardenResponse.IData> => {
    try {
        const request = await axiosClient.post(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/garden/create`, 
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
        console.log("garden-create-error: ", error);
        return { status: "failure" };
    }
}

export default create;