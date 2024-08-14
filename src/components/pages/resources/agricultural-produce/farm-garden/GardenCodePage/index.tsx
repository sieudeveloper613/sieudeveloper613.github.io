import api from '../../../../../../api';
import GardenCodeFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/GardenCodeFormData';
import GardenFormData from '../../../../../../sharetype/form-data/resources/enterprise/farm-garden/GardenFormData';
import Validate from '../../../../../../utils/Validate';
import GardenCodePage from './GardenCodePage';

export type TFormData = Partial<GardenFormData.ICreate>;

export const gardenCodeValidate = Object.freeze({
    gardenCode: Validate.minLengthWithTrim(1),
    // gardenName: Validate.minLengthWithTrim(0)
} as Validate.TValidateKernel<GardenFormData.ICreate>);

export const GARDEN_API = api.agriculturalProduce.farmGarden.garden;

export default GardenCodePage;
