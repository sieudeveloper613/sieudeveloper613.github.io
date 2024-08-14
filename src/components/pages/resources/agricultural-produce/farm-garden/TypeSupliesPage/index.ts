import api from '../../../../../../api';
import TypeSuppliesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/TypeSuppliesFormData';
import Validate from '../../../../../../utils/Validate';
import TypeSuppliesPage from './TypeSuppliesPage';

export namespace Self {
    export type TResponseData = {
        _id: string;
        name: string;
        createdAt: string;
    }[];

    export type TCreateFormData = TypeSuppliesFormData.ICreate; // change

    export type TUpdateFormData = TypeSuppliesFormData.IUpdate; // change

    export type TSuppliersCreated = {
        _id: string;
        name: string;
        unit?: string | undefined;
    }[];

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };

    export const contextApi = api.agriculturalProduce.farmGarden.typeSupplies;
    export const KEY = 'NEW';
    export const title = 'Loại Vật Tư'; // change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });
}

export default TypeSuppliesPage;

// ok
