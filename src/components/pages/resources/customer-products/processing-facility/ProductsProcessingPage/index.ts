import api from '../../../../../../api';
import SupplierFormData from '../../../../../../sharetype/form-data/resources/enterprise/farm-garden/SupplierFormData';
import ProductResponse from '../../../../../../sharetype/response/resources/enterprise/ProductResponse';
import Validate from '../../../../../../utils/Validate';
import TypeSuppliesPage from './TypeSuppliesPage';

export namespace Self {

    export type TFormData = SupplierFormData.IData;
    
    export type TList = SupplierFormData.IData[];

    export type TSuppliersCreated = Partial<ProductResponse.IData[]>;

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };


    export const contextApi = api.enterprise.product;
    export const KEY = 'NEW';
    export const title = 'Sản phẩm'; // change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
        address: {
            city: Validate.minLengthWithTrim(1),
            district: Validate.minLengthWithTrim(1),
            ward: Validate.minLengthWithTrim(1),
            addressLine: Validate.minLengthWithTrim(1),
        },
    });
}

export default TypeSuppliesPage;

// ok
