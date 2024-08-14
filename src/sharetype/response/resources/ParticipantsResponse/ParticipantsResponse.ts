import { EnterpriseRole, TTypeUserRole } from '../../../TPermission';
import IAddress from '../../../types/IAddress';
export const properties = Object.freeze({
    _id: 1,
    name: 1,
    address: 1,
    phone: 1,
    email: 1,
    createdAt: 1,
    gln: 1,
    typeUser: 1
});
export const propertiesAll = Object.freeze({
    _id: 1,
    name: 1,
    address: 1,
    phone: 1,
    email: 1,
    createdAt: 1,
    permission:1,
    gln: 1,
    typeUser: 1
});

export interface IData {
    _id: string;
    name: string;
    address: IAddress;
    phone: string;
    typeUser:TTypeUserRole;
    gln:string;
    email: string;
    createdAt: string;
    permission?: {
        resource:string,
        role: EnterpriseRole 
    }

}



export type TList = IData[];
