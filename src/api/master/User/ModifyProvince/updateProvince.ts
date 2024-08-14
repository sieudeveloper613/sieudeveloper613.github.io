import { IWards } from '../../../../sharetype/response/resources/master/UserResponse/UserResponse';
import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';

const updateProvince = async (id: string, formData: Partial<IWards>,type:string): TAPIResponse<Partial<IWards>> => {
    let url = ''
    switch(type){
        case 'C' : url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'updateCity', id].join('/');
            break;
        case 'D': url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'updateDistrict', id].join('/');
            break;
        case 'W': url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'updateWard', id].join('/');
            break;
    } 
    try {
        const res = await axiosClient.patch(url, formData);

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

export default updateProvince;
