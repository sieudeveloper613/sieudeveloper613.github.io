import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import UserResponse from '../../../sharetype/response/resources/master/UserResponse';
 
const deleteDraftCertificate = async (): TAPIResponse<UserResponse.IDeleteMany> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'deleteDraft-certificate'].join('/');

    try {
        const res = await axiosClient.post(url);

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

export default deleteDraftCertificate;
