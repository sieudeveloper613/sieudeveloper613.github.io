import create from './create';
import list from './list';
import remove from './remove';
import update from './update';

const productName = Object.freeze({
    remove,
    list,
    create,
    update,
});

export default productName;
