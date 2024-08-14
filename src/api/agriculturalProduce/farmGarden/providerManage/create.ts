import ENV from "../../../../core/ENV";
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import SupplierManagementFormData from "../../../../sharetype/form-data/resources/enterprise/farm-garden/SupplierManagementFormData";
import SupplierManagementResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/SupplierManagementResponse";

const create = async (formData: SupplierManagementFormData.ICreate): TAPIResponse<SupplierManagementResponse.IData> => {
    try {
        const request = await axiosClient.post(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/supplier-management/create`,
            formData
        );

        if (request.status !== 200) {
            return { status: "failure" }
        }

        return {
            status: "successfully",
            data: request.data.data
        }
    } catch (error: any) {
        console.log("create-error: ", error);
        return { status: "failure" };
    }
}

export default create;