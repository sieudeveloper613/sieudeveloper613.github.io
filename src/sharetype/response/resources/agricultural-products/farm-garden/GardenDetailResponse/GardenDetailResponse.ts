import IAddress from '../../../../../types/IAddress';

export interface IHistory {
    _id: string;
    name: string;
    supplierName: string;
    createdAt: string;
}

export interface IFind {
    _id: string;
    createdAt: string;
    ownerName: string;
    ownerAddress: IAddress;
    gardenCode: string;
    agricultureProduceName: string;
    plantVarietiesId: string | null;
    plantVarietiesName: string | null;
    plantVarietiesSupplierId: string | null;
    plantVarietiesSupplierName: string | null;
    fertilizersHistory: IHistory[];
    sprayingHistory: IHistory[];
    harvestDate: string[];
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
