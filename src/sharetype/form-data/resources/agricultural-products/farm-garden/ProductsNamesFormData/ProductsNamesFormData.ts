import { ICertificate } from '../../../master/UserFormData/UserFormData';
import { ICountry } from './../../../../../common/Country';
export interface ICreate {
    name: string;
}

export interface ICreateMaterial {
    name: string;
    expireDate?:string,
    code?: string;
    representPicture?:ICertificate[];
    country?: string | ICountry | null;
    typePackage?: string; //==DON la san pham don,==HOP,==THUNG
    materials?: IMaterial[];
    productPackage1?: IProductPackage1[];
    productPackage2?: IProductPackage1[];
}

export interface IProductPackage1 {
    productId: string; //cai nay cung chinh la productid de dong hop
    productName: string;
    productCode?: string;
    quantityNumber: Number;
}

export interface IMaterial {
    materialId: string; //cai nay cung chinh la productid nhung la danh cho NVL
    materialName: string;
    typeNumber?: number; //==1 la theo %, =2 la theo gam
    quantityNumber: number;
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

export interface IUpdateExtend {
    name?: string;
    code?: string;
    country?:string | ICountry | null;
    typePackage?: string;
    expireDate?:string
    ishidenNameOrg?: Boolean;
    ishidenAddressOgr?: Boolean;
    ishidenGardenCode?: Boolean;
    ishidenPlantVarieties?: Boolean; //loai giong
    ishidenFertilizers?: Boolean; //phan bon
    ishidenPesticides?: Boolean; //thuoc tru sau
    ishidenharvestDate?: Boolean; //ngay thu hoach
    ishidenExportDate?: Boolean; //ngay xuat hang
    ishidentransportServiceName?: Boolean; //Don vi van chuyen
    ishidenvehicleName?: Boolean; //bien so xe
    ishidendriverName?: Boolean; //tai xe
    //phan them cho co so che bien
    ishidenProductName?: Boolean; //ten san pham
    ishidenProductweight?: Boolean; //khoi luong san pham
    ishidenInStoreDate?: Boolean; //ngay nhap kho
    price?: Number; //don gia san pham
    typePrice?: Boolean; //==true thi don gia theo san pham, nguoc lai don gia theo kg
    propertyNameExtend?: IUpdateEx[];
    materials?: IMaterial[];
    productPackage1?: IProductPackage1[];
    productPackage2?: IProductPackage1[];
    representPicture?:ICertificate[];
}
