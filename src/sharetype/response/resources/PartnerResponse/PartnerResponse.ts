import IAddress from '../../../types/IAddress';

export interface IPartnerObject {
    _id: string;
    _idPartnerOption: string;
    name: string;
    address: IAddress;
    phone: string;
    taxCode: string;
    email: string;
    ownerName: string;
    role: string;
    createdAt: string;
}

export interface IPartnerOptions {
    value: string;
    label: string;
}

export type TListPartnerOptions = IPartnerOptions[];

export interface IUser {
    _id: string;
    name: string;
}

export type TListUsers = IUser[];

export interface IFullObject {
    _id: string;
    data: IPartnerObject | undefined;
}

export type TList = IFullObject[];
