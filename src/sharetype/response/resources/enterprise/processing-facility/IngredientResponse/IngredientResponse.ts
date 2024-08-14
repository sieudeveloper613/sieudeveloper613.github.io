import { IProcess } from "../../../../../../sharetype/form-data/resources/enterprise/processing-facility/IngredientFormData/IngredientFormData";

export const properties = Object.freeze({
    _id: 1,
    name: 1,
    process: 1,
    createdAt: 1,
});

export const propertiesDetail = Object.freeze({
    _id: 1,
    name: 1,
    process:1,
    createdAt: 1,
});


export interface IData {
    _id: string;
    name: string;
    process: IProcess[]
}

export interface IProcessResponse extends IProcess {
  createdAt: string;
}

export interface IFind {
  _id: string;
  name: string;
  createdAt: string;
  process: IProcessResponse[];
}


export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IDelete {
  _id: string;
}
