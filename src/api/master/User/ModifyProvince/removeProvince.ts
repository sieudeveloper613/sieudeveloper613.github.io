import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';

const removeProvince = async (_id: string,type:string): TAPIResponse<undefined> => {
    let url = ''
    switch(type){
        case 'C' : url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'removeCity',_id].join('/');
            break;
        case 'D': url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'removeDistrict',_id].join('/');
            break;
        case 'W': url = [ENV.API_HOST_1, 'resources', 'master', 'user', 'removeWard',_id].join('/');
            break;
    } 
    try {
        const res = await axiosClient.delete(url);

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

export default removeProvince;
