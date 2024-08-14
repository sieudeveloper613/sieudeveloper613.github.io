export const properties = {
    _id: 1,
    licensePlates: 1,
    vehicleType: 1,
    email: 1,
    createdAt: 1,
};

export interface IData {
    _id: string;
    licensePlates: string;
    vehicleType: string;
    email: string;
    createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IRemove extends IData {}

export type TList = IData[];
