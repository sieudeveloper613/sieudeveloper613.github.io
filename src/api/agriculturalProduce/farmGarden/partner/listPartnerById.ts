import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PartnerResponse from '../../../../sharetype/response/resources/PartnerResponse';
import messageAlert from '../../../../utils/messageAlert';
import listPartnerEnterpriseOptions from './listPartnerEnterprice';

const listPartnerById = async (): TAPIResponse<PartnerResponse.IUser[]> => {
    

    try {
        const res1:any = await listPartnerEnterpriseOptions()
        if (res1.status === 'failure') {
            messageAlert('error', 'Không thể tải danh sách các nhà cung cấp nguyên liệu thô !');
            return  {
                status: 'failure',
            };
        }

        const url = `${ENV.API_HOST_1}/resources/partner//enterprise/list-partner/${res1.data}`;
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
