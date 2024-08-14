export interface IData {
    _id?: string;
    productName: string; // tên sản phẩm
    gtin: string; // mã GTIN
    role?: string;
    type?: string; // dùng để phân biệt loại sp có khối lượng hay k có khối lượng
    expired?: any;
    productVolume?: any;
    imageProduct? : string; // ảnh 
}


export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export enum ETypeEnterpriseProduct {//**
    fixed = 'FIXED',
    noFixed = 'NOFIXED'
}

export enum TTypeEnterpriseProductRole{
    farmGarden = 'farm-garden', //trang trại **
    rocessingFacility = 'processing-facility',    
}

