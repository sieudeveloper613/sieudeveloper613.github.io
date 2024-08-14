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
    productName: string;
    farmingProcess: IFarmingProcess[];
    harvestDate: string[];
}
export interface IFarmingProcess {
    typeSuppliesId: string;
    typeSupplies: string;
    farmingDetailHistory:IFarmingDetail[]
}
export interface IFarmingDetail {
    _id: string;
    nameSuplies: string; // ten nguyen lieu
    humanResource: string; //Nhan su
    supplierName: string; // ten nha cung cap nguyen lieu
    dosage: number; // lieu luong
    createdAt: any;
}

export interface IGardenDetail {
farmingProcess:IFarmingProcess[],
_id:string,
harvestDate:string[],
gardenCode: string,
productId: string,
}
