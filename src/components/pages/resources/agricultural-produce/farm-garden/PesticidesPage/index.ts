import api from '../../../../../../api';
import PesticidesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/PesticidesFormData';
import Validate from '../../../../../../utils/Validate';
import CommonPage from './CommonPage';

export namespace Self {
    export type TResponseData = {
        _id: string;
        name: string;
        createdAt: string;
    }[];

    export type TCreateFormData = PesticidesFormData.ICreate; // change

    export type TUpdateFormData = PesticidesFormData.IUpdate; // change

    export type TSuppliersCreated = {
        _id: string;
        name: string;
    }[];

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };

    export const contextApi = api.agriculturalProduce.farmGarden.pesticides; // change
    export const KEY = 'NEW';
    export const title = 'Loại thuốc bảo vệ thực vật'; // change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });
}

export default CommonPage;

// ok
