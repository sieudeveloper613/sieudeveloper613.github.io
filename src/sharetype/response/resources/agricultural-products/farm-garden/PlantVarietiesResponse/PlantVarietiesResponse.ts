export interface IData {
    _id: string;
    name: string;
    agricultureProduceName: string;
    createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export type TList = IData[];

export interface ISuppliersResponse {
    _id: string;
    name: string;
    createdAt: string;
}

export interface IFind {
    _id: string;
    name: string;
    agricultureProduceName: string;
    createdAt: string;
    suppliers: ISuppliersResponse[];
}

export const properties: Record<keyof IData, 1> = {
    _id: 1,
    name: 1,
    agricultureProduceName: 1,
    createdAt: 1,
};
