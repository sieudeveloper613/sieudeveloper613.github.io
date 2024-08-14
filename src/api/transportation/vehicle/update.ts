import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import VehicleFormData from '../../../sharetype/form-data/resources/transportation/VehicleFormData';
import VehicleResponse from '../../../sharetype/response/resources/transportation/VehicleResponse';

const update = async (_id: string, formData: VehicleFormData.IUpdate): TAPIResponse<VehicleResponse.IUpdate> => {
    const url = [ENV.API_HOST_1, 'resources', 'transportation', 'vehicle', 'update', _id].join('/');

    try {
        const res = await axiosClient.patch(url, formData);

        if (res.status !== 200)
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

export default update;
