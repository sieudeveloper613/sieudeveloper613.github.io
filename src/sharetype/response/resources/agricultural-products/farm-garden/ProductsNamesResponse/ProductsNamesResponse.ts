import { ICountry } from "../../../../../common/Country";
import { ICertificate } from "../../../../../form-data/resources/master/UserFormData/UserFormData";

export interface IUpdateEx {
    _id: string;
    propertyName: string;
    value: string;
    isDelete: boolean;
}

export interface IMaterial {
    _id: string;
    materialId: string; //cai nay cung chinh la productid nhung la danh cho NVL
    materialName: string;
    typeNumber: number; //==1 la theo %, =2 la theo gam
    quantityNumber: number;
}

export interface IProductPackage1 {
    productId: string; //cai nay cung chinh la productid de dong hop
    productName: string;
    productCode?: string;
    quantityNumber: number;
}
export interface IData {
    _id: string;
    name: string;
    plantVarietiesId?: string;
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
    typePackage?: string;
    code?: string;
    expireDate?:string;
    representPicture:ICertificate[],
    country?:ICountry | null;
    productDetail?: IMaterial[];
    productPackage1?: IProductPackage1[];
    productPackage2?: IProductPackage1[];
}

export type Tlist = IData[];
