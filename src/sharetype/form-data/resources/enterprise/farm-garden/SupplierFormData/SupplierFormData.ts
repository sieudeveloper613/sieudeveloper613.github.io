import IAddress from "../../../../../../sharetype/types/IAddress";

export interface IData {
  _id:string;
  name: string; // nhà cung cấp
  taxCode: string; // Mã số thuế
  gln: string; //GLN
  address: IAddress; // Địa chỉ
  typeSupplies: ITypeSupplise[];
  img: string;
}

export interface ITypeSupplise{
  id: string;
  name: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

