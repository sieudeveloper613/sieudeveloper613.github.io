import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import WarehouseFormData from '../../../sharetype/form-data/resources/transportation/WarehouseFormData';
import WarehouseResponse from '../../../sharetype/response/resources/transportation/WarehouseResponse';

const create = async (formData: WarehouseFormData.ICreate): TAPIResponse<WarehouseResponse.ICreate> => {
    const url = [ENV.API_HOST_1, 'resources', 'transportation', 'warehouse', 'create'].join('/');

    try {
        const res = await axiosClient.post(url, formData);

        if (res.status !== 201)
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

export default create;
