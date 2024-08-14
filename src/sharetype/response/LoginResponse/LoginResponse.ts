import { ICertificate } from './../../form-data/resources/master/UserFormData/UserFormData';
import TPermission from '../../TPermission';

export interface ISignIn {
    _id: string;
    name: string;
    phone: string;
    email: string;
    address: any;
    gln?: string,
    permission: TPermission;
    ownerId?: string;
    createByUser?:string
    certificate:ICertificate[],
    taxCode:string
}
