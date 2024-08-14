import api from '../../../../../../api';
import AccessInfoManagePage from './AccessInfoManagePage';
import Validate from '../../../../../../utils/Validate';
import ProductNamesFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/ProductsNamesFormData';

export namespace Self {
    export const apiContext = api.agriculturalProduce.farmGarden.productNames;
    export const apiContext_1 = api.customerProducts.processingFacility.productManage

    export type TCreateFormData = ProductNamesFormData.ICreate;
    export type TItemsFormData = {
        typePackage:string,
        name: string,
        code?:string,
        quantity:string | number,
        supplierName?: string,
    };

    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });

    export const title = 'sản phẩm'; // change
}

export default AccessInfoManagePage;

// ok
