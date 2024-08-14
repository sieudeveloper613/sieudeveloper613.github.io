export interface IAgricultureContainer {
    weight?: number;
    qrcode: string;
    containersId?: string;
}

export interface IAgricultureContainerSplit {
    weight?: number;
    qrcode: string;
    containersId: string;
    children?: number; //the he cua san pham
    folow?: number; //thu tu di chuyen cua san pham
    ownerId?: string;
}

export interface IAgricultureContainerRestaurent {
    weight?: number;
    qrcode: string;
    containersId: string;
    children?: number; //the he cua san pham
    folow?: number; //thu tu di chuyen cua san pham
    ownerId?: string;
    price?: number;
}

export interface ICreate {
    containers: IAgricultureContainer[];
    createdAt?:any
}

export interface IExportAgricultureContainer {
    containerIds: string[];
}
