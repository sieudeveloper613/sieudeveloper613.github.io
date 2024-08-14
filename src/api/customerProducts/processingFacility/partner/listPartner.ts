import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PartnerResponse from '../../../../sharetype/response/resources/PartnerResponse';
import messageAlert from '../../../../utils/messageAlert';
import getPermissionListPartner from './getPermissionListPartner';

const listPartner = async (): TAPIResponse<PartnerResponse.IPartnerObject[]> => { 
   
    try {
        const res1:any = await getPermissionListPartner()
        if (res1.status === 'failure') {
            messageAlert('error', 'Không thể tải danh sách các nhà cung cấp nguyên liệu thô !');
            return  {
                status: 'failure',
            };
        }
        
        const url = `${ENV.API_HOST_1}/resources/partner/list-users/${res1?.data}`;
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

export default listPartner;