import axiosClient, { TAPIResponse } from '../../../../core/axiosClient';
import ENV from '../../../../core/ENV';
import CountrysResponse from '../../../../sharetype/response/resources/customer-products/processing-facility/CountryResponse';
const listCountry = async (): TAPIResponse<CountrysResponse.IData[]> => {
    const url = `${ENV.API_HOST_1}/common-resources/country`;

    try {
        const res = await axiosClient.get(url);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: res.data.countries,
        };
    } catch {
        return {
            status: 'failure',
        };
    }
};

export default listCountry;