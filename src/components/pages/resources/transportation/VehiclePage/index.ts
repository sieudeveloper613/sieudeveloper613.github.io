import VehicleFormData from '../../../../../sharetype/form-data/resources/transportation/VehicleFormData';
import Validate from '../../../../../utils/Validate';
import { TValidateKernel } from '../../../../../utils/Validate/Validate';
import VehiclePage from './VehiclePage';

export namespace Self {
    export type TFormData = Partial<VehicleFormData.IData>;
    export type TFormDataKey = keyof VehicleFormData.IData;

    export const vehicleValidate: TValidateKernel<VehicleFormData.IData> = {
        vehicleType: Validate.minLengthWithTrim(1),
        licensePlates: Validate.minLengthWithTrim(1),
        email: Validate.email,
    };
}

export default VehiclePage;
