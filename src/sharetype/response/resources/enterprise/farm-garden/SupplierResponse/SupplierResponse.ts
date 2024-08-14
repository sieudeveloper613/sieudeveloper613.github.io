import { ITypeSupplise } from "../../../../../../sharetype/form-data/resources/enterprise/farm-garden/SupplierFormData/SupplierFormData";
import IAddress from "../../../../../../sharetype/types/IAddress";

export const properties = {
  _id: 1,
  name: 1,
  taxCode: 1,
  gln: 1, //GLN
  address: 1, // Địa chỉ
  typeSupplies: 1,
  img: 1,
};

export interface IData {
  _id: string;
  name: string;
  taxCode: string;
  gln: string;
  address: IAddress,
  typeSupplies: ITypeSupplise[];
  img: string;
  createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IDelete {
  _id: string;
}
