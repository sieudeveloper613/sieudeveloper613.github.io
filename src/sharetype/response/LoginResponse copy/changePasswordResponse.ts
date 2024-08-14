import TPermission from '../../TPermission';

export interface IChangePassword {
    _id: string;
    name: string;
    phone: string;
    email: string;
    address: any;
    permission: TPermission;
}
