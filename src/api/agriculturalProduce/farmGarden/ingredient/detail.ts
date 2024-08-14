import axiosClient, { TAPIResponse } from "../../../../core/axiosClient";
import ENV from '../../../../core/ENV';
import IngredientFormData from "../../../../sharetype/form-data/resources/enterprise/processing-facility/IngredientFormData";

const detail = async (id: string): TAPIResponse<IngredientFormData.IData> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce' ,'farm-garden', 'ingredient', 'detail', id].join('/');
    try {
        const res = await axiosClient.get(url);

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

export default detail;
