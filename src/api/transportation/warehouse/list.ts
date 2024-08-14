import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import WarehouseResponse from '../../../sharetype/response/resources/transportation/WarehouseResponse';

const list = async (pageNumber: number, PerPage: number): TAPIResponse<WarehouseResponse.IData[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'transportation', 'warehouse', 'list'].join('/');

    try {
        const res = await axiosClient.get(url, {
            params: {
                pageNumber,
                nPerPage: PerPage,
            }
        });

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

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
