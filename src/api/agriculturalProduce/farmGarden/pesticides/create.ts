import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PesticidesFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/PesticidesFormData';

const create = async (formData: PesticidesFormData.ICreate): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'pesticides', 'create'].join('/');
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
