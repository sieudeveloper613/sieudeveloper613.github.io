import { IMaterialHistory, IProcessHistory, IProductAfterHistory } from "../ProcessCodeDeclarationFormData/ProcessCodeDeclarationFormData";

export interface IData {
    processCodeId: string;
    ingredientId: string;
    importDate?: Date[];
    materialHistory?: IMaterialHistory[];
    productAfterHistory?: IProductAfterHistory[];
    processHistory?: IProcessHistory[];
    createdAt?:any
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

// export const dataKeys = Object.freeze(['processCodeId'] as (keyof IData)[]);
// export const dataKeys_1 = Object.freeze(['ingredientId'] as (keyof IData)[]);
