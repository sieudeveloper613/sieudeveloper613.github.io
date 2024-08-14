import api from '../../../../../../api';
import FertilizersFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/FertilizersFormData';
import IngredientFormData from '../../../../../../sharetype/form-data/resources/enterprise/processing-facility/IngredientFormData';
import Validate from '../../../../../../utils/Validate';
import CommonPage from './CommonPage';

export namespace Self {
    export type TResponseData = {
        _id: string;
        name: string;
        createdAt: string;
    }[];

    export type TCreateFormData = IngredientFormData.ICreate; // change

    export type TUpdateFormData = IngredientFormData.IUpdate; // change

    export type TSuppliersCreated = {
        _id: string;
        name: string;
    }[];

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };

    export const contextApi = api.agriculturalProduce.farmGarden.ingredient;
    export const KEY = 'NEW';
    export const title = 'Nguyên liệu'; // change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });
}

export default CommonPage;

// ok
