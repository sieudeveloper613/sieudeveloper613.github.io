import axiosClient from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';

const remove = async (id: string) => {
    const url = `${ENV.API_HOST_1}/resources/partner/remove/${id}`;

    try {
        const res = await axiosClient.delete(url);

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

export default remove;