import {
    IAgricultureContainer,
    IAgricultureContainerRestaurent,
    IAgricultureContainerSplit,
} from '../AgriculturalContainerFormData/AgriculturalContainerFormData';

export interface ICreateExport {
    containersId?: string[]; // _id thùng
    containersIdex: IContainerls[]; // _id thùng
    receiverId: string; // _id người nhận

    transportServiceId?: string; // _id đơn vị vận chuyển nếu có chọn

    vehicleId?: string;
    vehicleName: string;
    split?: boolean;

    driverId?: string;
    driverName: string;
    status: string;
    productId?: string;
    productName?: string;
    containers?: IAgricultureContainer[];
    weight?: number;
    codeMaterial?: string; //ma nhap nguyen lieu
    typePackage?: string; //kiểu sản phẩm DON,HOP,THUNG
    productData?: IProductData[];
    signalCustomer?: string; //chu ky khach hang
    ownerId?: string;
    children?: number; //the he cua san pham
    folow?: number; //thu tu di chuyen cua san pham
    createdAt?:Date
}

export interface IMaterialData {
    productlId: string; //cai nay cung chinh la productid nhung la danh cho NVL
    productName: string;
    typeNumber: Number; //==1 la theo %, =2 la theo gam
    quantityNumber: Number;
    qrcode?: string;
    codeMaterial?: string; //ma nhap nguyen lieu
    supplier?: string; //nha cung cap
    idEX?: string;
}

export interface IContainerls {
    containersId: string; //cai nay cung chinh la productid nhung la danh cho NVL
    children: number;
    folow: number; //==1 la theo %, =2 la theo gam
    ownerId: string;
}

export interface IProductData {
    weight?:number;
    productlId: string; //cai nay cung chinh la productid nhung la danh cho NVL
    productName: string;
    productCode: string;
    qrcode?: string;
    material?: IMaterialData[];
    children?: number;
    folow?: number; //==1 la theo %, =2 la theo gam
}

export interface ICreateExportSplit {
    receiverId: string; // _id người nhận
    split?: boolean;
    status: string;
    productId?: string;
    containers: IAgricultureContainerSplit[];
}

export interface ICreateExportRestaurent {
    customerName: string; //  người mua
    customerPhone: string; //  người mua
    split?: boolean;
    status: string;
    productId?: string;
    containers: IAgricultureContainerRestaurent[];
}
