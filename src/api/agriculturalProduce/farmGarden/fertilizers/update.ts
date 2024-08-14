import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import FertilizersFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/FertilizersFormData';
import FertilizersResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/FertilizersResponse';

const update = async (id: string, formData: FertilizersFormData.IUpdate): TAPIResponse<FertilizersResponse.IUpdate> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'fertilizers', 'update', id].join(
        '/',
    );

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
