import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import MaterialsFormData from '../../../../sharetype/form-data/resources/customer-products/processing-facility/MaterialsFormData';
import MaterialsResponse from '../../../../sharetype/response/resources/customer-products/processing-facility/MaterialsResponse';

const update = async (
    id: string,
    formData: MaterialsFormData.IUpdate,
): TAPIResponse<MaterialsResponse.IUpdate> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'materials', 'update', id].join(
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
