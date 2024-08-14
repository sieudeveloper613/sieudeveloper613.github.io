import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ENV from '../../../../core/ENV';
import NameSuppliesResponse from "../../../../sharetype/response/resources/enterprise/farm-garden/NameSuppliesResponse";

const list = async (pageNumber?: number, PerPage?: number , isMore=false): TAPIResponse<NameSuppliesResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/name-supplies/list`;
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
