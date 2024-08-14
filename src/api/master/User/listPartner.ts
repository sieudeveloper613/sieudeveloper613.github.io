import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import PartnerResponse from '../../../sharetype/response/resources/PartnerResponse';

const listPartner = async (_id: string | undefined): TAPIResponse<PartnerResponse.TList> => {
    const url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'list-partner', _id].join('/');

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

export default listPartner;
