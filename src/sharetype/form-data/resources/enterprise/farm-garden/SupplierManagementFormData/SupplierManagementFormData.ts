export interface IData {
    supplierId: string,
    supplierName: string,
    materialId: string,
    materialImage: string,
    materialName: string,
    materialType: string,
    deliveryDate: Date,
    manufaturingDate: Date,
    expiryDate: Date,
}

export interface IManagement {
    materialId: string,
    materialName: string,
    materialType: string,
    materialImage: string,
    deliveryDate: Date,
    manufaturingDate: Date,
    expiryDate: Date,
}

export interface ICreate extends IData {}