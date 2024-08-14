
export enum STATUS {
  IS_PENDING = "PENDING",
  IS_EXPORTING = "EXPORTING",
  IS_CONTAINING = "CONTAINING",
  IS_COMPLETED = "COMPLETED",
}

export interface IData {
  code: string;
}

interface IAddress {
  road: string,
  ward: string,
  district: string,
  city: string,
  latitude: string,
  longitude: string
}

export interface IExport {
  selectedSSCCs: string[],
  recipient: {
    object: string,
    objectName: string,
    phoneNumber: string,
    email: string,
    address: IAddress
  },
  delivery: {
    deliveryType: string,
    vehicle: string,
    business?: string,
    driver: string,
    driverPhoneNumber: string,
    driverEmail: string,
  }
}

export interface IAdd {
  containers: {
    name: string,
    quantity: number,
    totalWeight: number,
    mergedData: string[]
  }[]
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}

export const dataKeys = Object.freeze(['code'] as (keyof IData)[]);
