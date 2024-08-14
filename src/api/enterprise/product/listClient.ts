import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import ProductResponse from '../../../sharetype/response/resources/enterprise/ProductResponse';

const listClient = async (): TAPIResponse<ProductResponse.IData[]> => {
    try {
        const res = await axiosClient.get(`${ENV.API_HOST_1}/login/list-product-for-client`);

        if (res.status !== 200) {
            return {
                status: 'failure',
                statusCode: res.status,
            };
        }

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data.data,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listClient;
