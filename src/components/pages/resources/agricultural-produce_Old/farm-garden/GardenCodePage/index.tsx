import api from '../../../../../../api';
import GardenCodeFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';
import Validate from '../../../../../../utils/Validate';
import GardenCodePage from './GardenCodePage';

export type TFormData = Partial<GardenCodeFormData.IData>;

export const gardenCodeValidate = Object.freeze({
    code: Validate.minLengthWithTrim(1),
} as Validate.TValidateKernel<GardenCodeFormData.IData>);

export const gardenCodeApi = api.agriculturalProduce.farmGarden.gardenCode;

export default GardenCodePage;
