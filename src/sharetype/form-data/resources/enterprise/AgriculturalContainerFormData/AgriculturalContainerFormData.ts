export interface IData {
  productId: string; // id sản phẩm
  qrcode: string; // mã QR
  processCodeDetail: string;
  gardenCodeDetail: string;
  weight: number;
  farmOwnerName: string;
  productName: string;
}


export interface ICreate extends IData {}

export interface IUpdate extends IData {}


