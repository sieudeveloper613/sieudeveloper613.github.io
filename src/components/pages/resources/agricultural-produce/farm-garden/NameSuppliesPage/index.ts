import api from '../../../../../../api';
import FertilizersFormData from '../../../../../../sharetype/form-data/resources/agricultural-products/farm-garden/FertilizersFormData';
import Validate from '../../../../../../utils/Validate';
import NameSupliesPage from './NameSupliesPage';

export namespace Self {

    export const contextApi = api.agriculturalProduce.farmGarden.nameSupplies;
    export const KEY = 'NEW';
    export const title = 'Vật Tư'; // change
    export const validator = Object.freeze({
        name: Validate.minLengthWithTrim(1),
    });
}

export default NameSupliesPage;

// ok
