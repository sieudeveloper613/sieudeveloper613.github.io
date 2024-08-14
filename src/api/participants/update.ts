import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import ParticipantsFormData from '../../sharetype/form-data/resources/ParticipantsFormData';
import { EParticipantsRole } from '../../sharetype/TPermission';

const update = async (
    _id: string,
    formData: ParticipantsFormData.IUpdate,
    role: EParticipantsRole,
): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'participants', 'update', role, _id].join('/');
    try {
        const res = await axiosClient.patch(url, formData);

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

export default update;
