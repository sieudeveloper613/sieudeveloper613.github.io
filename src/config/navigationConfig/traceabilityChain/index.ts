import distributionCenter from './distributionCenter';
import processingFacility from './processingFacility';
import restaurant from './restaurant';
import supermarket from './supermarket';
import dealerStore from './dealerStore';
import companyLogistic from './companyLogistic';
import wholesaleMarket from './wholesaleMarket';
import supplierPage from './supplierPage';
const traceabilityChain = {
    distributionCenter,
    processingFacility,
    restaurant,
    supermarket,
    dealerStore,
    companyLogistic,
    wholesaleMarket,
    supplierPage
};

export default traceabilityChain as Readonly<typeof traceabilityChain>;
