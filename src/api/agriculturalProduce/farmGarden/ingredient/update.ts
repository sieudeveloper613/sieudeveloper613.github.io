import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ENV from '../../../../core/ENV';
import IngredientFormData from "../../../../sharetype/form-data/resources/enterprise/processing-facility/IngredientFormData";

const update = async (id: string, formData: IngredientFormData.IUpdate): TAPIResponse<undefined> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce' ,'farm-garden', 'ingredient', 'update', id].join('/');
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
