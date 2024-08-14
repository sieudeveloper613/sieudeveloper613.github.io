import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';

const update = async (_id: string, formData: ProductsNamesFormData.ICreateMaterial): TAPIResponse<undefined> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/Products-Names/update/${_id}`;

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
            statusCode: res.status,
            data: res.data,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default update;