import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesPlanFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesPlanFormData';

const update = async (
    id: string,
    formData: ProductsNamesPlanFormData.ICreateMaterial,
) => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'Products-Names-plan', 'update', id].join(
        '/',
    );

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
