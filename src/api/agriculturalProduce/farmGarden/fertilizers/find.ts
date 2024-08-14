import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import FertilizersResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/FertilizersResponse';

const find = async (_id: string): TAPIResponse<FertilizersResponse.IFind> => {
    const url = [
        //
        ENV.API_HOST_1,
        'resources',
        'agricultural-produce',
        'farm-garden',
        'fertilizers',
        'find',
        _id,
        //==
    ].join('/');

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
