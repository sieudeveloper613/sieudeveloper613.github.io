import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import TypeSuppliesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/TypeSuppliesFormData';
import TypeSuppliesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/TypeSuppliesResponse';

const create = async (formData: TypeSuppliesFormData.ICreate): TAPIResponse<TypeSuppliesResponse.ICreate> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'type-supplies', 'create'].join('/');
    try {
        const res = await axiosClient.post(url, formData);

        if (res.status !== 200) {
            return {
                status: 'failure',
                statusCode: res.status,
            };
        }

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
