import agriculturalProduce from './agriculturalProduce';
import master from './master';
import enterprise from './enterprise';
import transportation from './transportation';
import traceabilityChain from './traceabilityChain';
import customerProducts from './customerProducts';
import medicine from './medicine';
import * as Types from './Types';

const navigationConfig = {
    transportation,
    agriculturalProduce,
    master,
    Types,
    traceabilityChain,
    customerProducts,
    medicine,
    enterprise
};

export default navigationConfig;
