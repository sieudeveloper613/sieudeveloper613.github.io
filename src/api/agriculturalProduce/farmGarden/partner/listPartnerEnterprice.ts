import { IOption } from '../../../../components/common/Selection';
import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import ExportAgricultureContainerResponse from '../../../../sharetype/response/resources/agricultural-products/farm-garden/ExportAgricultureContainerResponse';
import MaterialsResponse from '../../../../sharetype/response/resources/customer-products/processing-facility/MaterialsResponse';
import PartnerResponse from '../../../../sharetype/response/resources/PartnerResponse';

const listPartnerEnterpriseOptions = async (): TAPIResponse<PartnerResponse.IUser[]> => {
    const url = `${ENV.API_HOST_1}/resources/partner/enterprise/list-partner-enterprise`;

    try {
        const res = await axiosClient.get(url);

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

export default listPartnerEnterpriseOptions;
