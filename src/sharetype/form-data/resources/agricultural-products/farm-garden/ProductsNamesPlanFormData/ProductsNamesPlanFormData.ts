export interface ICreate {
    name: string;
}

export interface ICreateMaterial {
    productId: string;
    name: string;
    dateStart: Date; //ngay nhap kho
    dateEnd: Date; //ngay nhap kho
    productDetail?: IMaterial[];
}

export interface IMaterial {
    materialId: string; //cai nay cung chinh la productid nhung la danh cho NVL
    materialName: string;
    typeNumber: Number; //==1 la theo %, =2 la theo gam
    quantityNumber: Number;
    exDetailId: string; // Id phieu nhap nguyen lieu
    codeMaterial: string; //==ma nhap nguyen lieu
    supplierId: string; //la id nha cung cap nguyen lieu
    supplierName: string; //la ten nha cung cap nguyen lieu
}

export interface IUpdate {
    name: string;
    price?: number;
    typePrice?: boolean;
}
export interface IUpdateEx {
    propertyName: string;
    value: string;
}
