import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import GardenCodeFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';
import GardenCodeResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/GardenCodeResponse';

const create = async (formData: GardenCodeFormData.ICreate): TAPIResponse<GardenCodeResponse.ICreate> => {
    const url = `${ENV.API_HOST_1}/resources/agricultural-produce/farm-garden/garden-code/create`;

    try {
        const res = await axiosClient.post(url, formData);

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

export default create;
