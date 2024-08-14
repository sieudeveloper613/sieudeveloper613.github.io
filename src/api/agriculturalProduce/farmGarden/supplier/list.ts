import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import SupplierResponse from '../../../../sharetype/response/resources/enterprise/farm-garden/SupplierResponse';

const list = async (pageNumber?: number, PerPage?: number): TAPIResponse<SupplierResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/supplier/list`;

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
            data: res.data.data,
            count:res.data.total,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default list;