export interface IFarmingDetailHistory {
    nameSuplies: string; // ten nguyen lieu
    humanResource: string; //Nhan su
    supplierName: string; // ten nha cung cap nguyen lieu
    dosage: number; // lieu luong
    createdAt: any;
}

export interface IFamingProcess {
    typeSuppliesId: string;
    typeSupplies: string;
    farmingDetailHistory: IFarmingDetailHistory[];
}


// export interface IFertilizersHistory {
//     fertilizerId: string;
//     supplierId: string;
// }
// export interface ISprayingHistory {
//     pesticidesId: string;
//     supplierId: string;
// }

// export interface IUpdate {
//     plantVarietiesId: string;
//     plantVarietiesSupplierId: string;
//     fertilizersHistory: IFertilizersHistory[];
//     sprayingHistory: ISprayingHistory[];
//     isHarvesting?: boolean;
//     createdAt?:any
// }
