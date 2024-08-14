import api from '../../../../../../api';
import PartnerFormData from '../../../../../../sharetype/form-data/resources/PartnerFormData';
import Validate from '../../../../../../utils/Validate';
import ProductManagePage from './ProductManagePage';

export namespace Self {
    export type TFormData = Partial<PartnerFormData.IData>;
    export const apiContext = api.customerProducts.processingFacility.productManage;
    export const validatorContext = Object.freeze({
        productSelection: Validate.minLengthWithTrim(1),
        supplierSelection: Validate.minLengthWithTrim(1),
    });
}

export default ProductManagePage;