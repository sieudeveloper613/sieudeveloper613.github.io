import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import GardenCodeFormData from '../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';

const update = async (_id: string, formData: GardenCodeFormData.IUpdate): TAPIResponse<undefined> => {
    const url = [
        ENV.API_HOST_1,
        'resources',
        'agricultural-produce',
        'farm-garden',
        'garden-code',
        'update',
        _id,
        //==
    ].join('/');

    try {
        const res = await axiosClient.patch(url, formData);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            data: undefined,
            statusCode: res.status,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default update;
