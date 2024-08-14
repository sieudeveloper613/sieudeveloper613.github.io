import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PartnerFormData from '../../../../sharetype/form-data/resources/PartnerFormData';

const url = `${ENV.API_HOST_1}/resources/partner/create`;

const create = async (formData: PartnerFormData.ICreate): TAPIResponse<undefined> => {
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
            statusCode: res.status,
            data: res.data,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default create;