import TPermission, { TTypeUserRole } from '../../../../TPermission';
import IAddress from '../../../../types/IAddress';

export interface IData {
    name: string; // Tên đối tượng
    taxCode: string; // Mã số thuế
    gln: string; //GLN
    address: IAddress; // Địa chỉ
    phone: string; // Số điện thoại
    email: string;
    typeUser:TTypeUserRole;
    permission: TPermission;
    certificate:ICertificate[]
}
export interface ICertificate {
    id: string,
    filename: string,
    path: string,
    originalname:string,
}

export type TKeysOfIData = keyof Pick<IData,'gln'| 'email' | 'name' | 'phone' | 'taxCode'>;
export const keysOfIData: TKeysOfIData[] = [
    'gln',
    'email',
    'name',
    'phone',
    'taxCode',
];

export interface ICreate extends IData {}

export interface IUpdate extends IData {}
