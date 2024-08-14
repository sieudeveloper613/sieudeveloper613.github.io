export const properties = {
  _id: 1,
  name: 1,
  typeSupplies: 1,
  nameSupplies: 1,
  createdAt: 1,
};

export interface IData {
  _id: string;
  name: string;
  typeSupplies: string;
  nameSupplies: string;
  createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IDelete {
  _id: string;
}
