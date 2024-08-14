export interface IUpdateEx {
    _id: string;
    propertyName: string;
    value: string;
    isDelete: boolean;
}
export interface IData {
    _id: string;
    name: string;
    ishidenInStoreDate?: Boolean; //ngay nhap kho
    price?: Number; //don gia san pham
    typePrice?: Boolean; //==true thi don gia theo san pham, nguoc lai don gia theo kg
    propertyNameExtend?: IUpdateEx[];
    dateEnd?: Date;
    dateStart?: Date;
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
    _id: string;
    name: string;
    dateEnd?: Date;
    dateStart?: Date;
    productId?: string;
    productDetail?: IMaterial[]
}

export type Tlist = IData[];
