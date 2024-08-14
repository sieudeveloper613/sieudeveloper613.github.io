export const properties = {
  _id: 1,
  ssccId: 1,
  listAgriculturalContainerId: 1,
  createdAt: 1,
};

export interface IData {
  _id: string;
  ssccId: string;
  listAgriculturalContainerId: Array<string>,
  createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

