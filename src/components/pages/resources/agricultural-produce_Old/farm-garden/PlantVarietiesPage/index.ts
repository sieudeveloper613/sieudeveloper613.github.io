import api from '../../../../../../api';
import PlantVarietiesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/PlantVarietiesFormData';
import PlantVarietiesResponse from '../../../../../../sharetype/response/resources/agricultural-products/farm-garden/PlantVarietiesResponse';
import Validate from '../../../../../../utils/Validate';
import CommonPage from './CommonPage';

export namespace Self {
    export type TResponseData = PlantVarietiesResponse.TList;

    export type TCreateFormData = PlantVarietiesFormData.ICreate; // change

    export type TUpdateFormData = PlantVarietiesFormData.IUpdate; // change

    export type TSuppliersCreated = {
        _id: string;
        name: string;
    }[];

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };

    export const contextApi = api.agriculturalProduce.farmGarden.plantVarieties; // change
    export const KEY = 'NEW';
    export const title = 'Loại giống';
    export const subTitle = 'Loại sản phẩm'; // change// change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
        agricultureProduceName: Validate.minLengthWithTrim(1),
    });
}

export default CommonPage;

// ok
