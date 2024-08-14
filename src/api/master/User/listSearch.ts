import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import UserResponse from '../../../sharetype/response/resources/master/UserResponse';
import TPermission from '../../../sharetype/TPermission';

const listSearch = async (p:TPermission,value:string, limit: number): TAPIResponse<UserResponse.IItem[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'list-search', p.resource, p.role].join('/');

    try {
        const res = await axiosClient.get(url, {
            params: {
                value,
                limit
            }
        });

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data.users,
            count: res.data.count
        };
    } catch (e) {
        return {
            status: 'failure',
        };
    }
};

export default listSearch;
