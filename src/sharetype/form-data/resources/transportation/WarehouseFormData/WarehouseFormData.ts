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
    }
}

export interface IData {
    code: string,
    weight: number,
    productName: string,
    productId: string,
    // farm
    gardenCode?: string,
    gardenName?: string,
    harvestDate?: Date,
    cultivationProcesses?: ICultivationProcesses[],
    // processing facility
    ingredient?: IIngredient[],
    packType?: string,
    manufacturingDate?: Date,
    expiryDate?: Date,
}

export interface ICreate extends IData {
    collection: IData[]
}

export interface ICollection extends IData {
    collection: IData[]
}

export interface IUpdate extends IData {}
