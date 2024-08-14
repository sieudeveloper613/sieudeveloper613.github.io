import api from '../../../../../../api';
import Validate from '../../../../../../utils/Validate';
import ProductProcessingPage from './ProductProcessingPage';

export namespace Self {
    export const apiContext = api.enterprise.enterpriseProducts.processingFacility;
    export const validatorContext = Object.freeze({
        barcode: Validate.minLengthWithTrim(1),
        expireDate: Validate.requireAndIsNum(),
        productVolume: Validate.requireAndIsNum(),
        name: Validate.minLengthWithTrim(1),
        unitByWeight: Validate.isNumber(),


    });

    // export type TMaterialsCreated = {
    //     _id: string;
    //     name: string;
    //     type: boolean;
    //     quantity: string;
    // }[];

    // export type TMaterialsDeleted = string[];

    export type TItemsFormData = {
        _id: string;
        name: string;
        code?: string;
        type?: number;
        quantity: number;
    };

    export const KEY = 'NEW';
}

export default ProductProcessingPage;
