export const properties = {
    _id: 1,
    code: 1,
    createdAt: 1,
};

export interface IData {
    _id: string;
    code: string;
    createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IDelete {
    _id: string;
}
