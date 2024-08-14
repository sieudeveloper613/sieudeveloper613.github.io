import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import ProductFormData from '../../../sharetype/form-data/resources/enterprise/ProductFormData';

const create = async (formData: ProductFormData.ICreate): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'enterprise', 'create-product'].join('/');
    try {
        const res = await axiosClient.post(url, formData);

        if (res.status !== 201) {
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
    } catch (e:any) {
        const error = e.response
        if (error.status == 409)
            return {
                status: 'existed',
                statusCode: error.status,
                data:error.data
            };
        return {
            status: 'failure',
        };
    }
};

export default create;
