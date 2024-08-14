import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';

const create = async (formData: ProductsNamesFormData.ICreate): TAPIResponse<undefined> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/supplier/create`;

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
