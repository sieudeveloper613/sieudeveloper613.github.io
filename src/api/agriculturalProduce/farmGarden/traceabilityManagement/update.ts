import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PlantVarietiesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/PlantVarietiesFormData';
import PlantVarietiesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/PlantVarietiesResponse';

const update = async (
    id: string,
    formData: PlantVarietiesFormData.IUpdate,
): TAPIResponse<PlantVarietiesResponse.IUpdate> => {
    const url = [
        ENV.API_HOST_1,
        'resources',
        'agricultural-produce',
        'farm-garden',
        'plant-varieties',
        'update',
        id,
    ].join('/');

    try {
        const res = await axiosClient.patch(url, formData);

        if (res.status !== 200) {
            return {
                status: 'failure',
                statusCode: res.status,
            };
        }

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
