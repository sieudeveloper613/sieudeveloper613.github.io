import list from './list';
import create from './create';
import remove from './remove';
import update from './update';
import enterpriseProducts from './enterpriseProducts'
import partner from './partner';
import product from './product';

const enterprise = Object.freeze({
    list,
    create,
    remove,
    update,
    enterpriseProducts,
    partner,
    product
});

export default enterprise;
