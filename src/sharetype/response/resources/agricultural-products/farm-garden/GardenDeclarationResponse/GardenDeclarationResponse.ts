export interface IFertilizerHistory {
    createdAt: string;
    fertilizerId: string;
    supplierId: string;
}

export interface IFertilizerHistory {
    createdAt: string;
    fertilizerId: string;
    supplierId: string;
}

export interface ISprayingHistory {
    createdAt: string;
    pesticidesId: string;
    supplierId: string;
}

export interface IFind {
    _id: string;
    farmOwnerName: string;
    gardenCode: string;
    plantVarietiesId?: string;
    plantVarietiesSupplierId?: string;
    fertilizerHistory: IFertilizerHistory[];
    sprayingHistory: ISprayingHistory[];
    harvestDate: string[];
}
