import axiosClient, { TAPIResponse } from '../../../core/axiosClient';
import ENV from '../../../core/ENV';
import DriverFormData from '../../../sharetype/form-data/resources/transportation/DriverFormData';

const create = async (formData: DriverFormData.ICreate): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'transportation', 'driver', 'create'].join('/');

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
