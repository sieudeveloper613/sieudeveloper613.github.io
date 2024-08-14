export interface IQrcodeAlreadyExist {
    alreadyExist: boolean;
    qrcode?:string
}

export interface IFind {
    _id: string;
    lastHarvestDate: string;
    gardenDetailId: string;
    farmOwnerName: string;
    gardenCodeName: string;
    agricultureProduceName: string;
    plantVarietyName: string;
    plantVarietyId: string;
    plantVarietySupplierName: string;
    lastFertilizing?: {
        fertilizersHistoryId: string;
        fertilizerName: string;
        fertilizerSupplierName: string;
        fertilizingDate: string;
        _id: string;
    };
    lastSpraying?: {
        sprayingHistoryId: string;
        pesticideName: string;
        pesticideSupplierName: string;
        sprayingDate: string;
        _id: string;
    };
    qrcode: string;
    weight?: number;
    createdAt: string;
    children?: number; //the he cua san pham
    folow?: number; //thu tu di chuyen cua san pham
    ownerId?: string;
}

export const findProperty = Object.freeze({
    _id: 1,
    lastHarvestDate: 1,
    gardenDetailId: 1,
    farmOwnerName: 1,
    gardenCodeName: 1,
    agricultureProduceName: 1,
    plantVarietyId: 1,
    plantVarietyName: 1,
    plantVarietySupplierName: 1,
    lastFertilizing: 1,
    lastSpraying: 1,
    qrcode: 1,
    weight: 1,
    createdAt: 1,
    children: 1,
    folow: 1,
    ownerId: 1,
} as Record<keyof IFind, 1>);

export interface IProduct {
    _id?: string;
    agricultureProduceName?: string,
    count?: number,
    weight?: number,
    receiverId?: string,
    productlId?:string,
    receiverName?: string,
    plantVarietyId?: string,
    farmOwnerName?: string,
    nameCompany?: string,
    codeMaterial?: string,
    gardenCodeName?: string,
    dateEx?:string,
    dateIm?:string,
    dateAgri?: {
        sowingDate?: string,
        lastHarvestDate:string
    }
    gardenDetailId?:string
}
export interface IListProduct {
    _id?: string;
    agricultureProduceName?: string,
    plantVarietyId?: string,
    productlId?:string
}
export interface IGroupProduct {
    id:string,
    nhaptruoccb?: {
        count:number,
        weight:number
    },
    nhapkho?:{
        count:number,
        weight:number
    },
    xuatkho?:{
        count:number,
        weight:number
    },
    tonkho?:{
        count:number,
        weight:number
    }
}

export interface IProductName {
    name: string,
    _id:string
    
}
export interface IProductTime {
    agricultureProduceName: string,
    count: number,
    weight: number,
    year: number,
    month: number
}
