import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';
import AgriculturalContainerResponse from '../../sharetype/response/resources/agricultural-products/farm-garden/AgriculturalContainerResponse';

const listImportUser = async (codeMaterial:string,ownerId: string, endDate: string, startDate?: string): TAPIResponse<AgriculturalContainerResponse.IProduct[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'agricultural-container', 'statistic-Improcess-user'].join('/');
    try {
        const res = await axiosClient.get(url, {
            params: {
                codeMaterial,
                ownerId,
                startDate,
                endDate,
            }
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
            data: res.data,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listImportUser;