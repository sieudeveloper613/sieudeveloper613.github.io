import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';

const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/Products-Names/createProduct`;

const create = async (formData: ProductsNamesFormData.ICreateMaterial): TAPIResponse<undefined> => {
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
            statusCode: res.status,
            data: res.data,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default create;