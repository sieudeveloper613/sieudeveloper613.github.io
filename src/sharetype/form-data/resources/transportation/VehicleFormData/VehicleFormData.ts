export interface IData {
    licensePlates: string;
    vehicleType: string;
    email: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}
