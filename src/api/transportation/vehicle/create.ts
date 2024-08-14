import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import VehicleFormData from '../../../sharetype/form-data/resources/transportation/VehicleFormData';
import VehicleResponse from '../../../sharetype/response/resources/transportation/VehicleResponse';

const create = async (formData: VehicleFormData.ICreate): TAPIResponse<VehicleResponse.ICreate> => {
    const url = [ENV.API_HOST_1, 'resources', 'transportation', 'vehicle', 'create'].join('/');

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
