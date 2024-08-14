import { EnterpriseRole } from './../../sharetype/TPermission';
import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import ParticipantsResponse from '../../sharetype/response/resources/ParticipantsResponse';
import UserResponse from '../../sharetype/response/resources/master/UserResponse';

const list = async (role: EnterpriseRole, pageNumber: number, PerPage: number): TAPIResponse<UserResponse.IItem[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'enterprise', 'list', role].join('/');
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
            data: res.data.data,
            count: res.data.count
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default list;
