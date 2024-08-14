import { ICertificate } from './../../../../form-data/resources/master/UserFormData/UserFormData';
import IAddress from '../../../../types/IAddress';
import { TTypeUserRole } from '../../../../TPermission';
export interface IData {
    _id: string;
    name: string;
    taxCode: string;
    address: IAddress;
    phone: string;
    email: string;
    createdAt: string;
    certificate:ICertificate[];
    typeUser: TTypeUserRole;
    gln:string
}

export interface IItem extends IData {}
export interface IItemDelete extends ICertificate {}
export interface IDeleteMany {
    acknowledged: boolean,
    deletedCount: number
}
export const properties = {
    _id: 1,
    name: 1,
    taxCode: 1,
    address: 1,
    phone: 1,
    gln:1,
    email: 1,
    createdAt: 1,
    certificate:1,
    typeUser: 1
};
export interface ICity {
    code: string;
    name: string;
    class: string;
    updatedAt? : string
}
export interface IDistrict {
    code: string;
    name: string;
    class: string;
    codeCity:string;
    updatedAt? : string
}
export interface IWards {
    code: string;
    name: string;
    class: string;
    codeCity:string;
    codeDistrict:string;
    updatedAt? : string
}