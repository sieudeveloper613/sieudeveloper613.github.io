import api from '../../../../../../api';
import Validate from '../../../../../../utils/Validate';
import ProductTypePage from './ProductTypePage';

export namespace Self {
    export const apiContext = api.customerProducts.processingFacility.productType;
    export const validatorContext = Object.freeze({
        barcode: Validate.minLengthWithTrim(1),
        name: Validate.minLengthWithTrim(1),
        unitByPercent: Validate.smallerThan(100),
        unitByWeight: Validate.isNumber(),
        quantity: Validate.isNumber(),
        country:Validate.isString()
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
        country?:string;
        quantity: number;
    };

    export const KEY = 'NEW';
}

export default ProductTypePage;
