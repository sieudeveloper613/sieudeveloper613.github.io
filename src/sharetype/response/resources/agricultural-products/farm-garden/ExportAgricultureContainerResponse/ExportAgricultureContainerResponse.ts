import AgriculturalContainerResponse from '../AgriculturalContainerResponse';

export interface IListItem {
    _id: string;
    name: string;
}

export type TListShippingService = IListItem[];
export type TListDriver = IListItem[];
export type TListVehicle = IListItem[];

export type FindAgricultureContainer = AgriculturalContainerResponse.IFind;
export const findAgricultureContainerProject = AgriculturalContainerResponse.findProperty;

export interface ICheckeIfQrcodeIsValid {
    isValid: boolean;
}

export interface ICodeMaterialResponse {
    _id: string;
    codeMaterial: string;
}
