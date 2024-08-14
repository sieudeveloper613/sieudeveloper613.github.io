export interface IIngredient {
    id: string,
    name: string,
}

export interface IProcessCode {
    id: string,
    code: string,
}

export interface IData {
    _id: string,
    name: string, 
    quantity: number, 
    totalWeight: number, 
    realWeight: number,
    mergedData: string[],
    ingredient?: IIngredient,
    processCode?: IProcessCode,
}

export type TCollection = IData[];