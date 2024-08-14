import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import GardenDetailResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/GardenDetailResponse';

const getGardenDetail = async (_id: string): TAPIResponse<GardenDetailResponse.IGardenDetail> => {
    const url = [
        //
        ENV.API_HOST_1,
        'resources',
        'agricultural-produce',
        'farm-garden',
        'garden-detail',
        'getGardenDetail',
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

export default getGardenDetail;
