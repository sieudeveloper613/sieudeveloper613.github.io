export interface IData {
  name: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export const dataKeys = Object.freeze(['name'] as (keyof IData)[]);
