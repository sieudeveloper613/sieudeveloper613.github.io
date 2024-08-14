import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import UserResponse from '../../../sharetype/response/resources/master/UserResponse';

const listAllDistrict = async (): TAPIResponse<UserResponse.IDistrict[]> => {
    const url = [ENV.API_HOST_1, 'login', 'listAllDistrict',].join('/');

    try {
        const res = await axiosClient.get(url);

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

export default listAllDistrict;
