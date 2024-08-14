import api from '../../../../api';
import PartnerFormData from '../../../../sharetype/form-data/resources/PartnerFormData';
import Validate from '../../../../utils/Validate';
import PartnerPage from './PartnerPage';

export namespace Self {
    export type TFormData = Partial<PartnerFormData.IData>;
    export const apiContext = api.enterprise.partner;
    export const validatorContext = Object.freeze({
        partnerGroupSelection: Validate.minLengthWithTrim(1),
        partnerSelection: Validate.minLengthWithTrim(1),
    });
}

export default PartnerPage;
