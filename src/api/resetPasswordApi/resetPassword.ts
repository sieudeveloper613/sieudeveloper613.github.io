import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import resetPassFormDataApi from '../../sharetype/form-data/resetPassFormDataApi';

import LoginResponse from '../../sharetype/response/LoginResponse';

const url = [ENV.API_HOST_1, 'login', 'Reset-PWD'].join('/');

const resetPassword = async (
    formData: resetPassFormDataApi.IresetPassFormDataApi,
): TAPIResponse<LoginResponse.ISignIn> => {
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

export default resetPassword;
