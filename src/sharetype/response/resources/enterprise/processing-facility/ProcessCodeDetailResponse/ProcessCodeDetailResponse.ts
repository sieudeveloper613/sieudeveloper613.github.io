import IAddress from '../../../../../types/IAddress';

export interface IMetarialHistory {
    _id: string;
    productId: string;
    sumWeight:number;
    actualWeight?: number;
    detailProducts: string[];
    createdAt: string;
}
export interface IProcessHistory {
    _id: string;
    processId: string;
    detailProcess: string[];
    createdAt: string;
}
export interface IProductAfterHistory {
    _id: string;
    productId: string;
    sumWeight:number;
    sumQuantity: number;
    detailProducts: string[];
    createdAt: string;
}

export interface IFind {
    _id: string;
    createdAt: string;
    agricultureProduceName: string;
    processCode:string;
    processCodeId: string;
    ingredientId: string | null;
    importDate: string[];
    materialHistory: IMetarialHistory[];
    processHistory: IProcessHistory[];
    productAfterHistory: IProductAfterHistory[]
}
export interface IDetailIngredient {
    id: string,
    name: string,
    date: string,
    supplierName: string
}
export interface IGardenDetail {
pesticides:IDetailIngredient[],
fertilizers:IDetailIngredient[],
_id:string,
harvestDate:string[],
gardenCode: string,
plantVarieties: string,
plantVarietiesSupplier:string
}
