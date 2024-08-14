export interface IData {
    _id: string;
    productName: string;
    gtin: string;
    role: string; 
    expired: number;
    productVolume: number;
    type: string;
    createdAt: string;
    imageProduct: string;
}

export interface IItem extends IData {}
export const properties = {
    _id: 1,
    productName: 1,
    gtin: 1,
    role: 1,
    type: 1,
    expired: 1,
    productVolume: 1,
    imageProduct :1,
};

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IRemove extends IData {}

export type TList = IData[];
