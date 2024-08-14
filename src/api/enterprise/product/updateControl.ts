import ENV from "../../../core/ENV";
import axiosClient, { TAPIResponse } from "../../../core/axiosClient";
import ProductFormData from "../../../sharetype/form-data/resources/enterprise/ProductFormData";
import ProductResponse from "../../../sharetype/response/resources/enterprise/ProductResponse";

const updateControl = async (_id: string, formData: ProductFormData.IUpdateControl): TAPIResponse<ProductResponse.IData> => {
    try {
        const url = [ENV.API_HOST_1, "resources", "enterprise", "updateControl", _id].join("/");
        const request = await axiosClient.patch(`${ENV.API_HOST_1}/resources/enterprise/updateControl/${_id}`, formData);

        if (request.status !== 200) {
            return {
                status: "failure",
                statusCode: request.status,
            };
        }

        return {
            status: "successfully",
            data: request.data.data,
            statusCode: request.status,
        };
    } catch (error) {
        console.log("update-control-error: ", String(error).split("\n").at(0));
        return {
            status: "failure",
        };
    }
};

export default updateControl;