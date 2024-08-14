import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ENV from '../../../../core/ENV';
import NameSuppliesFormData from "../../../../sharetype/form-data/resources/enterprise/farm-garden/NameSuppliesFormData";

const create = async (formData: NameSuppliesFormData.ICreate): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'name-supplies', 'create'].join('/');

    try {
        const res = await axiosClient.post(url, formData);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            data: res.data,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default create;
