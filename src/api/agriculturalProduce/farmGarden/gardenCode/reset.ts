import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import GardenCodeFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';

const reset = async (_id: string): TAPIResponse<undefined> => {
    const url = [
        ENV.API_HOST_1,
        'resources',
        'agricultural-produce',
        'farm-garden',
        'garden-code',
        'updateReset',
        _id,
        //==
    ].join('/');

    try {
        const res = await axiosClient.patch(url);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
                data: res.data
            };

        return {
            status: 'successfully',
            data: res.data,
            statusCode: res.status,
        };
    } catch (error: any) {
        if (error.response) {
            return {
                status: 'failure',
                data: error.response.data.msg
            }
        }
        return {
            status: 'failure',
        };
    }
};

export default reset;