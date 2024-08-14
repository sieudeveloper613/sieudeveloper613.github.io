import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import MaterialsResponse from '../../../../sharetype/response/resources/customer-products/processing-facility/MaterialsResponse';

const find = async (_id: string): TAPIResponse<MaterialsResponse.IFind> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'materials', 'find', _id].join(
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
            data: res.data,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default find;
