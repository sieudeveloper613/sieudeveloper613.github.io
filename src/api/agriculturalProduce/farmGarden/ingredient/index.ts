import create from './create';
import list from './list';
import remove from './remove';
import update from './update';
import detail from './detail'

const ingredient = Object.freeze({
    create,
    remove,
    update,
    list,
    detail
});

export default ingredient;
