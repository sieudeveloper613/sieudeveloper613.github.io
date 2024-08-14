import create from './create';
import list from './list';
import remove from './remove';
import update from './update';

const vehicle = Object.freeze({
    remove,
    create,
    update,
    list,
});

export default vehicle;
