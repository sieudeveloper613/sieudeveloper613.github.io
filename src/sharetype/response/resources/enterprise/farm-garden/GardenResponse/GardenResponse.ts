
export const properties = {
    "_id": 1,
    "gardenCode": 1,
    "gardenName": 1,
    "productName": 1,
    "productId": 1,
    "harvestHistory": 1,
    "cultivationProcesses": 1
}

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

export interface IData {
    _id: string,
    gardenName: string,
    gardenCode: string
    productName: string,
    productId: string,
    address?: any,
    GLN?: string,
    farmName?: string,
    harvestHistory: Date[],
    cultivationProcesses: TCultivationProcesses[]}

