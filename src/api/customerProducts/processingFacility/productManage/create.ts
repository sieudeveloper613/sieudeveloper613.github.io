import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesPlanFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesPlanFormData';

const create = async (formData: ProductsNamesPlanFormData.ICreateMaterial): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'Products-Names-plan', 'createProduct'].join('/');
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
