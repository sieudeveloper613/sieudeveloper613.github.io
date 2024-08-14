import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PartnerResponse from '../../../../sharetype/response/resources/PartnerResponse';

// const listPartnerById = async (id: string): TAPIResponse<PartnerResponse.IUser[]> => {
    const listPartnerById = async (): TAPIResponse<PartnerResponse.IUser[]> => {
    const url = `${ENV.API_HOST_1}/resources/partner/enterprise/list-partner/6630767a7c385ba08c208776`;

    try {
        const res = await axiosClient.get(url);
        console.log("Khánh log", res);
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

export default listPartnerById;
