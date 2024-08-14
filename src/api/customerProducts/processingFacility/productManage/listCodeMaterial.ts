import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import { ICodeMaterialResponse } from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ExportAgricultureContainerResponse/ExportAgricultureContainerResponse';

const listCodeMaterial = async (): TAPIResponse<ICodeMaterialResponse[]> => {
    const url = [ENV.API_HOST_1, 'resources', 'agricultural-produce', 'farm-garden', 'export-agriculture', 'listCodeMaterial'].join(
        '/',
    );

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
            data: res.data.data,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listCodeMaterial;