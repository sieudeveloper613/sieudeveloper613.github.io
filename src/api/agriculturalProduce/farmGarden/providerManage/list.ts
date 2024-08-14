import ENV from '../../../../core/ENV';
import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import SupplierManagementResponse from '../../../../sharetype/response/resources/enterprise/farm-garden/SupplierManagementResponse';

const list = async (pageNumber: number, numberOfRow: number): TAPIResponse<SupplierManagementResponse.IData[]> => {
    try {
        const request = await axiosClient.get(
            `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/supplier-management/list?pageNumber=${pageNumber}&numberOfRow=${numberOfRow}`
        );

        if (request.status !== 200) {
            return { status: "failure" }
        }

        return {
            status: "successfully",
            data: request.data.data,
        }
    } catch (error: any) {
        console.log("list-error: ", error);
        return { status: "failure" };
    }
}

export default list;