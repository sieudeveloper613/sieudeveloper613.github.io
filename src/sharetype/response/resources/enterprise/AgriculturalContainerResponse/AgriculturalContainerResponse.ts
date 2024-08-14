export interface IData {
  _id: string;
  productId: string;
  qrcode: string;
  processCodeDetail: string;
  gardenCodeDetail: string;
  weight: number;
  farmOwnerName: string;
  productName: string;
  createdAt: string;
}

export interface IItem extends IData {}
export const properties = {
  _id: 1,
  productId: 1,
  qrcode: 1,
  processCodeDetail: 1,
  gardenCodeDetail: 1,
  weight: 1,
  farmOwnerName: 1,
  productName: 1
};

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IRemove extends IData {}

export type TList = IData[];
