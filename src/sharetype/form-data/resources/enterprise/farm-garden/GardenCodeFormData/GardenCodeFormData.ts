export interface IData {
    code: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export const dataKeys = Object.freeze(['code'] as (keyof IData)[]);
