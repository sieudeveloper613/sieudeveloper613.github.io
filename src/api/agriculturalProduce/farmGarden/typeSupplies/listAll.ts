import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import FertilizersResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/FertilizersResponse';

const listAll = async (): TAPIResponse<FertilizersResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/type-supplies/listAll`;
    try {
        const res = await axiosClient.get(url, {
          
        });
        
        if (res.status !== 200) {
            return {
                status: 'failure',
                statusCode: res.status,
            };
        }

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data.data,
            count: res.data.count
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listAll;
