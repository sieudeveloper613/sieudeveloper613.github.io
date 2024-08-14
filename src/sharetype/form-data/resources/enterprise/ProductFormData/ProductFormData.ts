// export interface IData {
//   _id?: string;
//   productId: string; // id sản phẩm ----> _id trong bảng enterpriseProduct
//   imageProduct? : string; // ảnh 
//   listTypeSupplies?: IListType[];
//   listIngredient?: IListType[];
// }

export interface IData {
  _id: string;
  productId: string;
  productName?: string;
  gtin?: string;
  role?: string;
  type?: string;
  imageProduct : string;
  listTypeSupplies: IListType[];
  listIngredient: IListType[];
  control: IControl,
  createdAt: string;
}

export interface IDefaultControl {
  isObjectNameShowing: boolean,
  isObjectAddressShowing: boolean,
  isObjectGLNShowing: boolean,
  isGardenShowing: boolean,
  isProductShowing: boolean,
  isCultivationProcessesShowing: boolean,
  isIngredientShowing: boolean,
  isPackTypeShowing: boolean,
  isManufacturingDateShowing: boolean,
  isExpiryDateShowing: boolean,
  isHarvestDateShowing: boolean,
  isWeightShowing: boolean,
  isSSCCShowing: boolean,
  isSSCCCreatedAtSShowing: boolean,
  isSSCCExportedAtShowing: boolean,
  isRecipientNameShowing: boolean,
  isRecipientAddressShowing: boolean,
  isRecipientGLNShowing: boolean,
  isDeliveryShowing: boolean,
}

export interface IAdditionControl {
  title: string,
  content: string,
}

export interface IControl {
  defaultControl: IDefaultControl,
  additionControl: IAdditionControl[] 
}

export interface IUpdateControl {
  control: IControl,
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


export interface IListType{
  id: string;
  name: string;
}
