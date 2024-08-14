export interface IHistory {
    material: string,
    supplier: string,
    dosage: number,
    humanResource: string,
    createAt: Date,
}

export interface ICultivationProcesses {
    process: string,
    times: IHistory[]
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

export interface IAddress {
    road: string,
    ward: string,
    district: string,
    city: string,
    latitude: string,
    longitude: string
}

export interface IRecipient {
    object: string,
    objectName: string,
    phoneNumber: string,
    email: string,
    address: IAddress
}

export interface IDelivery {
    deliveryType: string,
    vehicle: string,
    business?: string,
    driver: string,
    driverPhoneNumber: string,
    driverEmail: string,
}


export interface IData {
    objectId: string,
    qrCode: string,
    gardenName?: string,
    gardenCode?: string,
    productId: string,
    productName: string,
    productImage?: string,
    cultivationProcesses?: ICultivationProcesses[],
    ingredient?: IIngredient[],
    harvestDate?: Date,
    weight: number,
    packType?: string,
    manufacturingDate?: Date | string,
    expiryDate?: Date | string,
    SSCC?: string,
    SSCCCreatedAt?: Date,
    SSCCExportedAt?: Date,
    recipient?: IRecipient,
    delivery?: IDelivery,
}

export interface IStoring {
    objectId: string,
    qrCode: string,
    weight: number,
    productId: string,
    productName: string,
    productImage?: string,
    gardenName?: string,
    gardenCode?: string,
    harvestDate?: Date,
    cultivationProcesses?: ICultivationProcesses[],
    ingredient?: IIngredient,
    packType?: string,
    manufacturingDate?: Date | string,
    expiryDate?: Date | string,
}

export interface IToSSCC {
    code: string[],
    SSCC: string,
    SSCCCreatedAt: Date,
}

export interface IExporting {
    collection: any[],
    recipient?: IRecipient,
    delivery?: IDelivery,
}

export interface IImported {

}