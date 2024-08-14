import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ENV from '../../../../core/ENV';
import FertilizersResponse from "../../../../sharetype/response/resources/agricultural-products/farm-garden/FertilizersResponse";

const list = async (pageNumber?: number, PerPage?: number , isMore=false): TAPIResponse<FertilizersResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/ingredient/list?isMore=${isMore}`;
    // const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce' ,'farm-garden', 'ingredient', 'list', `?isMore=${isMore}`].join('/');

    try {
        const res = await axiosClient.get(url, {
            params: {
                pageNumber,
                nPerPage: PerPage,
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
            data: res.data.data,
            count: res.data.count
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default list;
