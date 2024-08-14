import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesResponse';

const list = async (pageNumber: number, PerPage: number): TAPIResponse<ProductsNamesResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/Products-Names/listPage`;

    try {
        const res = await axiosClient.get(url, {
            params: {
                pageNumber,
                nPerPage: PerPage,
            }
        });
        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            data: res.data.data,
            count:res.data.total,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default list;