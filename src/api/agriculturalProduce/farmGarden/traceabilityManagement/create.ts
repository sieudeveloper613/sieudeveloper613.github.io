import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PlantVarietiesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/PlantVarietiesFormData';
import PlantVarietiesResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/PlantVarietiesResponse';

const create = async (formData: PlantVarietiesFormData.ICreate): TAPIResponse<PlantVarietiesResponse.ICreate> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'plant-varieties', 'create'].join(
        '/',
    );
    try {
        const res = await axiosClient.post(url, formData);

        if (res.status !== 201) {
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

export default create;
