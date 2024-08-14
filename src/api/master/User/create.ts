import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import UserFormData from '../../../sharetype/form-data/resources/master/UserFormData';
import UserResponse from '../../../sharetype/response/resources/master/UserResponse';

const create = async (formData: UserFormData.ICreate): TAPIResponse<UserResponse.IData> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'create'].join('/');

    try {
        const res = await axiosClient.post(url, formData);
        
        if (res.status !== 201)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data,
        };
    } catch (e:any) {
        const error = e.response
        if (error.status == 409)
            return {
                status: 'existed',
                statusCode: error.status,
                data:error.data
            };
        return {
            status: 'failure',
        };
    }
};

export default create;
