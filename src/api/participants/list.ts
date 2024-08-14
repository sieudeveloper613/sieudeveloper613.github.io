import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import ParticipantsResponse from '../../sharetype/response/resources/ParticipantsResponse';
import { EParticipantsRole } from '../../sharetype/TPermission';

const list = async (role: EParticipantsRole, pageNumber: number, PerPage: number): TAPIResponse<ParticipantsResponse.TList> => {
    const url = [ENV.API_HOST_1, 'resources', 'participants', 'list', role].join('/');
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
