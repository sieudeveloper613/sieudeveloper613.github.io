
export interface ICreate {
    gardenName: string,
    gardenCode: string,
}

export interface IUpdate extends ICreate {}

export type THistory = {
    material: string,
    supplier: string,
    dosage: number,
    humanResource: string,
    createAt: Date,
}

export type TCultivationProcesses = {
    process: String,
    times: THistory[]
}

export interface ISubmit {
    productName?: string,
    productId?: string,
    harvestDate?: Date,
    cultivationProcesses?: TCultivationProcesses[],
}

export const dataKeys = Object.freeze(["gardenCode", "gardenName"] as (keyof ICreate)[]);
