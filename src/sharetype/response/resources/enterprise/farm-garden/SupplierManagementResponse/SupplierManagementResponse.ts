export interface IData {
    _id: string,
    supplierId: string,
    supplierName: string,
    management: IManagement[],
}

export interface IManagement {
    _id?: string,
    materialId: string,
    materialName: string,
    materialType: string,
    materialImage: string,
    deliveryDate: Date
    manufaturingDate: Date,
    expiryDate: Date,
}