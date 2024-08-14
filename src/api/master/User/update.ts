import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import UserFormData from '../../../sharetype/form-data/resources/master/UserFormData';
import UserResponse from '../../../sharetype/response/resources/master/UserResponse';

const update = async (id: string, formData: UserFormData.IUpdate): TAPIResponse<UserResponse.IData> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'update', id].join('/');

    try {
        const res = await axiosClient.patch(url, formData);

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

export default update;
