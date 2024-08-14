import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import LoginFormData from '../../sharetype/form-data/LoginFormData';
import LoginResponse from '../../sharetype/response/LoginResponse';

const url = [ENV.API_HOST_1, 'login', 'sign-in'].join('/');

const signIn = async (formData: LoginFormData.ISignIn): TAPIResponse<LoginResponse.ISignIn> => {
    try {
        const res = await axiosClient.post(url, {
            ...formData,
        });

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

export default signIn;
