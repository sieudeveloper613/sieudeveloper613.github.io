import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import EnterpriseProductResponse from '../../../../sharetype/response/resources/enterprise/EnterpriseProductResponse';

const listAll = async (): TAPIResponse<EnterpriseProductResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/resources/enterprise/listAll-enterprise-product/processing-facility`;
    try {
        const res = await axiosClient.get(url, {});

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
            count: res.data.count
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listAll;
