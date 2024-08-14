import { IListType } from "../../../../../sharetype/form-data/resources/enterprise/ProductFormData/ProductFormData";

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
  _id?: string,
  title: string,
  content: string,
}

export interface IControl {
  defaultControl: IDefaultControl,
  additionControl: IAdditionControl[] 
}

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

export interface IItem extends IData {}
export const properties = {
  _id: 1,
  productId: 1,
  productName: 1,
  gtin: 1,
  role: 1,
  type: 1,
  imageProduct :1,
  listTypeSupplies: 1,
  listIngredient: 1,
  control: 1,
};

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IRemove extends IData {}

export type TList = IData[];
