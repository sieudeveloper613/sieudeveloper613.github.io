// emailAlreadyExists

import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import GlobalResponse from '../../sharetype/response/resources/GlobalResponse';

const emailAlreadyExists = async (email: string): TAPIResponse<GlobalResponse.ICheckExists> => {
    const url = [
        ENV.API_HOST_1, //=
        'resources',
        'global',
        'check-if-email-already-exists',
        email, //=
    ].join('/'); //=

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

export default emailAlreadyExists;
