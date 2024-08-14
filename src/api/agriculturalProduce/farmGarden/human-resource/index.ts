import create from './create';
import list from './list';
import remove from './remove';
import update from './update';

const humanResource = Object.freeze({
    create,
    remove,
    update,
    list,
});

export default humanResource;
