import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';

const listProducts = async (typePackage: string): TAPIResponse<ProductsNamesResponse.Tlist> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/Products-Names/listProducttypePackage`;

    try {
        const res = await axiosClient.get(url, {
            params: {
                typePackage,
            }
        });

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data.data,
            count: res.data.count,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listProducts;