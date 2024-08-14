import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesPlanResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesPlanResponse';

const find = async (_id: string): TAPIResponse<ProductsNamesPlanResponse.IUpdate> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'Products-Names-plan', 'findProductplan', _id].join(
        '/',
    );

    try {
        const res = await axiosClient.get(url);

        if (res.status !== 200) {
            return {
                status: 'failure',
                statusCode: res.status,
            };
        }

        return {
            status: 'successfully',
            data: res.data.data,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default find;
