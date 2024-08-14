import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';
import ProductsNamesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';

const update = async (
    id: string,
    formData: ProductsNamesFormData.IUpdateExtend,
): TAPIResponse<ProductsNamesResponse.IData> => {
    const url = [
        ENV.API_HOST_1,
        'resources',
        'agricultural-produce',
        'farm-garden',
        'supplier',
        'update',
        id,
    ].join('/');

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
