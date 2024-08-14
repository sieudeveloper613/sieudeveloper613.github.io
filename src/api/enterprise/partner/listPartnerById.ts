import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import PartnerResponse from '../../../sharetype/response/resources/PartnerResponse';
import { ETypeUser } from '../../../sharetype/TPermission';
import { EAgriculturalProducesRole } from '../../../sharetype/TPermission';


const listPartnerById = async (id1 : any,id2 : any,id3 : any): TAPIResponse<PartnerResponse.IUser[]> => {
    // const url = `${ENV.API_HOST_1}/resources/partner/enterprise/list-partner/${_id}/${ETypeUser.agriculturalProduce}/${EAgriculturalProducesRole.farmOrGarden}`;
    const url = `${ENV.API_HOST_1}/resources/partner/enterprise/list-partner/${id1}/${id2}/${id3}`;
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

export default listPartnerById;
