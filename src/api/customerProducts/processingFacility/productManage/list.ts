import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ProductsNamesPlanResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ProductsNamesPlanResponse';

const list = async (pageNumber: number, PerPage: number): TAPIResponse<ProductsNamesPlanResponse.Tlist> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'Products-Names-plan', 'list'].join('/');
    try {
        const res = await axiosClient.get(url, {
            params: {
                pageNumber,
                nPerPage: PerPage,
            }
        });

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
            count: res.data.length
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default list;
