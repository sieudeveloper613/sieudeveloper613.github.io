import { IOption } from '../../components/common/Selection';
import IAddress from '../../sharetype/types/IAddress';
import addressData from './address-helper.json';
export interface IMapOption {
    [p: string]: Readonly<IOption[]>;
}

export interface IAddressHelper {
    cityOptions: Readonly<IOption[]>;
    mapDistrictOptions: Readonly<IMapOption>;
    mapWardOptions: Readonly<IMapOption>;
}

class Address_OldVer {
    private static _instance?: Address_OldVer;
    private readonly data = Object.freeze({
        cityOptions: Object.freeze(addressData.cityOptions.map((item) => Object.freeze(item))),

        mapDistrictOptions: Object.freeze(Object.entries(addressData.mapDistrictOptions)).reduce(
            (result, [key, value]) => {
                result[key] = Object.freeze(value.map((item) => Object.freeze(item)));
                return result;
            },
            {} as IMapOption,
        ),

        mapWardOptions: Object.freeze(Object.entries(addressData.mapWardOptions)).reduce((result, [key, value]) => {
            result[key] = Object.freeze(value.map((item) => Object.freeze(item)));
            return result;
        }, {} as IMapOption),
    } as IAddressHelper);

    private mapCityName: Map<string, string>;
    private mapDistrictName: Map<string, string>;
    private mapWardName: Map<string, string>;

    public static get instance() {
        if (!this._instance) {
            this._instance = new Address_OldVer();
        }
        return this._instance;
    }
    private constructor () {
        this.mapCityName = this.data.cityOptions.reduce((result, item) => {
            result.set(item.value, item.label);
            return result;
        }, new Map<string, string>());

        this.mapDistrictName = Object.entries(this.data.mapDistrictOptions).reduce((result, [key, options]) => {
            options.forEach((district) => {
                result.set([key, district.value].join('-'), district.label);
            });
            return result;
        }, new Map<string, string>());

        this.mapWardName = Object.entries(this.data.mapWardOptions).reduce((result, [key, options]) => {
            options.forEach((ward) => {
                result.set([key, ward.value].join('-'), ward.label);
            });
            return result;
        }, new Map<string, string>());

    }
    
    
    public getCityOptions(): Readonly<IOption[]> {
        return this.data.cityOptions;
    }

    public getDistrictOptions(cityId?: string): Readonly<IOption[]> | undefined {
        if (!cityId) return undefined;
        return this.data.mapDistrictOptions[cityId];
    }

    public getWardOptions(v: [string | undefined, string | undefined]): Readonly<IOption[]> | undefined {
        if (v.includes(undefined)) return undefined;
        return this.data.mapWardOptions[v.join('-')];
    }

    public getCityName(v: string) {
        return this.mapCityName.get(v);
    }

    public getDistrictName(v: [string, string]) {
        return this.mapDistrictName.get(v.join('-'));
    }

    public getWardName(v: [string, string, string]) {
        return this.mapWardName.get(v.join('-'));
    }

    public makeAddressName(v: IAddress) {
        return [
            v.addressLine,
            this.getWardName([v.city, v.district, v.ward]),
            this.getDistrictName([v.city, v.district]),
            this.getCityName(v.city),
        ].join(', ');
    }
}

export default Address_OldVer;
