import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ENV from '../../../../core/ENV';
import DriverResponse from "../../../../sharetype/response/resources/transportation/DriverResponse";

const list = async (pageNumber: number, PerPage: number): TAPIResponse<DriverResponse.IData[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce' ,'farm-garden', 'human-resource', 'list'].join('/');
    // const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/human-resource/list`
    try {
        const res = await axiosClient.get(url, {
            params: {
                pageNumber,
                nPerPage: PerPage,
            }
        });
        console.log('Khanh', res);
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
