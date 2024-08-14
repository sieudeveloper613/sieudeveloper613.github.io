import { ICity, IDistrict, IWards } from './../../sharetype/response/resources/master/UserResponse/UserResponse';
import { IOption } from '../../components/common/Selection';
import IAddress from '../../sharetype/types/IAddress';
import api from '../../api';
class Address {
    private static _instance?: Address;
    private mapCityName:Map<string, string> = new Map<string, string>()
    private mapDistrictName:Map<string, string> = new Map<string, string>();
    private mapWardName:Map<string, string> = new Map<string, string>();
    public cityOptions:Readonly<IOption[]> = []
    public mapDistrictOptions:Readonly<IOption[]> = []
    public mapWardOptions:Readonly<IOption[]> = []
    public resCity:ICity[] = []
    public resDistrict:IDistrict[] = []
    public resWard:IWards[]= []

    public static get instance() {
        if (!this._instance) {
            this._instance = new Address();
        }
        return this._instance;
    }
    private constructor () {
        this.componentDidMount() 
    }
    private async componentDidMount(){
         const _resCity = await api.user.listAllCity()
         const _resDistrict = await api.user.listAllDistrict()
         const _resWard = await api.user.listAllWard()
        if(!_resCity.data || !_resDistrict.data || !_resWard.data){
            return;
        }
        this.resCity =  _resCity.data
        this.resDistrict = _resDistrict.data
        this.resWard = _resWard.data

        this.mapCityName = _resCity.data.reduce((result:any, item:ICity) => {
            result.set(item.code, item.name);
            return result;
        }, new Map<string, string>());
        this.mapDistrictName = _resDistrict.data.reduce((result:any, item:IDistrict) => {
            result.set(item.code, item.name);
            return result;
        }, new Map<string, string>());
        this.mapWardName = _resWard.data.reduce((result:any, item:IWards) => {
            result.set(item.code, item.name);
            return result;
        }, new Map<string, string>());
    }

    public async reloadAddress() {
        await this.componentDidMount()
        return;
    }
    public getCityOptions(): Readonly<IOption[]> | [] {
        if(!this.resCity) return []
        const _cityOptions = this.resCity.map((item:ICity)=>{
            return {
                label: item.name,
                value: item.code
            }
        })
        return _cityOptions;
    }

    public getDistrictOptions(cityId?: string): Readonly<IOption[]> | undefined {
        if (!cityId || !this.resDistrict) return undefined;
        const _mapDistrictOptions:any = []
        this.resDistrict.forEach((item:IDistrict)=>{
            if(cityId === item.codeCity){
                _mapDistrictOptions.push(
                    {
                        label: item.name,
                        value: item.code
                    }
                )
            }
        })
        return _mapDistrictOptions;
    }

    public getWardOptions(v: [string | undefined, string | undefined]): Readonly<IOption[]> | undefined {
        if (v.includes(undefined) || !this.resWard) return undefined;

        const _mapWardOptions:any = []
        this.resWard.forEach((item:IWards)=>{
            if(v[0] === item.codeCity && v[1] === item.codeDistrict){
                _mapWardOptions.push(
                    {
                        label: item.name,
                        value: item.code
                    }
                )
            }
        })
        
        return _mapWardOptions;
    }

    public getCityName(v: string) {
        if(!this.mapCityName) return ''
        return this.mapCityName.get(v);
    }

    public getDistrictName(v: string) {
        if(!this.mapDistrictName) return ''
        return this.mapDistrictName.get(v);
    }

    public getWardName(v: string) {
        if(!this.mapWardName) return ''
        return this.mapWardName.get(v);

    }

    public makeAddressName(v: IAddress) {
        return [
            v.addressLine,
            this.getWardName(v.ward),
            this.getDistrictName(v.district),
            this.getCityName(v.city),
        ].join(', ');
    }
}

export default Address;
