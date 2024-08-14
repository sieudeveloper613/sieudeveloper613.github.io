import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';

const remove = async (_id: string): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'remove', _id].join('/');

    try {
        const res = await axiosClient.delete(url);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data,
        };
    } catch (e) {
        return {
            status: 'failure',
        };
    }
};

export default remove;
