import farmGarden from './farmGarden';
import distributionCenter from './distributionCenter';
import processingFacility from './processingFacility';
import restaurant from './restaurant';
import supermarket from './supermarket';
import dealerStore from './dealerStore';
import Enterprise from './enterprise';
const enterprise = {
    farmGarden,
    distributionCenter,
    processingFacility,
    restaurant,
    supermarket,
    Enterprise,
    dealerStore
};

export default enterprise as Readonly<typeof enterprise>;
