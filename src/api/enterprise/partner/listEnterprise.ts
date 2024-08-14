import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import PartnerResponse from '../../../sharetype/response/resources/PartnerResponse';
import ENV from '../../../core/ENV';

const listEnterprise = async (): TAPIResponse<PartnerResponse.IUser[]> => {
    const url = `${ENV.API_HOST_1}/resources/partner/enterprise/list-partner-enterprise`;
    
    try {
        const res = await axiosClient.get(url);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

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

export default listEnterprise;
