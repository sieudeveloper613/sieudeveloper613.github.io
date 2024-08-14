import api from '../../../../../../api';
import MaterialsFormData from '../../../../../../sharetype/form-data/resources/customer-products/processing-facility/MaterialsFormData';
import Validate from '../../../../../../utils/Validate';
import CommonPage from './CommonPage';

export namespace Self {
    export type TResponseData = {
        _id: string;
        name: string;
        createdAt: string;
    }[];

    export type TCreateFormData = MaterialsFormData.ICreate; // change

    export type TUpdateFormData = MaterialsFormData.IUpdate; // change

    export type TSuppliersCreated = {
        _id: string;
        name: string;
    }[];

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };

    export const contextApi = api.customerProducts.processingFacility.materials; // change
    export const KEY = 'NEW';
    export const title = 'Nguyên liệu'; // change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
        code: Validate.minLengthWithTrim(10),
    });
}

export default CommonPage;

// ok
