
export interface IMaterialHistory {
    productId: string;
    sumWeight:number;
    actualWeight?: number;
    detailProducts: string[];
}
export interface IProductAfterHistory {
    productId: string;
    sumWeight:number;
    sumQuantity: number;
    detailProducts: string[];
}
export interface IProcessHistory {
    processId: string;
    detailProcess: string[];
}



export interface IUpdate {
    processCodeId: string;
    ingredientId: string;
    importDate: Date[];
    materialHistory: IMaterialHistory[];
    productAfterHistory: IProductAfterHistory[];
    processHistory: IProcessHistory[];
    createdAt?:any
}
