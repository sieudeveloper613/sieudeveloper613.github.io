import farmGarden from './farmGarden';
import distributionCenter from './distributionCenter';
import processingFacility from './processingFacility';
import restaurant from './restaurant';
import supermarket from './supermarket';
const agriculturalProduce = {
    farmGarden,
    distributionCenter,
    processingFacility,
    restaurant,
    supermarket,
};

export default agriculturalProduce as Readonly<typeof agriculturalProduce>;
