export interface IFertilizersHistory {
    fertilizerId: string;
    supplierId: string;
}

export interface ISprayingHistory {
    pesticidesId: string;
    supplierId: string;
}

export interface IUpdate {
    plantVarietiesId: string;
    plantVarietiesSupplierId: string;
    fertilizersHistory: IFertilizersHistory[];
    sprayingHistory: ISprayingHistory[];
    isHarvesting?: boolean;
    createdAt?:any
}
