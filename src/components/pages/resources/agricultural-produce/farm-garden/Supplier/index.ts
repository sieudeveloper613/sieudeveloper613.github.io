import api from '../../../../../../api';
import SupplierFormData from '../../../../../../sharetype/form-data/resources/enterprise/farm-garden/SupplierFormData';
import IAddress from '../../../../../../sharetype/types/IAddress';
import Validate from '../../../../../../utils/Validate';
import TypeSuppliesPage from './TypeSuppliesPage';

export namespace Self {

    export type TFormData = Partial<
        Omit<SupplierFormData.IData, 'address'> & {
            address: Partial<IAddress>;
        }
    >;
    
    export type TList = SupplierFormData.IData[];

    export type TCreateFormData = SupplierFormData.ICreate; // change

    export type TUpdateFormData = SupplierFormData.IUpdate; // change

    export type TSuppliersCreated = Partial<
    Omit<SupplierFormData.IData, 'address'> & {
        address: Partial<IAddress>;
    }
>[];

    export type TSuppliersDeleted = string[];

    export type TSuppliersFormData = {
        created: TSuppliersCreated;
        deleted: TSuppliersDeleted;
    };

    export const contextApi = api.agriculturalProduce.farmGarden.supplier;
    export const KEY = 'NEW';
    export const title = 'Nhà cung cấp'; // change
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
