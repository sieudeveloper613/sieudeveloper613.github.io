export const properties = {
  _id: 1,
  code: 1,
  status: 1,
  storages: 1,
  createdAt: 1,
};

export interface IAddress {
  road: string,
  ward: string,
  district: string,
  city: string,
  latitude: string,
  longitude: string
}

export interface IContainer {
  name: string,
  quantity: number,
  totalWeight: number,
  mergedData: string[]
}

export interface IRecipient {
  object: string,
  objectName: string,
  phoneNumber: string,
  email: string,
  address: IAddress
}

export interface IDelivery {
  deliveryType: string,
  vehicle: string,
  business?: string,
  driver: string,
  driverPhoneNumber: string,
  driverEmail: string,
}

export interface IStorage {
  containers: IContainer[],
  recipient: IRecipient,
  delivery: IDelivery,
  importTime: Date | null,
  exportTime: Date | null,
}

export enum STATUS {
  IS_PENDING = "PENDING",
  IS_EXPORTING = "EXPORTING",
  IS_CONTAINING = "CONTAINING",
  IS_COMPLETED = "COMPLETED",
}

export interface IData {
  _id: string;
  code: string;
  status: STATUS;
  storages: IStorage[];
  createdAt: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export interface IDelete { code: string }

export interface IImportFromRecipient {
  barcode: string,
  order: IStorage
}

export type TCollection = IData[];
