import IAddress from "../../../../types/IAddress"

export const properties = {
    
};

export type THistory = {
    material: string,
    supplier: string,
    dosage: number,
    humanResource: string,
    createAt: Date,
}

export interface ICultivationProcesses {
    process: string,
    times: THistory[]
}

export interface IProcesses {
    process: string,
    createdAt: Date
}

export interface IIngredient {
    name: string, 
    processCodeId: string,
    process: {
        id: string,
        createdAt: Date,
        data: { id: string, name: string, times: Date[] }[],
    },
    source?: string
}

export interface IData {
    _id: string;
    code: string,
    weight: number,
    objectName?: string,
    objectAddress?: IAddress,
    objectGLN?: string,
    productName: string,
    productId: string,
    isProduct: boolean,
    // farm
    gardenCode: string,
    gardenName: string,
    harvestDate: Date,
    cultivationProcesses: ICultivationProcesses[],
    // processing facility
    ingredient: IIngredient[],
    packType: string,
    manufacturingDate: Date,
    expiryDate: Date,
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IRemove extends IData {}

export type TList = IData[];
