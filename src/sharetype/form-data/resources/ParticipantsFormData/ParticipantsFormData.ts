import { EParticipantsRole } from '../../../TPermission';
import IAddress from '../../../types/IAddress';

export interface IData {
    name: string;
    address: IAddress;
    phone: string;
    email: string;
}

export interface ICreate extends IData {}

export interface IUpdate extends IData {}
