import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import ParticipantsResponse from '../../../sharetype/response/resources/ParticipantsResponse';

const listParticipants = async (
    _id: string | undefined,
    role: string | undefined,
): TAPIResponse<ParticipantsResponse.TList> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'list-participants', _id, role].join('/');

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

export default listParticipants;
