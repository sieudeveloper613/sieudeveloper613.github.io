import { IOption } from '../../components/common/Selection';
import axiosClient, { TAPIResponse } from '../../core/axiosClient';
import ENV from '../../core/ENV';

export interface IMapOption {
    [p: string]: IOption[];
}

export interface IAddressHelper {
    cityOptions: IOption[];
    mapDistrictOptions: IMapOption;
    mapWardOptions: IMapOption;
}

let addressHelperCache: IAddressHelper | undefined = undefined;
const url = [ENV.API_HOST_2, 'statics', 'address-helper.json'].join('/');

const addressHelper = async (): TAPIResponse<IAddressHelper> => {
    if (addressHelperCache) {
        return {
            status: 'successfully',
            statusCode: 200,
            data: {
                cityOptions: [...addressHelperCache.cityOptions],
                mapDistrictOptions: { ...addressHelperCache.mapDistrictOptions },
                mapWardOptions: { ...addressHelperCache.mapWardOptions },
            },
        };
    }

    try {
        const res = await axiosClient.get(url);

        if (res.status !== 200)
            return {
                status: 'failure',
                statusCode: res.status,
            };

        const resData: IAddressHelper = res.data;

        addressHelperCache = {
            cityOptions: [...resData.cityOptions],
            mapDistrictOptions: { ...resData.mapDistrictOptions },
            mapWardOptions: { ...resData.mapWardOptions },
        };

        return {
            status: 'successfully',
            statusCode: res.status,
            data: resData,
        };
    } catch (e) {
        return {
            status: 'failure',
        };
    }
};

export default addressHelper;
