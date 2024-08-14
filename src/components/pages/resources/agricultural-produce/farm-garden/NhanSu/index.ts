import api from '../../../../../../api';
import DriverFormData from '../../../../../../sharetype/form-data/resources/transportation/DriverFormData';
import Validate from '../../../../../../utils/Validate';
import { TValidateKernel } from '../../../../../../utils/Validate/Validate';
import NhanSuPage from './NhanSuPage';

export namespace Self {
    export type TFormData = Partial<DriverFormData.IData>;
    export type TFormDataKey = keyof DriverFormData.IData;

    export const contextApi = api.agriculturalProduce.farmGarden.humanResource;

    export const driverValidate = Object.assign({
        name: Validate.minLengthWithTrim(1),
        phone: Validate.phoneNumber,
    } as TValidateKernel<DriverFormData.IData>);
}

export default NhanSuPage;
