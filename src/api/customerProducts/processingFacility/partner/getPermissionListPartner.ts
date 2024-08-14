import { useState } from 'react';
import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import PartnerResponse from '../../../../sharetype/response/resources/PartnerResponse';

const getPermissionListPartner = async (): TAPIResponse<PartnerResponse.IPartnerObject[]> => {
    // const url = `${ENV.API_HOST_1}/resources/master/user/listAll/traceabilityChain/supplierPage`;
    const url = `${ENV.API_HOST_1}/resources/partner/list-partner-options`;
    try {
        const res:any = await axiosClient.get(url);
        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            data: res.data?.[0]?.value,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default getPermissionListPartner ;