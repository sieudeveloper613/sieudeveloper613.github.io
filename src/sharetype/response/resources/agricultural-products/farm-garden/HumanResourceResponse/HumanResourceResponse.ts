export const properties = {
  _id: 1,
  name: 1,
  phone: 1,
  createdAt: 1,
};

export interface IDataCollection {
  count: number,
  data: {
    _id: string;
    name: string;
    phone: string;
    createdAt: string;
  }[]
}
export interface IData {
  _id: string;
  name: string;
  phone: string;
  createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IDelete {
  _id: string;
}
