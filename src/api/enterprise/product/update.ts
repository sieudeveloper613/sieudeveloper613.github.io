import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import EnterpriseProductFormData from '../../../sharetype/form-data/resources/enterprise/EnterpriseProductFormData';
import ProductFormData from '../../../sharetype/form-data/resources/enterprise/ProductFormData';

const update = async (
    _id: string,
    formData: ProductFormData.IUpdate,
): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'enterprise', 'update-product', _id].join('/');
    try {
        const res = await axiosClient.patch(url, formData);

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

export default update;
